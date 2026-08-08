import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db, forums } from "@rrm/db";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/api-errors";

export async function GET() {
  try {
    await requireAdmin();
    const rows = await db.query.forums.findMany({ orderBy: asc(forums.id) });
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
    const coordinatorName = typeof body.coordinatorName === "string" ? body.coordinatorName.trim() : "";
    const whatsappUrl = typeof body.whatsappUrl === "string" ? body.whatsappUrl.trim() : "";

    if (!name || !coordinatorName || !whatsappUrl) {
      return NextResponse.json(
        { detail: "Nombre, coordinador y link de WhatsApp son requeridos" },
        { status: 422 }
      );
    }

    const [created] = await db.insert(forums).values({ name, coordinatorName, whatsappUrl }).returning();
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
}
