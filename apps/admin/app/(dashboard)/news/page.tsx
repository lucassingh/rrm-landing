import { desc, eq } from "drizzle-orm";
import { db, news } from "@rrm/db";
import { requireProfile } from "@/lib/auth";
import { NewsTable } from "./NewsTable";

export default async function NewsListPage() {
  const profile = await requireProfile();
  const rows = await db.query.news.findMany({
    where: profile.role === "admin" ? undefined : eq(news.userId, profile.id),
    with: { author: true },
    orderBy: desc(news.date),
  });

  return <NewsTable initialNews={rows} />;
}
