import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchProduct(id: string) {
  "use cache";

  cacheLife("days");

  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) notFound();

  const data = await res.json();

  return data;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const product = await fetchProduct(id);

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-white mt-2">{product.title}</h1>
      <p className="text-gray-400 mt-4">{product.description}</p>
      <div className="text-2xl font-mono text-white mt-6">${product.price}</div>
    </div>
  );
}

// 4:00:01
