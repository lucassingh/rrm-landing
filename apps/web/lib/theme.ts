import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { darkPalette, lightPalette } from "./palettes";

// Ported verbatim from rrm-landing/src/theme/index.ts.
const FONT_BODY = "var(--font-ibm-plex-sans)";
const FONT_HEADING = "var(--font-lexend)";

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: FONT_BODY,
    h1: { fontFamily: FONT_HEADING, fontSize: "2.5rem", fontWeight: 900 },
    h2: { fontFamily: FONT_HEADING, fontSize: "2rem", fontWeight: 900 },
    h3: { fontFamily: FONT_HEADING, fontSize: "1.75rem", fontWeight: 900 },
    h4: { fontFamily: FONT_HEADING, fontSize: "1.5rem", fontWeight: 700 },
    h5: { fontFamily: FONT_HEADING, fontSize: "1.25rem", fontWeight: 700 },
    h6: { fontFamily: FONT_HEADING, fontSize: "1.1rem", fontWeight: 700 },
    subtitle1: { fontFamily: FONT_BODY, fontWeight: 500 },
    subtitle2: { fontFamily: FONT_BODY, fontWeight: 500 },
    body1: { fontFamily: FONT_BODY, fontWeight: 400 },
    body2: { fontFamily: FONT_BODY, fontWeight: 400 },
    button: { fontFamily: FONT_BODY, fontWeight: 500, textTransform: "none" },
    caption: { fontFamily: FONT_BODY, fontWeight: 400 },
    overline: { fontFamily: FONT_BODY, fontWeight: 400 },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          borderRadius: "8px",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 500,
          [theme.breakpoints.down("md")]: { padding: "8px 12px", fontSize: "0.875rem" },
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          backgroundColor: theme.palette.background.paper,
          [theme.breakpoints.up("lg")]: { padding: theme.spacing(3) },
          [theme.breakpoints.only("md")]: { padding: theme.spacing(2) },
          [theme.breakpoints.down("sm")]: { padding: theme.spacing(1) },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === "light" ? lightPalette.primary.main : darkPalette.primary.main,
          [theme.breakpoints.down("md")]: { paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) },
        }),
      },
    },
  },
};

export const createAppTheme = (mode: "light" | "dark") => {
  const palette = mode === "light" ? lightPalette : darkPalette;
  return createTheme({ ...baseTheme, palette: { mode, ...palette } });
};

export type AppTheme = ReturnType<typeof createAppTheme>;
