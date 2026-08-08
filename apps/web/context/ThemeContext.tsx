"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createAppTheme, type AppTheme } from "@/lib/theme";

type ThemeMode = "light" | "dark";

const ThemeContext = createContext<{
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: AppTheme;
}>(null!);

export const useThemeContext = () => useContext(ThemeContext);

const THEME_STORAGE_KEY = "app_theme_mode";

export function CustomThemeProvider({
  children,
  initialMode = "light",
}: {
  children: React.ReactNode;
  initialMode?: ThemeMode;
}) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  // initialMode comes from the app_theme_mode cookie read server-side (see
  // app/layout.tsx) so returning dark-mode users don't get a light->dark flash.
  // localStorage stays the source of truth (mirrors the old app's behavior) —
  // this only re-syncs if it disagrees with what the server guessed.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      // One-time sync from localStorage (a browser-only external system) on
      // mount — the functional-update form avoids needing `mode` as a dep.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode((current) => ((saved === "light" || saved === "dark") && saved !== current ? saved : current));
    } catch {
      // localStorage unavailable — keep server-provided initialMode
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
        document.cookie = `${THEME_STORAGE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      } catch (e) {
        console.warn("Error saving theme to localStorage", e);
      }
      return next;
    });
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
