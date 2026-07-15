import { getProducts } from "@/lib/microcms";
import ProductCard from "@/components/ProductCard";

export default async function Page() {
  const { contents: products } = await getProducts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Works</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
