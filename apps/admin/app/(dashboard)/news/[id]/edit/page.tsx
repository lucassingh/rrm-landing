import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, news } from "@rrm/db";
import { NewsForm } from "../../NewsForm";

export default async function NewsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.query.news.findFirst({
    where: eq(news.id, Number(id)),
    with: { author: true },
  });
  if (!item) notFound();
  return <NewsForm initial={item} />;
}
