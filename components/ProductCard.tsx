import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/microcms";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={product.thumbnail.url}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h2>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {product.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.stack.split(",").map((tech) => (
            <span
              key={tech.trim()}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
