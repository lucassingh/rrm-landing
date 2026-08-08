import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, profiles } from "@rrm/db";
import { UserView } from "./UserView";

export default async function UserViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await db.query.profiles.findFirst({ where: eq(profiles.id, id) });
  if (!profile) notFound();
  return <UserView profile={profile} />;
}
