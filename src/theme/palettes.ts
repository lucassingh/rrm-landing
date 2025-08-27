// minimalistic palette

import type { PaletteColor, PaletteColorOptions } from "@mui/material";

/*
export const lightPalette = {
  primary: {
    main: '#2E3B4E', // Azul oscuro elegante
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#6D8B74', // Verde musgo suave
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F8F9FA', // Gris muy claro
    paper: '#FFFFFF',
  },
  text: {
    primary: '#2E3B4E', // Mismo que primary.main
    secondary: '#5A6A7F', // Azul grisáceo
  },
};
 */

/*
export const darkPalette = {
  primary: {
    main: '#A7C4BC', // Verde azulado pastel
    contrastText: '#2E3B4E',
  },
  secondary: {
    main: '#DFEEEA', // Verde muy claro
    contrastText: '#2E3B4E',
  },
  background: {
    default: '#1A2634', // Azul noche
    paper: '#2E3B4E', // Azul oscuro
  },
  text: {
    primary: '#DFEEEA',
    secondary: '#A7C4BC',
  },
};
 */

declare module '@mui/material/styles' {
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

// RRM light palette

export const lightPalette = {
    primary: {
        main: '#4972b2',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#b63e81',
        contrastText: '#FFFFFF',
    },
    tertiary: {
        main: '#b63e81',
        contrastText: '#FFFFFF',
    },
    extra1: {
        main: '#fcb040',
        contrastText: '#000000',
    },
    extra2: {
        main: '#39b54a',
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#F5F7FA',
        paper: '#FFFFFF',
    },
    text: {
        primary: '#1C1C1C',
        secondary: '#4A5568',
    },
};

// RRM dark palette

export const darkPalette = {
    primary: {
        main: '#5c8dd1',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#d14a9d',
        contrastText: '#FFFFFF',
    },
    tertiary: {
        main: '#d14a9d',
        contrastText: '#FFFFFF',
    },
    extra1: {
        main: '#ffc870',
        contrastText: '#000000',
    },
    extra2: {
        main: '#4ccf5c',
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#121212',
        paper: '#1E1E1E',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
    },
};

// palette monocromatic

/*export const lightPalette = {
  primary: {
    main: '#5E6B7D', // Gris azulado medio
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#8E9CAD', // Gris azulado claro
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F0F2F5', // Gris muy claro
    paper: '#FFFFFF',
  },
  text: {
    primary: '#2C3E50', // Gris azulado oscuro
    secondary: '#5E6B7D', // Igual que primary
  },
};*/

/*
export const darkPalette = {
  primary: {
    main: '#C9D1D9', // Gris claro
    contrastText: '#0D1117',
  },
  secondary: {
    main: '#8B949E', // Gris medio
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#0D1117', // Casi negro
    paper: '#161B22', // Gris muy oscuro
  },
  text: {
    primary: '#F0F6FC', // Blanco roto
    secondary: '#C9D1D9', // Gris claro
  },
};
*/

// terra palette

/*export const lightPalette = {
    primary: {
        main: '#6B4F3A', // Marrón tierra
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#8B7355', // Beige oscuro
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#FAF7F3', // Beige muy claro
        paper: '#FFFFFF',
    },
    text: {
        primary: '#3E3A35', // Gris oscuro
        secondary: '#6B4F3A', // Igual que primary
    },
};*/

/*export const darkPalette = {
    primary: {
        main: '#D4B483', // Oro viejo
        contrastText: '#2C2416',
    },
    secondary: {
        main: '#A78A6E', // Marrón claro
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#1A1611', // Marrón muy oscuro
        paper: '#2C2416', // Marrón oscuro
    },
    text: {
        primary: '#F0E6D2', // Beige claro
        secondary: '#D4B483', // Igual que primary
    },
};*/