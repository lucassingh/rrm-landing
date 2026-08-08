import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db, profiles } from "@rrm/db";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/api-errors";

export async function GET() {
  try {
    await requireAdmin();
    const rows = await db.query.profiles.findMany({ orderBy: asc(profiles.createdAt) });
    return NextResponse.json(rows);
  } catch (err) {
    return handleApiError(err);
  }
}
