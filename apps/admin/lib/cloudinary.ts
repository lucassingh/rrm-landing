import { randomUUID } from "node:crypto";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Same allow-list + 5MB cap as the old backend's news.py/entities.py upload
// pipeline. The old app never actually resized/processed images despite
// depending on Pillow — this is a faithful port of the raw upload, not a
// downgrade.
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export class ImageValidationError extends Error {}

export type CloudinaryFolder = "news" | "entities";

export async function uploadImage(file: File, folder: CloudinaryFolder): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new ImageValidationError(
      "Tipo de imagen no soportado. Formatos permitidos: JPEG, PNG, WEBP, GIF"
    );
  }
  if (file.size > MAX_SIZE) {
    throw new ImageValidationError("La imagen no debe superar los 5MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `rmm-app/${folder}`,
        public_id: randomUUID(),
        resource_type: "image",
      },
      (error, uploadResult) => {
        if (error || !uploadResult) return reject(error ?? new Error("Upload failed"));
        resolve(uploadResult);
      }
    );
    stream.end(buffer);
  });

  return result.secure_url;
}

/** Best-effort delete, mirrors the old backend's swallow-and-log behavior. */
export async function deleteImageByUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) return;
  try {
    const publicId = extractPublicId(imageUrl);
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("No se pudo borrar el asset de Cloudinary:", err);
  }
}

function extractPublicId(url: string): string | null {
  // e.g. https://res.cloudinary.com/<cloud>/image/upload/v168.../rmm-app/news/<uuid>.jpg
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/);
  return match ? match[1] : null;
}
