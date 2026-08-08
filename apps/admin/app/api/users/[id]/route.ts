import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import { db, profiles } from "@rrm/db";
import { AuthError, requireAdmin, requireProfile } from "@/lib/auth";
import { handleApiError } from "@/lib/api-errors";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const me = await requireProfile();
    const { id } = await params;
    if (me.role !== "admin" && me.id !== id) {
      throw new AuthError("No tienes permiso para ver este usuario", 403);
    }
    const item = await db.query.profiles.findFirst({ where: eq(profiles.id, id) });
    if (!item) return NextResponse.json({ detail: "Usuario no encontrado" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    return handleApiError(err);
  }
}

/** Role toggle — the only way to promote a user now that sign-up has no role field. */
export async function PATCH(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const role = body.role;
    if (role !== "admin" && role !== "user") {
      return NextResponse.json({ detail: "Rol inválido" }, { status: 422 });
    }

    const existing = await db.query.profiles.findFirst({ where: eq(profiles.id, id) });
    if (!existing) return NextResponse.json({ detail: "Usuario no encontrado" }, { status: 404 });

    const [updated] = await db
      .update(profiles)
      .set({ role, updatedAt: new Date() })
      .where(eq(profiles.id, id))
      .returning();

    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(id, { publicMetadata: { role } });

    return NextResponse.json(updated);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const me = await requireAdmin();
    const { id } = await params;

    if (me.id === id) {
      throw new AuthError("No podés eliminar tu propia cuenta", 403);
    }

    const existing = await db.query.profiles.findFirst({ where: eq(profiles.id, id) });
    if (!existing) return NextResponse.json({ detail: "Usuario no encontrado" }, { status: 404 });

    const clerk = await clerkClient();
    try {
      await clerk.users.deleteUser(id);
    } catch (err) {
      console.error("No se pudo eliminar el usuario de Clerk:", err);
    }

    // ON DELETE SET NULL on news.userId orphans their news automatically.
    await db.delete(profiles).where(eq(profiles.id, id));

    return NextResponse.json({ message: "Usuario eliminado exitosamente" });
  } catch (err) {
    return handleApiError(err);
  }
}
