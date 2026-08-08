import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, forums } from "@rrm/db";
import { ForumForm } from "../../ForumForm";

export default async function ForumEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.query.forums.findFirst({ where: eq(forums.id, Number(id)) });
  if (!item) notFound();
  return <ForumForm initial={item} />;
}
