import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, forums } from "@rrm/db";
import { requireAdmin } from "@/lib/auth";
import { handleApiError } from "@/lib/api-errors";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const item = await db.query.forums.findFirst({ where: eq(forums.id, Number(id)) });
    if (!item) return NextResponse.json({ detail: "Foro no encontrado" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
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

    const existing = await db.query.forums.findFirst({ where: eq(forums.id, Number(id)) });
    if (!existing) return NextResponse.json({ detail: "Foro no encontrado" }, { status: 404 });

    const [updated] = await db
      .update(forums)
      .set({ name, coordinatorName, whatsappUrl, updatedAt: new Date() })
      .where(eq(forums.id, Number(id)))
      .returning();

    return NextResponse.json(updated);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const existing = await db.query.forums.findFirst({ where: eq(forums.id, Number(id)) });
    if (!existing) return NextResponse.json({ detail: "Foro no encontrado" }, { status: 404 });

    await db.delete(forums).where(eq(forums.id, Number(id)));

    return NextResponse.json({ message: "Foro eliminado exitosamente" });
  } catch (err) {
    return handleApiError(err);
  }
}
