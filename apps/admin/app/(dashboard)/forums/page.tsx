import { asc } from "drizzle-orm";
import { db, forums } from "@rrm/db";
import { ForumsTable } from "./ForumsTable";

export default async function ForumsListPage() {
  const rows = await db.query.forums.findMany({ orderBy: asc(forums.id) });
  return <ForumsTable initialForums={rows} />;
}
