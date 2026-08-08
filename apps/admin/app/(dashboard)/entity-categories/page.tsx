import { asc } from "drizzle-orm";
import { db, entityCategories } from "@rrm/db";
import { CategoriesTable } from "./CategoriesTable";

export default async function EntityCategoriesListPage() {
  const rows = await db.query.entityCategories.findMany({ orderBy: asc(entityCategories.id) });
  return <CategoriesTable initialCategories={rows} />;
}
