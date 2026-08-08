import { asc } from "drizzle-orm";
import { db, entities } from "@rrm/db";
import { EntitiesTable } from "./EntitiesTable";

export default async function EntitiesListPage() {
  const rows = await db.query.entities.findMany({
    with: { category: true },
    orderBy: [asc(entities.categoryId), asc(entities.id)],
  });
  return <EntitiesTable initialEntities={rows} />;
}
