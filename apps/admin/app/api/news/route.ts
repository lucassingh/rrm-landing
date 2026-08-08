import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db, news } from "@rrm/db";
import { requireProfile } from "@/lib/auth";
import { uploadImage, deleteImageByUrl } from "@/lib/cloudinary";
import { handleApiError } from "@/lib/api-errors";

const MAX_LIMIT = 100;

export async function GET(req: Request) {
  try {
    const profile = await requireProfile();
    const { searchParams } = new URL(req.url);
    const skip = Number(searchParams.get("skip") ?? 0);
    const limit = Math.min(Number(searchParams.get("limit") ?? 10), MAX_LIMIT);

    const rows = await db.query.news.findMany({
      where: profile.role === "admin" ? undefined : eq(news.userId, profile.id),
      with: { author: true },
      orderBy: desc(news.date),
      offset: skip,
      limit,
    });

    return NextResponse.json(rows);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: Request) {
  try {
    const profile = await requireProfile();
    const formData = await req.formData();

    const title = (formData.get("title") as string | null)?.trim();
    const subtitle = (formData.get("subtitle") as string | null)?.trim();
    const imageDescription = (formData.get("image_description") as string | null)?.trim();
    const body = (formData.get("body") as string | null)?.trim();
    const image = formData.get("image") as File | null;

    if (!title || !subtitle || !imageDescription || !body) {
      return NextResponse.json({ detail: "Faltan campos requeridos" }, { status: 422 });
    }
    if (!image || image.size === 0) {
      return NextResponse.json({ detail: "La imagen es requerida" }, { status: 400 });
    }

    const imageUrl = await uploadImage(image, "news");

    try {
      const [created] = await db
        .insert(news)
        .values({ title, subtitle, imageDescription, body, imageUrl, userId: profile.id })
        .returning();
      return NextResponse.json(created, { status: 201 });
    } catch (dbErr) {
      // upload-then-compensate, same pattern as the old backend's news.py
      await deleteImageByUrl(imageUrl);
      throw dbErr;
    }
  } catch (err) {
    return handleApiError(err);
  }
}
