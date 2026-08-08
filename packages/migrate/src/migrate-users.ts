/**
 * One-time migration: rmm-backend's `users` table -> Clerk.
 *
 * Preserves the existing bcrypt password hashes via Clerk's password-import
 * feature (passwordDigest + passwordHasher: "bcrypt") so nobody has to reset
 * their password. Writes user-id-map.json (old UUID -> new Clerk user id),
 * which migrate-content.ts needs to remap news.userId.
 *
 * Usage: pnpm --filter @rrm/migrate migrate:users
 */
import "dotenv/config";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Client } from "pg";
import { createClerkClient } from "@clerk/backend";
import { db, profiles } from "@rrm/db";

const SOURCE_DATABASE_URL = process.env.SOURCE_DATABASE_URL;
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

if (!SOURCE_DATABASE_URL) throw new Error("SOURCE_DATABASE_URL is not set (packages/migrate/.env)");
if (!CLERK_SECRET_KEY) throw new Error("CLERK_SECRET_KEY is not set (packages/migrate/.env)");

const clerk = createClerkClient({ secretKey: CLERK_SECRET_KEY });

const mapPath = fileURLToPath(new URL("../user-id-map.json", import.meta.url));

type OldUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  hashed_password: string | null;
  is_active: boolean;
  role: string;
};

async function main() {
  const client = new Client({ connectionString: SOURCE_DATABASE_URL });
  await client.connect();

  const { rows } = await client.query<OldUser>(
    `SELECT id, email, first_name, last_name, hashed_password, is_active, role FROM users ORDER BY email`
  );
  await client.end();

  console.log(`Encontrados ${rows.length} usuarios en la base vieja.\n`);

  const idMap: Record<string, string> = {};

  for (const oldUser of rows) {
    try {
      const clerkUser = await clerk.users.createUser({
        emailAddress: [oldUser.email],
        firstName: oldUser.first_name,
        lastName: oldUser.last_name,
        // If for some reason there's no stored hash, the user just resets
        // their password on first login (or signs in with Google if the
        // email matches) — no password fields are sent in that case.
        ...(oldUser.hashed_password
          ? { passwordDigest: oldUser.hashed_password, passwordHasher: "bcrypt" as const }
          : {}),
        publicMetadata: { role: oldUser.role === "admin" ? "admin" : "user" },
      });

      idMap[oldUser.id] = clerkUser.id;

      await db
        .insert(profiles)
        .values({
          id: clerkUser.id,
          email: oldUser.email,
          firstName: oldUser.first_name,
          lastName: oldUser.last_name,
          role: oldUser.role === "admin" ? "admin" : "user",
          isActive: oldUser.is_active,
        })
        .onConflictDoNothing();

      console.log(`  ✓ ${oldUser.email} -> ${clerkUser.id}`);
    } catch (err) {
      console.error(`  ✗ Error migrando ${oldUser.email}:`, err);
    }
  }

  writeFileSync(mapPath, JSON.stringify(idMap, null, 2));
  console.log(`\n✅ Mapeo guardado en packages/migrate/user-id-map.json (${Object.keys(idMap).length} usuarios).`);
  console.log("   Ahora podés correr: pnpm --filter @rrm/migrate migrate:content");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
