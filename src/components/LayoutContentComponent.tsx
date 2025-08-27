import React from 'react';
import { Container, Box, Grid, useMediaQuery, useTheme } from '@mui/material';

interface LayoutContentProps {
    children: React.ReactNode;
    layoutType?: 'full' | 'split';
    backgroundColor?: string;
    backgroundColors?: {
        left: string;
        right: string;
    };
    height?: string | { xs?: string; sm?: string; md?: string; lg?: string };
    sectionPadding?: string | { xs?: string; sm?: string; md?: string; lg?: string };
    id?: string;
    style?: React.CSSProperties;
}

export const LayoutContentComponent = React.forwardRef<HTMLDivElement, LayoutContentProps>(
    (
        {
            children,
            layoutType = 'full',
            backgroundColor,
            backgroundColors = { left: '#0a0a0c', right: '#0a0a0c' },
            height = '100vh',
            sectionPadding = '6%',
            id,
            style,
        },
        ref
    ) => {
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down('md'));

        const getResponsiveValue = (value: string | { [key: string]: string } | undefined, defaultValue: string) => {
            if (!value) return defaultValue;
            if (typeof value === 'string') return value;

            return {
                xs: value.xs || defaultValue,
                sm: value.sm || value.xs || defaultValue,
                md: value.md || value.sm || value.xs || defaultValue,
                lg: value.lg || value.md || value.sm || value.xs || defaultValue,
            };
        };

        const responsiveHeight = getResponsiveValue(height, '100vh');
        const responsivePadding = getResponsiveValue(sectionPadding, '6%');

        if (layoutType === 'full' || isMobile) {
            return (
                <Box
                    component="section"
                    ref={ref}
                    style={style}
                    sx={{
                        width: '100%',
                        height: responsiveHeight,
                        backgroundColor: backgroundColor || backgroundColors.left,
                        scrollSnapAlign: 'start',
                        margin: 0,
                        padding: 0,
                        position: 'relative',
                        boxSizing: 'border-box',
                        scrollMarginTop: '0px',
                        overflow: 'hidden',
                        ...(style ? style : {}),
                    }}
                    id={id}
                >
                    <Container
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: responsivePadding,
                            boxSizing: 'border-box',
                        }}
                    >
                        {children}
                    </Container>
                </Box>
            );
        }

        return (
            <Box
                ref={ref}
                style={style}
                sx={{
                    width: '100%',
                    height: responsiveHeight,
                    ...(style ? style : {}),
                }}
                id={id}
            >
                <Grid container sx={{ height: '100%' }}>
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            backgroundColor: backgroundColors.left,
                        }}
                    >
                        <Container
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: responsivePadding,
                                paddingBottom: responsivePadding,
                                boxSizing: 'border-box',
                            }}
                        >
                            {React.Children.toArray(children)[0]}
                        </Container>
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            backgroundColor: backgroundColors.right,
                        }}
                    >
                        <Container
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: responsivePadding,
                                paddingBottom: responsivePadding,
                                boxSizing: 'border-box',
                            }}
                        >
                            {React.Children.toArray(children)[1]}
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        );
    }
);

LayoutContentComponent.displayName = 'LayoutContent';

export const LayoutContent = LayoutContentComponent;