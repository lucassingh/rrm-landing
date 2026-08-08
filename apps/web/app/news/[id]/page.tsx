import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, news } from "@rrm/db";
import { NewsDetailClient } from "@/components/news/NewsDetailClient";

// Ported from rrm-landing/src/pages/NewsByIDPage.tsx, but as a real dynamic
// route instead of reading the news object out of react-router location
// state. That old approach meant a direct link or a page refresh always hit
// the "la noticia no está disponible" fallback, since nothing ever fetched
// the news item by id. This route fetches it for real and 404s when it
// doesn't exist.
export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const item = await db.query.news.findFirst({
    where: eq(news.id, numericId),
    with: { author: true },
  });

  if (!item) {
    notFound();
  }

  return <NewsDetailClient news={item} />;
}
