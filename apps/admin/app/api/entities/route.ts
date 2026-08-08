import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db, entities, entityCategories } from "@rrm/db";
import { requireAdmin } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { handleApiError } from "@/lib/api-errors";

function normalize(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function parseIsWhite(value: FormDataEntryValue | null): boolean {
  if (typeof value !== "string") return false;
  return ["true", "1", "yes"].includes(value.toLowerCase());
}

export async function GET() {
  try {
    await requireAdmin();
    const rows = await db.query.entities.findMany({
      with: { category: true },
      orderBy: [asc(entities.categoryId), asc(entities.id)],
    });
    return NextResponse.json(rows);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const formData = await req.formData();

    const name = (formData.get("name") as string | null)?.trim();
    const categoryId = Number(formData.get("category_id"));

    if (!name || Number.isNaN(categoryId)) {
      return NextResponse.json({ detail: "Nombre y categoría son requeridos" }, { status: 422 });
    }

    const category = await db.query.entityCategories.findFirst({
      where: eq(entityCategories.id, categoryId),
    });
    if (!category) return NextResponse.json({ detail: "Categoría no encontrada" }, { status: 404 });

    // image is optional for entities, unlike news
    const image = formData.get("image") as File | null;
    const imageUrl = image && image.size > 0 ? await uploadImage(image, "entities") : null;

    const [created] = await db
      .insert(entities)
      .values({
        name,
        categoryId,
        imageUrl,
        webUrl: normalize(formData.get("web_url")),
        facebookUrl: normalize(formData.get("facebook_url")),
        whatsappUrl: normalize(formData.get("whatsapp_url")),
        isWhite: parseIsWhite(formData.get("is_white")),
      })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
}
