import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-21");
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/public-offert`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
