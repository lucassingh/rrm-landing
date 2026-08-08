import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, entityCategories } from "@rrm/db";
import { CategoryForm } from "../../CategoryForm";

export default async function EntityCategoryEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.query.entityCategories.findFirst({ where: eq(entityCategories.id, Number(id)) });
  if (!item) notFound();
  return <CategoryForm initial={item} />;
}
