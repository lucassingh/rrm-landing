/**
 * One-time migration: rmm-backend's `entity_categories`, `entities`, `news`
 * tables -> Neon, re-uploading every image from Supabase Storage to
 * Cloudinary (rmm-app/entities, rmm-app/news) along the way.
 *
 * Requires user-id-map.json to already exist (run migrate-users.ts first) —
 * it's used to remap news.user_id from the old UUID to the new Clerk id.
 *
 * Usage: pnpm --filter @rrm/migrate migrate:content
 */
import "dotenv/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Client } from "pg";
import { v2 as cloudinary } from "cloudinary";
import { db, entities, entityCategories, news } from "@rrm/db";

const SOURCE_DATABASE_URL = process.env.SOURCE_DATABASE_URL;
if (!SOURCE_DATABASE_URL) throw new Error("SOURCE_DATABASE_URL is not set (packages/migrate/.env)");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const mapPath = fileURLToPath(new URL("../user-id-map.json", import.meta.url));
const userIdMap: Record<string, string> = JSON.parse(readFileSync(mapPath, "utf-8"));

async function uploadToCloudinary(imageUrl: string, folder: "news" | "entities"): Promise<string | null> {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: `rmm-app/${folder}`,
      resource_type: "image",
    });
    return result.secure_url;
  } catch (err) {
    console.error(`    ✗ No se pudo migrar la imagen ${imageUrl}:`, err);
    return null;
  }
}

async function migrateCategories(client: Client) {
  const { rows } = await client.query<{ id: number; name: string }>(
    `SELECT id, name FROM entity_categories ORDER BY id`
  );
  const categoryIdMap: Record<number, number> = {};

  for (const cat of rows) {
    const [inserted] = await db.insert(entityCategories).values({ name: cat.name }).returning();
    categoryIdMap[cat.id] = inserted.id;
    console.log(`  ✓ Categoría "${cat.name}"`);
  }

  return categoryIdMap;
}

async function migrateEntities(client: Client, categoryIdMap: Record<number, number>) {
  const { rows } = await client.query<{
    id: number;
    name: string;
    image_url: string | null;
    web_url: string | null;
    facebook_url: string | null;
    whatsapp_url: string | null;
    is_white: boolean;
    category_id: number;
  }>(
    `SELECT id, name, image_url, web_url, facebook_url, whatsapp_url, is_white, category_id FROM entities ORDER BY id`
  );

  for (const entity of rows) {
    const newImageUrl = entity.image_url ? await uploadToCloudinary(entity.image_url, "entities") : null;
    const newCategoryId = categoryIdMap[entity.category_id];
    if (!newCategoryId) {
      console.error(`  ✗ Entidad "${entity.name}": categoría vieja ${entity.category_id} sin mapeo, salteada`);
      continue;
    }

    await db.insert(entities).values({
      name: entity.name,
      imageUrl: newImageUrl,
      webUrl: entity.web_url,
      facebookUrl: entity.facebook_url,
      whatsappUrl: entity.whatsapp_url,
      isWhite: entity.is_white,
      categoryId: newCategoryId,
    });
    console.log(`  ✓ Entidad "${entity.name}"${newImageUrl ? " (imagen migrada)" : ""}`);
  }
}

async function migrateNews(client: Client) {
  const { rows } = await client.query<{
    id: number;
    title: string;
    subtitle: string;
    image_url: string | null;
    image_description: string;
    body: string;
    date: Date;
    user_id: string | null;
  }>(
    `SELECT id, title, subtitle, image_url, image_description, body, date, user_id FROM news ORDER BY id`
  );

  for (const item of rows) {
    const newImageUrl = item.image_url ? await uploadToCloudinary(item.image_url, "news") : null;
    const newUserId = item.user_id ? userIdMap[item.user_id] ?? null : null;
    if (item.user_id && !newUserId) {
      console.warn(`    ! Noticia "${item.title}": autor viejo ${item.user_id} no está en el mapeo, queda sin autor`);
    }

    await db.insert(news).values({
      title: item.title,
      subtitle: item.subtitle,
      imageUrl: newImageUrl,
      imageDescription: item.image_description,
      body: item.body,
      date: item.date,
      userId: newUserId,
    });
    console.log(`  ✓ Noticia "${item.title}"`);
  }
}

async function main() {
  const client = new Client({ connectionString: SOURCE_DATABASE_URL });
  await client.connect();

  console.log("Migrando categorías...");
  const categoryIdMap = await migrateCategories(client);

  console.log("\nMigrando entidades (con re-upload de imágenes a Cloudinary)...");
  await migrateEntities(client, categoryIdMap);

  console.log("\nMigrando noticias (con re-upload de imágenes a Cloudinary)...");
  await migrateNews(client);

  await client.end();
  console.log("\n✅ Migración de contenido completa.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
