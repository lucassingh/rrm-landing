import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db, profiles } from "@rrm/db";
import { eq } from "drizzle-orm";
import { ensureProfile } from "@/lib/ensure-profile";

/**
 * Syncs Clerk identity -> our own `profiles` table (role, active flag, name/email
 * for joins/display) and mirrors the role back into Clerk publicMetadata so
 * middleware/session claims can read it without a DB round-trip.
 *
 * Preserves the old backend's "first user becomes admin" bootstrap rule
 * (app/routes/auth.py in the old rmm-backend), but — unlike the old system —
 * the role is never client-supplied: it's decided here, server-side, from
 * whether `profiles` is empty yet.
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(webhookSecret);

  let event: WebhookEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Clerk webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "user.created": {
      await ensureProfile(event.data.id);
      break;
    }

    case "user.updated": {
      const user = event.data;
      const email =
        user.email_addresses.find((e) => e.id === user.primary_email_address_id)
          ?.email_address ?? user.email_addresses[0]?.email_address ?? "";

      await db
        .update(profiles)
        .set({
          email,
          firstName: user.first_name ?? "",
          lastName: user.last_name ?? "",
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, user.id));
      break;
    }

    case "user.deleted": {
      // ON DELETE SET NULL on news.userId takes care of orphaning their news.
      if (event.data.id) {
        await db.delete(profiles).where(eq(profiles.id, event.data.id));
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
