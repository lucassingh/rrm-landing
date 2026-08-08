import { asc } from "drizzle-orm";
import { db, entityCategories } from "@rrm/db";
import { EntityForm } from "../EntityForm";

// Same static-prerender issue as the entities list — without this, a newly
// created category wouldn't show up in this form's dropdown until redeploy.
export const dynamic = "force-dynamic";

export default async function EntityCreatePage() {
  const categories = await db.query.entityCategories.findMany({ orderBy: asc(entityCategories.id) });
  return <EntityForm categories={categories} />;
}
