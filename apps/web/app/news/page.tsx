import { desc } from "drizzle-orm";
import { db, news } from "@rrm/db";
import { NewsListClient } from "@/components/news/NewsListClient";

// Ported from rrm-landing/src/pages/NewsPage.tsx. Fetches the full list
// server-side (no query-param pagination — pagination stays client-side,
// matching the original) and hands it to the client component that
// replicates the original page's layout/behavior.
export default async function NewsPage() {
  const items = await db.query.news.findMany({
    with: { author: true },
    orderBy: desc(news.date),
  });

  return <NewsListClient news={items} />;
}
