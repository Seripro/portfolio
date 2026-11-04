import { unstable_cache } from "next/cache";
import { fetchOpenGraph } from "@/lib/og";

const getCachedOpenGraph = unstable_cache(fetchOpenGraph, ["open-graph"], {
  revalidate: 21600,
});

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url || url.length > 2048) {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const data = await getCachedOpenGraph(url);
    if (!data) {
      return Response.json({ error: "OGP not found" }, { status: 404 });
    }

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
      // Do not log URLs, query strings, response bodies or arbitrary errors.
      const message = error instanceof Error ? error.message : "";
      const status = /^Unexpected response status: (\d{3})$/.exec(message)?.[1];
      const code = error && typeof error === "object" && "code" in error
        && typeof error.code === "string" && /^[A-Z0-9_]{1,64}$/.test(error.code)
        ? error.code : undefined;
      console.warn("OGP fetch failed", {
        status: status ? Number(status) : undefined,
        code,
        reason: ["Response is too large", "Response is not HTML", "Too many redirects"].includes(message)
          ? message : "Fetch rejected or failed",
      });
    return Response.json({ error: "Unable to fetch OGP" }, { status: 422 });
  }
}
