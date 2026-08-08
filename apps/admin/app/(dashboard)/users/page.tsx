import { asc } from "drizzle-orm";
import { db, profiles } from "@rrm/db";
import { UsersTable } from "./UsersTable";

// Nothing on this page reads cookies/headers, so Next would otherwise treat
// it as static and prerender it once at build time — meaning new users
// (added via Clerk sign-up after the last deploy) would never show up here.
export const dynamic = "force-dynamic";

export default async function UsersListPage() {
  const rows = await db.query.profiles.findMany({ orderBy: asc(profiles.createdAt) });
  return <UsersTable initialUsers={rows} />;
}
