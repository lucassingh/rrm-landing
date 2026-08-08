import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, entities, entityCategories } from "@rrm/db";
import { EntityForm } from "../../EntityForm";

export default async function EntityEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    db.query.entities.findFirst({ where: eq(entities.id, Number(id)), with: { category: true } }),
    db.query.entityCategories.findMany({ orderBy: asc(entityCategories.id) }),
  ]);
  if (!item) notFound();
  return <EntityForm categories={categories} initial={item} />;
}
