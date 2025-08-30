import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { darkPalette, lightPalette } from './palettes';

const baseTheme: ThemeOptions = {
    typography: {
        fontFamily: '"IBM Plex Sans"',
        h1: {
            fontFamily: '"Lexend"',
            fontSize: '2.5rem',
            fontWeight: 900,
        },
        h2: {
            fontFamily: '"Lexend"',
            fontSize: '2rem',
            fontWeight: 900,
        },
        h3: {
            fontFamily: '"Lexend"',
            fontSize: '1.75rem',
            fontWeight: 900,
        },
        h4: {
            fontFamily: '"Lexend"',
            fontSize: '1.5rem',
            fontWeight: 700,
        },
        h5: {
            fontFamily: '"Lexend"',
            fontSize: '1.25rem',
            fontWeight: 700,
        },
        h6: {
            fontFamily: '"Lexend"',
            fontSize: '1.1rem',
            fontWeight: 700,
        },
        subtitle1: {
            fontFamily: '"IBM Plex Sans"',
            fontWeight: 500,
        },
        subtitle2: {
            fontFamily: '"IBM Plex Sans"',
            fontWeight: 500,
        },
        body1: {
            fontFamily: '"IBM Plex Sans"',
            fontWeight: 400,
        },
        body2: {
            fontFamily: '"IBM Plex Sans"',
            fontWeight: 400,
        },
        button: {
            fontFamily: '"IBM Plex Sans"',
            fontWeight: 500,
            textTransform: 'none',
        },
        caption: {
            fontFamily: '"IBM Plex Sans"',
            fontWeight: 400,
        },
        overline: {
            fontFamily: '"IBM Plex Sans"',
            fontWeight: 400,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    textTransform: 'none',
                    borderRadius: '8px',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 500,
                    [theme.breakpoints.down('md')]: {
                        padding: '8px 12px',
                        fontSize: '0.875rem',
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    }
                }),
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({ theme }) => ({
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    backgroundColor: theme.palette.background.paper,
                    // Ejemplo responsive para Card
                    [theme.breakpoints.up('lg')]: {
                        padding: theme.spacing(3),
                    },
                    [theme.breakpoints.only('md')]: {
                        padding: theme.spacing(2),
                    },
                    [theme.breakpoints.down('sm')]: {
                        padding: theme.spacing(1),
                    },
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.mode === 'light'
                        ? lightPalette.primary.main
                        : darkPalette.primary.main,
                    // Ejemplo responsive para AppBar
                    [theme.breakpoints.down('md')]: {
                        paddingLeft: theme.spacing(2),
                        paddingRight: theme.spacing(2),
                    },
                }),
            },
        }
    },
};

export const createAppTheme = (mode: 'light' | 'dark') => {
    const palette = mode === 'light' ? lightPalette : darkPalette;

    return createTheme({
        ...baseTheme,
        palette: {
            mode,
            ...palette,
        },
    });
};

export type AppTheme = ReturnType<typeof createAppTheme>;