import { auth } from "@clerk/nextjs/server";
import { ensureProfile } from "./ensure-profile";

export async function getCurrentProfile() {
  const { userId } = await auth();
  if (!userId) return null;
  return ensureProfile(userId);
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function requireProfile() {
  const profile = await getCurrentProfile();
  if (!profile) throw new AuthError("No autenticado", 401);
  if (!profile.isActive) throw new AuthError("Usuario inactivo", 403);
  return profile;
}

export async function requireAdmin() {
  const profile = await requireProfile();
  if (profile.role !== "admin") throw new AuthError("Se requiere rol de administrador", 403);
  return profile;
}
