import { clerkClient } from "@clerk/nextjs/server";
import { db, profiles, type Profile } from "@rrm/db";
import { eq } from "drizzle-orm";

/**
 * Single source of truth for "a Clerk user exists but has no `profiles` row
 * yet" — used both by the `user.created` webhook (the normal path) and as a
 * just-in-time fallback in requireProfile() (in case the webhook hasn't fired
 * yet, e.g. it's not wired up in local dev, or delivery is delayed). Preserves
 * the old backend's "first user is admin" bootstrap rule either way.
 */
export async function ensureProfile(userId: string): Promise<Profile | null> {
  const [existing] = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
  if (existing) return existing;

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const email =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    "";

  const [existingAny] = await db.select({ id: profiles.id }).from(profiles).limit(1);
  const role: "admin" | "user" = existingAny ? "user" : "admin";

  const [created] = await db
    .insert(profiles)
    .values({
      id: userId,
      email,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      role,
    })
    .onConflictDoNothing()
    .returning();

  if (created) {
    await clerk.users.updateUserMetadata(userId, { publicMetadata: { role } });
    return created;
  }

  // Lost a race against a concurrent insert (webhook fired at the same time).
  const [row] = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
  return row ?? null;
}
