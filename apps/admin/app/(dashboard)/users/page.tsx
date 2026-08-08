import { asc } from "drizzle-orm";
import { db, profiles } from "@rrm/db";
import { UsersTable } from "./UsersTable";

export default async function UsersListPage() {
  const rows = await db.query.profiles.findMany({ orderBy: asc(profiles.createdAt) });
  return <UsersTable initialUsers={rows} />;
}
