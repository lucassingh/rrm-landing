import { asc } from "drizzle-orm";
import { db, forums } from "@rrm/db";
import { ForumsTable } from "./ForumsTable";

// See apps/admin/app/(dashboard)/users/page.tsx for why this is needed.
export const dynamic = "force-dynamic";

export default async function ForumsListPage() {
  const rows = await db.query.forums.findMany({ orderBy: asc(forums.id) });
  return <ForumsTable initialForums={rows} />;
}
