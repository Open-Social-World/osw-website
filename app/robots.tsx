import { MetadataRoute } from "next";

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"], // Add paths you want to block from indexing
    },
    sitemap: "https://opensocial.world/sitemap.xml", // Replace with your actual domain
  };
}
