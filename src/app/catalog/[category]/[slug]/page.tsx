import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// 8:19:30

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const res = await fetch(`https://dummyjson.com/products/${slug}`, {
    cache: "force-cache",
  });

  if (!res.ok) return {};

  const product = await res.json();

  return {
    title: product.title,
    description: `Avail in ${category} category. Price: $${product.price.toFixed(2)}`,
    openGraph: {
      title: product.title,
      description: `Avail in ${category} category. Price: $${product.price.toFixed(
        2,
      )}`,
      images: [product.thumbnail],
    },
  };
}

export default async function CatalogPage({ params }: PageProps) {
  const { category, slug } = await params;
  const res = await fetch(`https://dummyjson.com/products/${slug}`, {
    cache: "force-cache",
  });

  if (!res.ok) notFound();

  const product = await res.json();

  return (
    <div className="product-page p-10 max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl mt-10">
      <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
        {category}
      </span>
      <h1 className="text-3xl font-bold text-white mt-2">{product.title}</h1>
      <p className="text-gray-400 mt-4">{product.description}</p>
      <p className="text-lg font-semibold text-white mt-4">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
}
