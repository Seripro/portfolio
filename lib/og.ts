import "server-only";

import { lookup } from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import { isIP } from "node:net";
import type { LookupFunction } from "node:net";
import { load } from "cheerio";

const MAX_REDIRECTS = 3;
const MAX_RESPONSE_BYTES = 1024 * 1024;
const REQUEST_TIMEOUT_MS = 5_000;

export type OpenGraphData = {
  url: string;
  title: string;
  description: string | null;
  image: string | null;
  domain: string;
};

function isPublicIpv4(address: string) {
  const octets = address.split(".").map(Number);
  if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet))) {
    return false;
  }

  const [a, b, c] = octets;
  return !(
    a === 0 ||
    a === 10 ||
    (a === 100 && b >= 64 && b <= 127) ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && c === 0) ||
    (a === 192 && b === 0 && c === 2) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113) ||
    a >= 224
  );
}

function isPublicIpv6(address: string) {
  const normalized = address.toLowerCase().split("%")[0];
  const mappedIpv4 = normalized.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  if (mappedIpv4) return isPublicIpv4(mappedIpv4);

  const value = ipv6ToBigInt(normalized);
  if (value === null) return false;

  const mappedPrefix = BigInt("0xffff");
  if ((value >> BigInt(32)) === mappedPrefix) {
    const ipv4 = Number(value & BigInt("0xffffffff"));
    return isPublicIpv4(
      [24, 16, 8, 0].map((shift) => (ipv4 >>> shift) & 255).join("."),
    );
  }

  return !(
    isInIpv6Range(value, "::", 128) ||
    isInIpv6Range(value, "::1", 128) ||
    isInIpv6Range(value, "64:ff9b:1::", 48) ||
    isInIpv6Range(value, "100::", 64) ||
    isInIpv6Range(value, "2001:2::", 48) ||
    isInIpv6Range(value, "2001:db8::", 32) ||
    isInIpv6Range(value, "fc00::", 7) ||
    isInIpv6Range(value, "fe80::", 10) ||
    isInIpv6Range(value, "ff00::", 8)
  );
}

function ipv6ToBigInt(address: string): bigint | null {
  const halves = address.split("::");
  if (halves.length > 2) return null;

  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves[1] ? halves[1].split(":") : [];
  const missing = 8 - left.length - right.length;
  if ((halves.length === 1 && missing !== 0) || missing < 0) return null;

  const parts = [...left, ...Array(missing).fill("0"), ...right];
  if (parts.length !== 8) return null;

  let result = BigInt(0);
  for (const part of parts) {
    if (!/^[0-9a-f]{1,4}$/.test(part)) return null;
    result = (result << BigInt(16)) + BigInt(`0x${part}`);
  }
  return result;
}

function isInIpv6Range(value: bigint, network: string, prefixLength: number) {
  const networkValue = ipv6ToBigInt(network);
  if (networkValue === null) return false;
  const shift = BigInt(128 - prefixLength);
  return value >> shift === networkValue >> shift;
}

function isPublicIp(address: string) {
  const family = isIP(address);
  if (family === 4) return isPublicIpv4(address);
  if (family === 6) return isPublicIpv6(address);
  return false;
}

function parseExternalUrl(value: string) {
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Unsupported URL protocol");
  }
  if (url.username || url.password) throw new Error("URL credentials are not allowed");
  if (url.port && url.port !== "80" && url.port !== "443") {
    throw new Error("Non-standard ports are not allowed");
  }
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    throw new Error("Local hostnames are not allowed");
  }

  return url;
}

async function resolvePublicAddress(
  hostname: string,
): Promise<{ address: string; family: 4 | 6 }> {
  const normalizedHostname = hostname.replace(/^\[|\]$/g, "");
  if (isIP(normalizedHostname)) {
    if (!isPublicIp(normalizedHostname)) {
      throw new Error("Private IP addresses are not allowed");
    }
    return {
      address: normalizedHostname,
      family: isIP(normalizedHostname) as 4 | 6,
    };
  }

  const addresses = await lookup(normalizedHostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => !isPublicIp(address))) {
    throw new Error("Hostname resolves to a non-public IP address");
  }

  const selected = addresses[0];
  if (selected.family !== 4 && selected.family !== 6) {
    throw new Error("Unsupported address family");
  }

  return { address: selected.address, family: selected.family };
}

async function requestHtml(url: URL): Promise<{ body: string; finalUrl: URL }> {
  let currentUrl = url;

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    currentUrl = parseExternalUrl(currentUrl.href);
    const resolved = await resolvePublicAddress(currentUrl.hostname);
    const response = await requestOnce(currentUrl, resolved);

    if (response.status >= 300 && response.status < 400 && response.location) {
      if (redirectCount === MAX_REDIRECTS) throw new Error("Too many redirects");
      currentUrl = new URL(response.location, currentUrl);
      continue;
    }

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    if (!response.contentType.toLowerCase().includes("text/html")) {
      throw new Error("Response is not HTML");
    }

    return { body: response.body, finalUrl: currentUrl };
  }

  throw new Error("Unable to fetch URL");
}

function requestOnce(
  url: URL,
  resolved: { address: string; family: 4 | 6 },
): Promise<{
  status: number;
  location?: string;
  contentType: string;
  body: string;
}> {
  return new Promise((resolve, reject) => {
    const transport = url.protocol === "https:" ? https : http;
    const pinnedLookup: LookupFunction = (_hostname, options, callback) => {
      if (options.all) {
        callback(null, [resolved]);
      } else {
        callback(null, resolved.address, resolved.family);
      }
    };
    const request = transport.get(
      url,
      {
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "Accept-Encoding": "identity",
          "User-Agent": "PortfolioLinkPreview/1.0",
        },
        lookup: pinnedLookup,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
      (response) => {
        const status = response.statusCode ?? 0;
        const location = response.headers.location;
        const contentType = response.headers["content-type"] ?? "";

        if (status >= 300 && status < 400) {
          response.resume();
          resolve({ status, location, contentType, body: "" });
          return;
        }

        const chunks: Buffer[] = [];
        let size = 0;

        response.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > MAX_RESPONSE_BYTES) {
            response.destroy(new Error("Response is too large"));
            return;
          }
          chunks.push(chunk);
        });
        response.on("end", () => {
          resolve({
            status,
            location,
            contentType,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
        response.on("error", reject);
      },
    );

    request.on("error", reject);
  });
}

function absoluteUrl(value: string | undefined, baseUrl: URL) {
  if (!value) return null;
  try {
    const url = new URL(value, baseUrl);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export async function fetchOpenGraph(value: string): Promise<OpenGraphData | null> {
  const initialUrl = parseExternalUrl(value);
  const { body, finalUrl } = await requestHtml(initialUrl);
  const $ = load(body);
  const property = (name: string) =>
    $(`meta[property="${name}"]`).first().attr("content")?.trim();
  const named = (name: string) =>
    $(`meta[name="${name}"]`).first().attr("content")?.trim();

  const title = property("og:title");
  if (!title) return null;

  return {
    url: finalUrl.href,
    title: title.slice(0, 300),
    description: (property("og:description") || named("description") || null)?.slice(
      0,
      500,
    ) ?? null,
    image: absoluteUrl(property("og:image") || property("og:image:url"), finalUrl),
    domain: finalUrl.hostname.replace(/^www\./, ""),
  };
}
