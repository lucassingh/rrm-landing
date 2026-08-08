import { createTheme } from "@mui/material/styles";

// Ported 1:1 from rmm-frontend/src/config/Theme.config.tsx, plus "chrome" —
// the navy (#243b6e) that the old app hardcoded locally in Navbar/Sidebar/table
// headers instead of pulling from the theme. Promoted to a real palette token here.
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    extra1: Palette["primary"];
    extra2: Palette["primary"];
    chrome: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    extra1?: PaletteOptions["primary"];
    extra2?: PaletteOptions["primary"];
    chrome?: PaletteOptions["primary"];
  }
}

export const themePalette = {
  PRIMARY: "#4972b2",
  SECONDARY: "#25aae1",
  TERTIARY: "#b63e81",
  EXTRA1: "#fcb040",
  EXTRA2: "#39b54a",
  CHROME: "#243b6e",
  LIGHT: "#d5d5d5",
  DARK: "#1C1C1C",
  BACKGROUND: "#fff",
  FONT_GLOBAL: '"Inter", sans-serif',
  FONT_HEADERS: '"Archivo Black", sans-serif',
} as const;

export const adminTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: themePalette.PRIMARY },
    secondary: { main: themePalette.SECONDARY },
    tertiary: { main: themePalette.TERTIARY },
    extra1: { main: themePalette.EXTRA1 },
    extra2: { main: themePalette.EXTRA2 },
    chrome: { main: themePalette.CHROME },
    info: { main: themePalette.LIGHT },
    background: { default: "#f4f6fb", paper: themePalette.BACKGROUND },
    text: { primary: themePalette.DARK },
  },
  typography: {
    fontFamily: themePalette.FONT_GLOBAL,
    h1: { fontFamily: themePalette.FONT_HEADERS },
    h2: { fontFamily: themePalette.FONT_HEADERS },
    h3: { fontFamily: themePalette.FONT_HEADERS },
    h4: { fontFamily: themePalette.FONT_HEADERS },
    h5: { fontFamily: themePalette.FONT_HEADERS },
    h6: { fontFamily: themePalette.FONT_HEADERS },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          transition: "transform 0.15s ease",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: themePalette.PRIMARY,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": { borderWidth: 2, borderColor: themePalette.PRIMARY },
          "&:hover fieldset": { borderColor: themePalette.SECONDARY },
          "&.Mui-focused fieldset": { borderColor: themePalette.TERTIARY },
          "&.Mui-error fieldset": { borderColor: themePalette.EXTRA1 },
        },
      },
    },
  },
});
