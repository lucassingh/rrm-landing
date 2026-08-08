import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db, entityCategories } from "@rrm/db";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/api-errors";

export async function GET() {
  try {
    await requireAdmin();
    const rows = await db.query.entityCategories.findMany({ orderBy: asc(entityCategories.id) });
    return NextResponse.json(rows);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) return NextResponse.json({ detail: "El nombre es requerido" }, { status: 422 });

    const [created] = await db.insert(entityCategories).values({ name }).returning();
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
}
