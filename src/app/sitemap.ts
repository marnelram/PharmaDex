import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  // Only public, indexable pages are listed. Authenticated routes
  // (settings, quizHistory, achievements) and session-specific dynamic
  // routes (results, practice, quiz/[gameMode]) are intentionally excluded.
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
