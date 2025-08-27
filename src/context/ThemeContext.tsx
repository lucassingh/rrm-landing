import React, { createContext, useContext, useState, useMemo } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { createAppTheme, type AppTheme } from '../theme';

type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext<{
    mode: ThemeMode;
    toggleTheme: () => void;
    theme: AppTheme;
}>(null!);

export const useThemeContext = () => useContext(ThemeContext);

const THEME_STORAGE_KEY = 'app_theme_mode';

const getInitialMode = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light';

    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
        return 'light';
    } catch (e) {
        console.warn('Error reading theme from localStorage', e);
        return 'light';
    }
};

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(getInitialMode);

    const toggleTheme = () => {
        setMode(prev => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem(THEME_STORAGE_KEY, newMode);
            } catch (e) {
                console.warn('Error saving theme to localStorage', e);
            }
            return newMode;
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
};