import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, entities, entityCategories, type NewEntity } from "@rrm/db";
import { requireAdmin } from "@/lib/auth";
import { deleteImageByUrl, uploadImage } from "@/lib/cloudinary";
import { handleApiError } from "@/lib/api-errors";

type Params = { params: Promise<{ id: string }> };

function normalize(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function parseIsWhite(value: FormDataEntryValue | null): boolean {
  if (typeof value !== "string") return false;
  return ["true", "1", "yes"].includes(value.toLowerCase());
}

export async function GET(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const item = await db.query.entities.findFirst({
      where: eq(entities.id, Number(id)),
      with: { category: true },
    });
    if (!item) return NextResponse.json({ detail: "Entidad no encontrada" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    return handleApiError(err);
  }
}

// Unlike news.py's PUT (which treats an empty string as "keep the old value"),
// this uses formData.has() so field-present-in-payload = update, matching what
// the old entities.py PUT already did — normalized here as the one true semantic.
export async function PUT(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const entityId = Number(id);
    const existing = await db.query.entities.findFirst({ where: eq(entities.id, entityId) });
    if (!existing) return NextResponse.json({ detail: "Entidad no encontrada" }, { status: 404 });

    const formData = await req.formData();
    const updates: Partial<NewEntity> = {};

    if (formData.has("name")) {
      const name = (formData.get("name") as string).trim();
      if (name) updates.name = name;
    }
    if (formData.has("category_id")) {
      const categoryId = Number(formData.get("category_id"));
      const category = await db.query.entityCategories.findFirst({
        where: eq(entityCategories.id, categoryId),
      });
      if (!category) return NextResponse.json({ detail: "Categoría no encontrada" }, { status: 404 });
      updates.categoryId = categoryId;
    }
    if (formData.has("web_url")) updates.webUrl = normalize(formData.get("web_url"));
    if (formData.has("facebook_url")) updates.facebookUrl = normalize(formData.get("facebook_url"));
    if (formData.has("whatsapp_url")) updates.whatsappUrl = normalize(formData.get("whatsapp_url"));
    if (formData.has("is_white")) updates.isWhite = parseIsWhite(formData.get("is_white"));

    const image = formData.get("image") as File | null;
    let oldImageUrl: string | null = null;
    if (image && image.size > 0) {
      updates.imageUrl = await uploadImage(image, "entities");
      oldImageUrl = existing.imageUrl;
    }

    updates.updatedAt = new Date();

    const [updated] = await db.update(entities).set(updates).where(eq(entities.id, entityId)).returning();

    if (oldImageUrl && oldImageUrl !== updated.imageUrl) {
      await deleteImageByUrl(oldImageUrl);
    }

    return NextResponse.json(updated);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const existing = await db.query.entities.findFirst({ where: eq(entities.id, Number(id)) });
    if (!existing) return NextResponse.json({ detail: "Entidad no encontrada" }, { status: 404 });

    await db.delete(entities).where(eq(entities.id, Number(id)));
    await deleteImageByUrl(existing.imageUrl);

    return NextResponse.json({ message: "Entidad eliminada exitosamente" });
  } catch (err) {
    return handleApiError(err);
  }
}
