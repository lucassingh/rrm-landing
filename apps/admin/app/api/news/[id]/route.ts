import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, news, type NewNews } from "@rrm/db";
import { AuthError, requireProfile } from "@/lib/auth";
import { deleteImageByUrl, uploadImage } from "@/lib/cloudinary";
import { handleApiError } from "@/lib/api-errors";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const profile = await requireProfile();
    const { id } = await params;
    const item = await db.query.news.findFirst({
      where: eq(news.id, Number(id)),
      with: { author: true },
    });
    if (!item) return NextResponse.json({ detail: "Noticia no encontrada" }, { status: 404 });

    // admins see everything; non-admins see their own news plus ownerless
    // (author-deleted) news — same rule as the old GET /api/news/{id}
    if (profile.role !== "admin" && item.userId !== profile.id && item.userId !== null) {
      throw new AuthError("No tienes permiso para ver esta noticia", 403);
    }
    return NextResponse.json(item);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const profile = await requireProfile();
    const { id } = await params;
    const newsId = Number(id);
    const existing = await db.query.news.findFirst({ where: eq(news.id, newsId) });
    if (!existing) return NextResponse.json({ detail: "Noticia no encontrada" }, { status: 404 });

    if (profile.role !== "admin" && existing.userId !== profile.id) {
      throw new AuthError("No tienes permiso para actualizar esta noticia", 403);
    }

    const formData = await req.formData();
    const updates: Partial<NewNews> = {};

    for (const [formKey, dbKey] of [
      ["title", "title"],
      ["subtitle", "subtitle"],
      ["image_description", "imageDescription"],
      ["body", "body"],
    ] as const) {
      const value = formData.get(formKey);
      if (typeof value === "string" && value.trim()) {
        updates[dbKey] = value.trim();
      }
    }

    const image = formData.get("image") as File | null;
    let oldImageUrl: string | null = null;
    if (image && image.size > 0) {
      updates.imageUrl = await uploadImage(image, "news");
      oldImageUrl = existing.imageUrl;
    }

    updates.updatedAt = new Date();

    const [updated] = await db.update(news).set(updates).where(eq(news.id, newsId)).returning();

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
    const profile = await requireProfile();
    const { id } = await params;
    const newsId = Number(id);
    const existing = await db.query.news.findFirst({ where: eq(news.id, newsId) });
    if (!existing) return NextResponse.json({ detail: "Noticia no encontrada" }, { status: 404 });

    if (profile.role !== "admin" && existing.userId !== profile.id) {
      throw new AuthError("No tienes permiso para eliminar esta noticia", 403);
    }

    await db.delete(news).where(eq(news.id, newsId));
    await deleteImageByUrl(existing.imageUrl);

    return NextResponse.json({ message: "Noticia eliminada exitosamente" });
  } catch (err) {
    return handleApiError(err);
  }
}
