import { MetadataRoute } from "next";

const websiteUrl = "http://yourwebsite.com";
const dummy_websiteUrl = "https://dummyjson.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || websiteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const res = await fetch(`${dummy_websiteUrl}/products?limit=30`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    const dynamicRoutes: MetadataRoute.Sitemap = data.products.map(
      (product: any) => ({
        url: `${baseUrl}/catalog/${product.category}/${product.id}`,
        lastModified: new Date(product.meta.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.log("Error fetching products for sitemap:", error);
    return staticRoutes;
  }
}
