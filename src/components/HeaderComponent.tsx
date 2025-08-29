import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme, type SxProps, type TypographyVariant } from '@mui/material/styles';
import { darkPalette, lightPalette } from '../theme/palettes';

type PaletteColorKey = {
    [K in keyof typeof lightPalette]:
    typeof lightPalette[K] extends { main: string; contrastText: string } ? K : never
}[keyof typeof lightPalette];

export interface HeaderComponentProps {
    title: string;
    subtitle?: string;
    titleVariant?: TypographyVariant | 'inherit';
    titleColor?: PaletteColorKey | 'textPrimary' | 'textSecondary';
    subtitleColor?: PaletteColorKey | 'textPrimary' | 'textSecondary';
    align?: 'left' | 'center' | 'right';
    spacing?: number;
    sx?: SxProps;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
    title,
    subtitle,
    titleVariant = 'h4',
    titleColor = 'primary',
    subtitleColor = 'primary',
    align = 'center',
    spacing = 1,
    sx,
}) => {
    const theme = useTheme();

    const getColor = (colorKey: PaletteColorKey | 'textPrimary' | 'textSecondary') => {
        if (colorKey === 'textPrimary') {
            return theme.palette.text.primary;
        }
        if (colorKey === 'textSecondary') {
            return theme.palette.text.secondary;
        }

        const lightColor = lightPalette[colorKey] as { main: string; contrastText: string };
        const darkColor = darkPalette[colorKey] as { main: string; contrastText: string };

        if (theme.palette.mode === 'dark') {
            return darkColor.contrastText || lightColor.main;
        }

        return lightColor.main;
    };

    return (
        <Box
            sx={{
                width: '100%',
                textAlign: align,
                mb: spacing,
                ...sx,
            }}
        >
            <Typography
                variant={titleVariant}
                component={titleVariant as React.ElementType}
                sx={{
                    color: getColor(titleColor),
                    fontWeight: 600,
                    mb: subtitle ? 0.5 : 0,
                }}
            >
                {title}
            </Typography>

            {subtitle && (
                <Typography
                    variant="body1"
                    sx={{
                        color: getColor(subtitleColor),
                        opacity: 0.8,
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default HeaderComponent;