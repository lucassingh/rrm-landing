import { asc } from "drizzle-orm";
import { db, entityCategories } from "@rrm/db";
import { EntityForm } from "../EntityForm";

export default async function EntityCreatePage() {
  const categories = await db.query.entityCategories.findMany({ orderBy: asc(entityCategories.id) });
  return <EntityForm categories={categories} />;
}
