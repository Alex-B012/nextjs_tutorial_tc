import { MetadataRoute } from "next/dist/lib/metadata/types/metadata-interface";

const websiteUrl = "http://yourwebsite.com";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || websiteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/catalog"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "YandexBot",
        allow: ["/"],
        disallow: ["/admin/"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
