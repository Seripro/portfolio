import Image from "next/image";
import { getProduct, getProducts } from "@/lib/microcms";

export async function generateStaticParams() {
  const { contents } = await getProducts();
  return contents.map((product) => ({
    id: product.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

      <div className="mt-14 overflow-hidden rounded-lg">
        <Image
          src={product.thumbnail.url}
          alt={product.title}
          width={product.thumbnail.width}
          height={product.thumbnail.height}
          className="w-full"
        />
      </div>

      <h2 className="mt-16 text-xl font-semibold text-gray-900">概要</h2>
      <div
        className="prose prose-gray mt-3 max-w-none leading-relaxed text-gray-600"
        dangerouslySetInnerHTML={{ __html: product.summary }}
      />

      <h2 className="mt-16 text-xl font-semibold text-gray-900">目的・背景</h2>
      <div
        className="prose prose-gray mt-3 max-w-none leading-relaxed text-gray-600"
        dangerouslySetInnerHTML={{ __html: product.purpose }}
      />

      {product.duration && (
        <p className="mt-16 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-[18px] w-[18px] text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
              clipRule="evenodd"
            />
          </svg>
          開発期間: {product.duration}
        </p>
      )}

      <div className="mt-14 flex flex-wrap gap-2">
        {product.stack.split(",").map((tech) => (
          <span
            key={tech.trim()}
            className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
          >
            {tech.trim()}
          </span>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        {product.github_url && (
          <a
            href={product.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
            GitHub
          </a>
        )}
        {product.app_url && (
          <a
            href={product.app_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                clipRule="evenodd"
              />
            </svg>
            アプリを見る
          </a>
        )}
        {product.qiita_url && (
          <a
            href={product.qiita_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-800 transition-colors hover:bg-green-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
            </svg>
            Qiita記事
          </a>
        )}
      </div>

      <div className="mt-24">
        <h2 className="text-xl font-semibold text-gray-900">デモ</h2>
        {(() => {
          const targetImage = product.demo_image || product.thumbnail;
          const isGif = targetImage.url.endsWith(".gif");
          return (
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={targetImage.url}
                alt={`${product.title}のデモ`}
                width={targetImage.width}
                height={targetImage.height}
                unoptimized={isGif}
                className="w-full"
              />
            </div>
          );
        })()}
      </div>

      {product.architecture_diagram && (
        <div className="mt-24">
          <h2 className="text-xl font-semibold text-gray-900">構成図</h2>
          <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-lg border border-gray-200">
            {(() => {
              const isSvg = product.architecture_diagram.url.endsWith(".svg");
              if (isSvg) {
                return (
                  <Image
                    src={product.architecture_diagram.url}
                    alt={`${product.title} 構成図`}
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-contain"
                  />
                );
              }

              return (
                <Image
                  src={product.architecture_diagram.url}
                  alt={`${product.title} 構成図`}
                  width={product.architecture_diagram.width}
                  height={product.architecture_diagram.height}
                  className="w-full"
                />
              );
            })()}
          </div>
        </div>
      )}

      <div
        className="prose prose-gray mt-24 max-w-none"
        dangerouslySetInnerHTML={{ __html: product.content }}
      />
    </article>
  );
}
