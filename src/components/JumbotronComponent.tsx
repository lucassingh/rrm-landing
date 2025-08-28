import React from 'react';
import { Box, Container, Typography } from '@mui/material';

interface JumbotronComponentProps {
    title: string;
    subtitle?: string;
    background?: string;
    backgroundColor?: string;
    backgroundGradient?: string;
    overlay?: boolean;
    overlayOpacity?: number;
    titleColor?: string;
    subtitleColor?: string;
}

const JumbotronComponent: React.FC<JumbotronComponentProps> = ({
    title,
    subtitle,
    background,
    backgroundColor = '#f0f0f0',
    backgroundGradient,
    overlay = true,
    overlayOpacity = 0.7,
    titleColor = '#fff',
    subtitleColor = '#fff'
}) => {

    // Determinar el estilo de fondo
    const backgroundStyle = background
        ? { backgroundImage: `url(${background})` }
        : backgroundGradient
            ? { background: backgroundGradient }
            : { backgroundColor: backgroundColor };

    return (
        <Box
            sx={{
                position: 'relative',
                height: '50vh',
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
                ...backgroundStyle
            }}
        >
            {/* Overlay */}
            {background && overlay && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        opacity: overlayOpacity,
                        zIndex: 1
                    }}
                />
            )}

            {/* Contenido */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    padding: {
                        xs: '20px',
                        md: '30px'
                    },
                    width: '100%',
                    color: '#fff'
                }}
            >
                <Container>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontSize: {
                                xs: '2rem',
                                md: '2.5rem',
                                lg: '3rem'
                            },
                            fontWeight: 'bold',
                            marginBottom: subtitle ? '10px' : '0',
                            color: titleColor,
                            lineHeight: 1.2
                        }}
                    >
                        {title}
                    </Typography>

                    {subtitle && (
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: {
                                    xs: '1rem',
                                    md: '1.3rem',
                                    lg: '1.5rem'
                                },
                                fontWeight: 'normal',
                                margin: 0,
                                color: subtitleColor,
                                maxWidth: '500px',
                                opacity: 0.9,
                                lineHeight: 1.3
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default JumbotronComponent;