import { asc } from "drizzle-orm";
import { db, entities } from "@rrm/db";
import { EntitiesTable } from "./EntitiesTable";

// See apps/admin/app/(dashboard)/users/page.tsx for why this is needed —
// same static-prerender issue, this time for entities created after deploy.
export const dynamic = "force-dynamic";

export default async function EntitiesListPage() {
  const rows = await db.query.entities.findMany({
    with: { category: true },
    orderBy: [asc(entities.categoryId), asc(entities.id)],
  });
  return <EntitiesTable initialEntities={rows} />;
}
