import { NextResponse } from "next/server";
import { AuthError } from "./auth";
import { ImageValidationError } from "./cloudinary";

export function handleApiError(err: unknown) {
  if (err instanceof AuthError) {
    return NextResponse.json({ detail: err.message }, { status: err.status });
  }
  if (err instanceof ImageValidationError) {
    return NextResponse.json({ detail: err.message }, { status: 400 });
  }
  console.error(err);
  return NextResponse.json({ detail: "Error interno" }, { status: 500 });
}
