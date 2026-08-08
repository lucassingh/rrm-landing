/**
 * Seed script — ports the exact dataset from the old rmm-backend/seed_entities.py
 * (5 categories, 28 entities, same contact URLs). Images are left null, same as
 * before — upload them from the admin backoffice after seeding.
 *
 * Usage: pnpm --filter @rrm/db seed
 */
import "dotenv/config";
import { db } from "./client";
import { entities, entityCategories } from "./schema";

type SeedEntity = {
  name: string;
  web_url: string | null;
  facebook_url: string | null;
  whatsapp_url: string | null;
  is_white: boolean;
};

type SeedCategory = {
  name: string;
  entities: SeedEntity[];
};

const SEED_DATA: SeedCategory[] = [
  {
    name: "Agencias Enviadoras",
    entities: [
      {
        name: "Agencia Misionera Internacional",
        web_url: null,
        facebook_url: "https://www.facebook.com/www.AMI.digital",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491161954415",
        is_white: false,
      },
      {
        name: "Fronteras",
        web_url: "https://fronterasiberoamerica.org/",
        facebook_url: "https://www.facebook.com/arg.fronteras",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491169513596",
        is_white: false,
      },
      {
        name: "Jóvenes con una Misión",
        web_url: "https://ywam.org/quienes-somos?lang=es",
        facebook_url: "https://www.facebook.com/JucumYwamItuzaingo/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5493755214956",
        is_white: false,
      },
      {
        name: "Operación Movilización",
        web_url: "http://www.om.org/",
        facebook_url: "https://web.facebook.com/argentina.om/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491166836710",
        is_white: true,
      },
      {
        name: "Pueblos en Misión Internacional",
        web_url: "https://pminternacional.org",
        facebook_url: "https://web.facebook.com/pminternacional",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491151229265",
        is_white: false,
      },
      {
        name: "Latinlink",
        web_url: "https://www.latinlink.org/int",
        facebook_url: "https://www.facebook.com/latinlinkpage/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5493874201200",
        is_white: false,
      },
      {
        name: "Preciosa Sangre",
        web_url: "http://www.preciosasangre.org/",
        facebook_url: null,
        whatsapp_url: "https://api.whatsapp.com/send?phone=54962770714",
        is_white: false,
      },
      {
        name: "Letra Argentina",
        web_url: "https://letraargentina.wixsite.com/letra",
        facebook_url: "https://www.facebook.com/letraargentina/",
        whatsapp_url: null,
        is_white: false,
      },
    ],
  },
  {
    name: "Agencias de Envío Denominacionales",
    entities: [
      {
        name: "DNM - Unión de las Asambleas de Dios",
        web_url: "https://dnmargentina.org/page/",
        facebook_url: null,
        whatsapp_url: null,
        is_white: true,
      },
    ],
  },
  {
    name: "Entidades de Capacitación",
    entities: [
      {
        name: "Centro de Capacitación Misionera Transcultural (CCMT)",
        web_url: "https://ccmt.com.ar/",
        facebook_url: "https://www.facebook.com/CCMTCentro/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5493537657147",
        is_white: false,
      },
      {
        name: "CECABIM",
        web_url: "https://www.facebook.com/cecabim",
        facebook_url: "https://www.facebook.com/cecabim",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5493814565415",
        is_white: false,
      },
      {
        name: "Centro Misionero",
        web_url: "https://centromisionero.net/",
        facebook_url: "https://www.facebook.com/centromisionerooficial",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491159369297",
        is_white: false,
      },
      {
        name: "Escuela de Misiones y Plantación de Iglesias (EMPI)",
        web_url: "https://www.empi.com.ar/",
        facebook_url: null,
        whatsapp_url: "https://api.whatsapp.com/send?phone=5493513503784",
        is_white: false,
      },
      {
        name: "Instituto Bíblico Río de la Plata (IBRP)",
        web_url: "https://ibrp.com.ar/",
        facebook_url: "https://www.facebook.com/IBRPoficial/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491137730665",
        is_white: true,
      },
      {
        name: "Manarah Latino",
        web_url: null,
        facebook_url: null,
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491166800142",
        is_white: false,
      },
      {
        name: "Programa de Capacitación Misionera Básica (PCMB)",
        web_url: "http://pcmb.com.ar/",
        facebook_url: null,
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491159794129",
        is_white: false,
      },
      {
        name: "Perspectivas Argentina",
        web_url: "https://perspectivas.ar/",
        facebook_url: "https://www.facebook.com/perspectivasargentina/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491154110092",
        is_white: false,
      },
      {
        name: "Semilla de Trigo",
        web_url: null,
        facebook_url: null,
        whatsapp_url: "https://api.whatsapp.com/send?phone=5492215574775",
        is_white: false,
      },
    ],
  },
  {
    name: "Iglesias Enviadoras",
    entities: [
      {
        name: "Iglesia de la Puerta Abierta",
        web_url: "https://www.lapuertaabierta.org/",
        facebook_url: "https://www.facebook.com/lapuertaabierta",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491132119184",
        is_white: false,
      },
    ],
  },
  {
    name: "Entidades de Movilización",
    entities: [
      {
        name: "Casa Misionera Rosario",
        web_url: "https://www.lapuertaabierta.org/",
        facebook_url: "https://www.facebook.com/CasaMisioneraRosario/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5493416429724",
        is_white: false,
      },
      {
        name: "Conexión Oriental",
        web_url: "http://cnxoriental.com/",
        facebook_url: "https://www.facebook.com/cnxoriental/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491131658062",
        is_white: false,
      },
      {
        name: "Cruzada Estudiantil y Profesional para Cristo (CRU)",
        web_url: "https://www.cru.org/ar/es.html",
        facebook_url: "https://www.facebook.com/CruzadaEstudiantil.Argentina/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5493426391047",
        is_white: false,
      },
      {
        name: "Iglesias en Misión",
        web_url: "https://iglesiasenmision.org/",
        facebook_url: "https://www.facebook.com/iglesiasenmision",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5491159369297",
        is_white: false,
      },
      {
        name: "Movida",
        web_url: "https://www.movida-net.com/",
        facebook_url: "https://www.facebook.com/cimaargentina/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5493516321025",
        is_white: false,
      },
      {
        name: "Negocios en la Extensión del Reino (NER)",
        web_url: null,
        facebook_url: "https://www.facebook.com/",
        whatsapp_url: "https://api.whatsapp.com/send?phone=5492615006442",
        is_white: false,
      },
      {
        name: "Red Argentina de Iglesias y Ministerios (RAIM)",
        web_url: "https://ministerioraim.weebly.com/",
        facebook_url: "https://www.facebook.com/ministerio.raim.3",
        whatsapp_url: null,
        is_white: false,
      },
      {
        name: "Parlamento y Fe Internacional",
        web_url: "https://www.instagram.com/parlamentoyfe",
        facebook_url: "https://www.facebook.com/share/16uVxzx9yf/",
        whatsapp_url: "https://wa.me/5493512404204",
        is_white: false,
      },
      {
        name: "Jornadas Misioneras",
        web_url: "https://www.jornadasmisioneras.org/",
        facebook_url: null,
        whatsapp_url: null,
        is_white: true,
      },
    ],
  },
];

async function runSeed() {
  const existing = await db.select().from(entityCategories).limit(1);
  if (existing.length > 0) {
    console.log("⚠️  Ya existen categorías en la base de datos. Seed omitido.");
    return;
  }

  let totalCategories = 0;
  let totalEntities = 0;

  for (const cat of SEED_DATA) {
    const [category] = await db
      .insert(entityCategories)
      .values({ name: cat.name })
      .returning();

    await db.insert(entities).values(
      cat.entities.map((e) => ({
        name: e.name,
        imageUrl: null,
        webUrl: e.web_url,
        facebookUrl: e.facebook_url,
        whatsappUrl: e.whatsapp_url,
        isWhite: e.is_white,
        categoryId: category.id,
      }))
    );

    totalCategories += 1;
    totalEntities += cat.entities.length;
    console.log(`  ✓ Categoría '${cat.name}' — ${cat.entities.length} entidades`);
  }

  console.log(`\n✅ Seed completado: ${totalCategories} categorías, ${totalEntities} entidades.`);
  console.log("   Las imágenes quedan en null — súbelas desde el backoffice.");
}

runSeed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error durante el seed:", err);
    process.exit(1);
  });
