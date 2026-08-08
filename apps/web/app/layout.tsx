import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ibmPlexSans, lexend } from "@/lib/fonts";
import { Providers } from "./providers";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Red Misiones Mundiales",
  description:
    "Red de Misiones Mundiales — noticias, programas, foros, regiones y entidades del ecosistema misionero.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const savedMode = cookieStore.get("app_theme_mode")?.value;
  const initialThemeMode: "light" | "dark" = savedMode === "dark" ? "dark" : "light";

  return (
    <html lang="es" data-theme={initialThemeMode} className={`${ibmPlexSans.variable} ${lexend.variable}`}>
      <body>
        <Providers initialThemeMode={initialThemeMode}>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
