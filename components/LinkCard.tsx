"use client";

import { useEffect, useState } from "react";
import type { OpenGraphData } from "@/lib/og";

const requestCache = new Map<string, Promise<OpenGraphData | null>>();

function getOpenGraph(url: string) {
  const cached = requestCache.get(url);
  if (cached) return cached;

  const request = fetch(`/api/og?url=${encodeURIComponent(url)}`)
    .then(async (response) => {
      if (!response.ok) return null;
      return (await response.json()) as OpenGraphData;
    })
    .catch(() => null);

  requestCache.set(url, request);
  return request;
}

type LinkCardProps = {
  href?: string;
};

export default function LinkCard({ href }: LinkCardProps) {
  const [data, setData] = useState<OpenGraphData | null>();

  useEffect(() => {
    if (!href) return;
    let active = true;

    getOpenGraph(href).then((result) => {
      if (active) setData(result);
    });

    return () => {
      active = false;
    };
  }, [href]);

  if (!href) return null;

  if (!data) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {href}
      </a>
    );
  }

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose group my-6 flex min-h-32 overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 no-underline transition hover:border-gray-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="flex min-w-0 flex-1 flex-col justify-center px-5 py-4 sm:px-6">
        <strong className="line-clamp-2 text-base font-semibold leading-snug text-gray-900">
          {data.title}
        </strong>
        {data.description && (
          <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {data.description}
          </span>
        )}
        <span className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-500">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 transition-transform group-hover:scale-125" />
          {data.domain}
        </span>
      </span>
      {data.image && (
        // Remote OGP hosts are intentionally dynamic, so Next/Image cannot be allowlisted.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.image}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="hidden w-44 shrink-0 border-l border-gray-100 object-cover sm:block"
        />
      )}
    </a>
  );
}
