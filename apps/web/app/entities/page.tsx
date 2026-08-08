import { asc } from "drizzle-orm";
import { db, entityCategories } from "@rrm/db";
import { EntitiesPageClient } from "@/components/entities/EntitiesPageClient";

// Ported from rrm-landing/src/pages/EntitiesPage.tsx.
export default async function EntitiesPage() {
  const categories = await db.query.entityCategories.findMany({
    with: { entities: true },
    orderBy: asc(entityCategories.id),
  });

  return <EntitiesPageClient categories={categories} />;
}
