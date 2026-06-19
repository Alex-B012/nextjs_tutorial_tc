interface ShopPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;

  const currentSlug = slug || [];
  const [category, brand, model] = currentSlug;

  return (
    <div className="p-6 text-zinc-500">
      {category ? <p>Category: {category}</p> : <p>Main Store</p>}

      {brand ? (
        <p>Explore {brand} collection</p>
      ) : (
        <p>Browse all our products</p>
      )}
      <p>Model: {model ? model : "no model"}</p>
      <div className="mt-20">
        Debug - slug_state: {JSON.stringify(currentSlug)}
      </div>
    </div>
  );
}
