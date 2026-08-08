"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CustomThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

export function Providers({
  children,
  initialThemeMode,
}: {
  children: React.ReactNode;
  initialThemeMode: "light" | "dark";
}) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <CustomThemeProvider initialMode={initialThemeMode}>
        <LanguageProvider>{children}</LanguageProvider>
      </CustomThemeProvider>
    </AppRouterCacheProvider>
  );
}
