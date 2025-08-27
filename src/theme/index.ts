import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { darkPalette, lightPalette } from './palettes';

const baseTheme: ThemeOptions = {
    typography: {
        fontFamily: '"Rem Light", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Coast Black", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontFamily: '"Coast Black", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontFamily: '"Coast Black", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        h4: {
            fontFamily: '"Coast Black", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h5: {
            fontFamily: '"Coast Black", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            fontFamily: '"Coast Black", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.1rem',
            fontWeight: 500,
        },
        body1: {
            fontFamily: '"Rem Light", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 300,
        },
        body2: {
            fontFamily: '"Rem Light", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 300,
        },
        button: {
            fontFamily: '"Rem Light", "Roboto", "Helvetica", "Arial", sans-serif',
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
};

export const createAppTheme = (mode: 'light' | 'dark') => {
    const palette = mode === 'light' ? lightPalette : darkPalette;

    return createTheme({
        ...baseTheme,
        palette: {
            mode,
            ...palette,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        textTransform: 'none',
                        borderRadius: '8px',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        [theme.breakpoints.down('md')]: {
                            padding: '8px 12px',
                            fontSize: '0.875rem',
                        },
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
            },
            // Puedes agregar más componentes con estilos responsive
        },
    });
};

export type AppTheme = ReturnType<typeof createAppTheme>;