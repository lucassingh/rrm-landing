import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, profiles } from "@rrm/db";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

// Admin-only areas: today this is enforced only in the UI (nav is hidden but the
// route itself isn't guarded) — this middleware is the real, server-side fix.
const isAdminRoute = createRouteMatcher([
  "/entities(.*)",
  "/entity-categories(.*)",
  "/users(.*)",
  "/api/entities(.*)",
  "/api/entity-categories(.*)",
  "/api/users(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  const { userId, sessionClaims } = await auth.protect();

  if (isAdminRoute(req)) {
    let role = sessionClaims?.metadata?.role;

    // The session token only carries `metadata.role` once the "customize
    // session token" claim is configured in the Clerk dashboard (see
    // SETUP.md) — until then, or right after a role change (the old token
    // is cached until it refreshes), this is undefined. Fall back to the DB
    // itself rather than silently treating an unconfigured/stale session as
    // "not admin".
    if (!role && userId) {
      const [profile] = await db
        .select({ role: profiles.role })
        .from(profiles)
        .where(eq(profiles.id, userId))
        .limit(1);
      role = profile?.role;
    }

    if (role !== "admin") {
      // NextResponse.redirect() builds a raw absolute URL — unlike next/navigation's
      // router/redirect(), it does NOT auto-apply basePath, so it's spelled out here.
      return NextResponse.redirect(new URL("/admin/news", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
