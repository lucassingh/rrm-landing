import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, entities, entityCategories } from "@rrm/db";
import { requireAdmin } from "@/lib/auth";
import { deleteImageByUrl } from "@/lib/cloudinary";
import { handleApiError } from "@/lib/api-errors";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const item = await db.query.entityCategories.findFirst({ where: eq(entityCategories.id, Number(id)) });
    if (!item) return NextResponse.json({ detail: "Categoría no encontrada" }, { status: 404 });
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
    if (!name) return NextResponse.json({ detail: "El nombre es requerido" }, { status: 422 });

    const existing = await db.query.entityCategories.findFirst({ where: eq(entityCategories.id, Number(id)) });
    if (!existing) return NextResponse.json({ detail: "Categoría no encontrada" }, { status: 404 });

    const [updated] = await db
      .update(entityCategories)
      .set({ name, updatedAt: new Date() })
      .where(eq(entityCategories.id, Number(id)))
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
    const categoryId = Number(id);
    const existing = await db.query.entityCategories.findFirst({ where: eq(entityCategories.id, categoryId) });
    if (!existing) return NextResponse.json({ detail: "Categoría no encontrada" }, { status: 404 });

    // The old backend cascade-deleted a category's entities but left their
    // Storage images orphaned. Clean up Cloudinary here before the DB cascade fires.
    const entitiesInCategory = await db.query.entities.findMany({
      where: eq(entities.categoryId, categoryId),
    });
    await Promise.all(entitiesInCategory.map((e) => deleteImageByUrl(e.imageUrl)));

    await db.delete(entityCategories).where(eq(entityCategories.id, categoryId));

    return NextResponse.json({ message: "Categoría eliminada exitosamente" });
  } catch (err) {
    return handleApiError(err);
  }
}
