/**
 * One-off seed for the `forums` table — ports the dataset that used to be
 * hardcoded in apps/web/components/forums/forumCardsData.ts, plus the new
 * "Deporte y Misión" forum.
 *
 * Usage: pnpm --filter @rrm/db seed:forums
 */
import "dotenv/config";
import { db } from "./client";
import { forums } from "./schema";

const SEED_DATA = [
  { name: "Agencias y ministerios de movilización", coordinatorName: "Roberto Warton", whatsappUrl: "https://wa.me/5492974030189" },
  { name: "Capacitación", coordinatorName: "Nestor Cornara", whatsappUrl: "https://wa.me/5491159794129" },
  { name: "Cuidado Integral del Misionero", coordinatorName: "Vanesa Leder", whatsappUrl: "https://wa.me/5491132944674" },
  { name: "Misioneros Transculturales", coordinatorName: "Nora Velazquez", whatsappUrl: "https://wa.me/5491158410483" },
  { name: "Movilizadores", coordinatorName: "Ricardo Bertogliati", whatsappUrl: "https://wa.me/5491140750270" },
  { name: "Pastores", coordinatorName: "Jhonatan Tiganni", whatsappUrl: "https://wa.me/5493516983255" },
  { name: "Pueblos Originarios", coordinatorName: "Daniel Lescano", whatsappUrl: "https://wa.me/5493874201198" },
  { name: "Trabajo y Misión", coordinatorName: "Luis Perfetti", whatsappUrl: "https://wa.me/5491171642588" },
  { name: "Gestión Pública y Misión", coordinatorName: "Luciano Bongarrá", whatsappUrl: "https://wa.me/5491161576339" },
  { name: "Iglesias Enviadoras", coordinatorName: "José Marcantoni", whatsappUrl: "https://wa.me/5491121858757" },
  { name: "Capellanía y Misión", coordinatorName: "Roberto Dominguez", whatsappUrl: "https://wa.me/5491140434906" },
  { name: "Intercesión", coordinatorName: "Marisel Rojas", whatsappUrl: "https://wa.me/5491153384722" },
  { name: "Deporte y Misión", coordinatorName: "Julio Bautista", whatsappUrl: "https://wa.me/5491163087305" },
];

async function runSeed() {
  const existing = await db.select().from(forums).limit(1);
  if (existing.length > 0) {
    console.log("⚠️  Ya existen foros en la base de datos. Seed omitido.");
    return;
  }

  await db.insert(forums).values(SEED_DATA);
  console.log(`✅ Seed completado: ${SEED_DATA.length} foros.`);
}

runSeed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error durante el seed:", err);
    process.exit(1);
  });
