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
      <div
        className="prose prose-gray mt-2 max-w-none text-gray-600"
        dangerouslySetInnerHTML={{ __html: product.summary }}
      />

      {product.duration && (
        <p className="mt-2 text-sm text-gray-500">
          開発期間: {product.duration}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {product.stack.split(",").map((tech) => (
          <span
            key={tech.trim()}
            className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
          >
            {tech.trim()}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        {product.github_url && (
          <a
            href={product.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-700 underline hover:text-gray-900"
          >
            GitHub
          </a>
        )}
        {product.app_url && (
          <a
            href={product.app_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-700 underline hover:text-gray-900"
          >
            アプリを見る
          </a>
        )}
        {product.qiita_url && (
          <a
            href={product.qiita_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-700 underline hover:text-gray-900"
          >
            Qiita記事
          </a>
        )}
      </div>

      <div className="mt-8 overflow-hidden rounded-lg">
        <Image
          src={product.thumbnail.url}
          alt={product.title}
          width={product.thumbnail.width}
          height={product.thumbnail.height}
          className="w-full"
        />
      </div>

      <div className="mt-8">
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
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">構成図</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <Image
              src={product.architecture_diagram.url}
              alt={`${product.title} 構成図`}
              width={product.architecture_diagram.width}
              height={product.architecture_diagram.height}
              className="w-full"
            />
          </div>
        </div>
      )}

      <div
        className="prose prose-gray mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: product.content }}
      />
    </article>
  );
}
