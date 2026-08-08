# Setup — rrm-next

## 1. Variables de entorno

Copiá `.env.example` a `.env.local` en cada paquete que lo tenga:

- `packages/db/.env` (para correr `drizzle-kit push`/`seed` desde la terminal)
- `apps/admin/.env.local`
- `apps/web/.env.local` (se crea en el siguiente paso del plan)

## 2. Clerk — configuración manual en el dashboard (no se puede hacer por código)

1. **API Keys**: Clerk dashboard → tu app → *API Keys* → copiar Publishable key y Secret key a `apps/admin/.env.local`.
2. **Session token custom claims**: Clerk dashboard → *Sessions* → *Customize session token* → agregar:
   ```json
   { "metadata": "{{user.public_metadata}}" }
   ```
   Esto es lo que permite que `middleware.ts` lea `sessionClaims.metadata.role` sin pegarle a la base de datos en cada request.
3. **Webhook**: Clerk dashboard → *Webhooks* → *Add Endpoint*.
   - URL: `https://<tu-dominio>/admin/api/webhooks/clerk` (en local, necesitás un túnel tipo `ngrok`/`clerk dev` para que Clerk te pueda pegar).
   - Eventos: `user.created`, `user.updated`, `user.deleted`.
   - Copiar el *Signing Secret* a `CLERK_WEBHOOK_SECRET` en `apps/admin/.env.local`.
   - Mientras no esté configurado, no pasa nada: `lib/ensure-profile.ts` crea el perfil al vuelo la primera vez que el usuario entra al dashboard.
4. **Google login**: Clerk dashboard → *User & Authentication* → *Social Connections* → activar Google (ya viene con credenciales compartidas de Clerk para desarrollo; para producción conviene configurar credenciales propias de Google OAuth).

## 3. Base de datos (Neon)

```bash
cd packages/db
cp .env.example .env   # completar DATABASE_URL con la connection string pooled de Neon
pnpm push               # crea las tablas
pnpm seed                # carga las 5 categorías / 28 entidades (sin imágenes)
```

## 4. Cloudinary

Dashboard → *Account Details* → copiar Cloud Name, API Key y API Secret a `apps/admin/.env.local`. La carpeta `rmm-app` ya la tenés creada — el código sube todo bajo `rmm-app/news/*` y `rmm-app/entities/*`.

## 5. Correr todo

```bash
pnpm install
pnpm dev   # levanta admin y web en paralelo (Turborepo)
```

Un solo dominio: `apps/web` es la app "dueña" (puerto 3000) y reenvía todo lo que empieza con `/admin` a `apps/admin` (puerto interno 3002, definido en `apps/web/.env.local` como `ADMIN_ORIGIN`) — patrón [Multi Zones](https://nextjs.org/docs/app/guides/multi-zones) de Next.js. `apps/admin` tiene `basePath: "/admin"` en su `next.config.ts`, así que todas sus rutas, assets y redirects quedan bajo ese prefijo automáticamente.

| URL | Qué es |
|---|---|
| `http://localhost:3000/` | Landing pública |
| `http://localhost:3000/news`, `/entities`, `/regions`, `/forums`, `/contact` | Resto de la landing |
| `http://localhost:3000/admin/sign-in` | Login del backoffice |
| `http://localhost:3000/admin/news`, `/admin/entities`, `/admin/users` | Dashboard (requiere login) |
| `http://localhost:3002` | `apps/admin` directo — solo para debug, no lo uses en el navegador |

En producción: dos proyectos de Vercel (uno por app), `ADMIN_ORIGIN` en las env vars de `apps/web` apunta a la URL del deploy de `apps/admin`, y solo el dominio de `apps/web` (ej. `redmisionesmundiales.org`) queda expuesto públicamente.
