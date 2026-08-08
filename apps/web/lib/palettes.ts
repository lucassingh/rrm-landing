// Ported verbatim from rrm-landing/src/theme/palettes.ts (the live "RRM" palette —
// the file had several alternate/commented-out palettes that were never active).
import type { PaletteColor, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: PaletteColor;
    extra1: PaletteColor;
    extra2: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    extra1?: PaletteColorOptions;
    extra2?: PaletteColorOptions;
  }
}

export const lightPalette = {
  primary: {
    main: "#4972b2",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#b63e81",
    contrastText: "#FFFFFF",
  },
  tertiary: {
    main: "#ff5733",
    contrastText: "#FFFFFF",
  },
  extra1: {
    main: "#fcb040",
    contrastText: "#000000",
  },
  extra2: {
    main: "#39b54a",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#F5F7FA",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#1C1C1C",
    secondary: "#4A5568",
  },
};

export const darkPalette = {
  primary: {
    main: "#5c8dd1",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#d14a9d",
    contrastText: "#FFFFFF",
  },
  tertiary: {
    main: "#ff5733",
    contrastText: "#FFFFFF",
  },
  extra1: {
    main: "#ffc870",
    contrastText: "#000000",
  },
  extra2: {
    main: "#4ccf5c",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#121212",
    paper: "#1E1E1E",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B0B0B0",
  },
};
