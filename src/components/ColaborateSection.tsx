import { useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery, keyframes, Button, Card, CardContent } from '@mui/material';
import { FaHandHoldingHeart, FaShieldAlt, FaGlobeAmericas, FaGlobe } from 'react-icons/fa';
import { LayoutContentComponent } from './LayoutContentComponent';
import { darkPalette, lightPalette } from '../theme/palettes';
import { useTranslation } from 'react-i18next';

// Importar logos
import mplogo from '../assets/mercadopago-logo.svg';
import pplogo from '../assets/paypal-logo.svg';

// Animaciones
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
  50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }
  100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const subtleFloat = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const ColaborateSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setIsDarkMode(theme.palette.mode === 'dark');
    }, [theme]);

    // URLs de donación - listas para recibir los links reales
    const mercadoPagoUrl = "#"; // Reemplazar con el link real de Mercado Pago
    const paypalUrl = "#"; // Reemplazar con el link real de PayPal

    return (
        <LayoutContentComponent
            layoutType="full"
            backgroundColor={isDarkMode ? darkPalette.background.default : lightPalette.background.default}
            height="auto"
            style={{
                padding: isMobile ? '4rem 1rem' : '6rem 2rem',
                overflow: 'hidden',
                position: 'relative',
                isolation: 'isolate', // Mejora el manejo de z-index
            }}
        >
            {/* Fondo con gradiente suave para evitar cortes bruscos */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(ellipse at top right, 
                        ${isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main}15, 
                        transparent 50%),
                    radial-gradient(ellipse at bottom left, 
                        ${isDarkMode ? darkPalette.tertiary.main : lightPalette.tertiary.main}15, 
                        transparent 50%)`,
                    zIndex: 0,
                }}
            />

            {/* Elementos flotantes mejorados */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '5%',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main}20, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}20)`,
                    filter: 'blur(40px)',
                    zIndex: 0,
                    animation: `${subtleFloat} 20s ease-in-out infinite`,
                    opacity: 0.7,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '5%',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.tertiary.main : lightPalette.tertiary.main}20, ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}20)`,
                    filter: 'blur(40px)',
                    zIndex: 0,
                    animation: `${subtleFloat} 18s ease-in-out infinite reverse`,
                    opacity: 0.7,
                }}
            />

            <Box
                sx={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                    zIndex: 1,
                    position: 'relative',
                }}
            >
                {/* Header impactante */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: isMobile ? 4 : 6,
                    }}
                >
                    <Typography
                        variant={isMobile ? 'h3' : 'h2'}
                        component="h2"
                        sx={{
                            fontWeight: 900,
                            background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.extra1.main : lightPalette.extra1.main}, ${isDarkMode ? darkPalette.tertiary.main : lightPalette.tertiary.main})`,
                            backgroundSize: '200% 200%',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            lineHeight: 1.2,
                            animation: `${gradientBackground} 6s ease infinite`,
                            mb: 2,
                        }}
                    >
                        {t('donate.title')}
                    </Typography>

                    <Typography
                        variant={isMobile ? 'h6' : 'h5'}
                        component="p"
                        sx={{
                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                            fontWeight: 400,
                            lineHeight: 1.6,
                            maxWidth: '800px',
                            margin: '0 auto',
                        }}
                    >
                        {t('donate.subtitle')}
                    </Typography>
                </Box>

                {/* Grid de 2 columnas */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? 3 : 4,
                        alignItems: 'stretch',
                    }}
                >
                    {/* Tarjeta Mercado Pago - Argentina */}
                    <Card
                        sx={{
                            background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}15, ${isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main}15)`,
                            border: `2px solid ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}30`,
                            borderRadius: '20px',
                            padding: isMobile ? 2 : 3,
                            position: 'relative',
                            overflow: 'hidden',
                            animation: `${floatAnimation} 8s ease-in-out infinite`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                animation: `${pulseAnimation} 2s ease-in-out infinite`,
                            }
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: `linear-gradient(90deg, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}, ${isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main})`,
                            }}
                        />

                        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                            {/* Header de la tarjeta */}
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}, ${isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main})`,
                                        mb: 2,
                                    }}
                                >
                                    <FaGlobeAmericas
                                        style={{
                                            color: 'white',
                                            fontSize: '24px'
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        fontWeight: 700,
                                        color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                        mb: 1,
                                    }}
                                >
                                    {t('donate.argentinaTitle')}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                    }}
                                >
                                    {t('donate.localSupport')}
                                </Typography>
                            </Box>

                            {/* Descripción */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                    textAlign: 'center',
                                    mb: 3,
                                    lineHeight: 1.6,
                                }}
                            >
                                {t('donate.argentinaDescription')}
                            </Typography>

                            {/* Logo Mercado Pago */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 3,
                                    animation: `${floatAnimation} 4s ease-in-out infinite`,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        width: isMobile ? '100px' : '140px',
                                        height: isMobile ? '50px' : '60px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={mplogo}
                                        alt="Mercado Pago"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '7px',
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Botón de donación */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    href={mercadoPagoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        background: '#4972b2',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: isMobile ? '1rem' : '1.1rem',
                                        padding: isMobile ? '10px 24px' : '12px 32px',
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        minWidth: '160px',
                                        '&:before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: '-100%',
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                            transition: 'left 0.5s',
                                        },
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}, ${isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main})`,
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 8px 25px ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}50`,
                                            '&:before': {
                                                left: '100%',
                                            },
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                    startIcon={<FaHandHoldingHeart />}
                                >
                                    {t('donate.donateButton')}
                                </Button>

                                {/* Texto seguro */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        mt: 2,
                                    }}
                                >
                                    <FaShieldAlt
                                        style={{
                                            color: isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main,
                                            fontSize: '14px'
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {t('donate.securePayment')}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Tarjeta PayPal - Internacional */}
                    <Card
                        sx={{
                            background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}15, ${isDarkMode ? darkPalette.extra1.main : lightPalette.extra1.main}15)`,
                            border: `2px solid ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}30`,
                            borderRadius: '20px',
                            padding: isMobile ? 2 : 3,
                            position: 'relative',
                            overflow: 'hidden',
                            animation: `${floatAnimation} 8s ease-in-out infinite 1s`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                animation: `${pulseAnimation} 2s ease-in-out infinite`,
                            }
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: `linear-gradient(90deg, ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}, ${isDarkMode ? darkPalette.extra1.main : lightPalette.extra1.main})`,
                            }}
                        />

                        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                            {/* Header de la tarjeta */}
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}, ${isDarkMode ? darkPalette.extra1.main : lightPalette.extra1.main})`,
                                        mb: 2,
                                    }}
                                >
                                    <FaGlobe
                                        style={{
                                            color: 'white',
                                            fontSize: '24px'
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        fontWeight: 700,
                                        color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                        mb: 1,
                                    }}
                                >
                                    {t('donate.internationalTitle')}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                    }}
                                >
                                    {t('donate.globalSupport')}
                                </Typography>
                            </Box>

                            {/* Descripción */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                    textAlign: 'center',
                                    mb: 3,
                                    lineHeight: 1.6,
                                }}
                            >
                                {t('donate.internationalDescription')}
                            </Typography>

                            {/* Logo PayPal */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 3,
                                    animation: `${floatAnimation} 4s ease-in-out infinite 0.5s`,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '7px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        width: isMobile ? '100px' : '140px',
                                        height: isMobile ? '50px' : '60px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={pplogo}
                                        alt="PayPal"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '7px',
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Botón de donación */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    href={paypalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        background: '#4972b2',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: isMobile ? '1rem' : '1.1rem',
                                        padding: isMobile ? '10px 24px' : '12px 32px',
                                        borderRadius: '7px',
                                        textTransform: 'none',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        minWidth: '160px',
                                        '&:before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: '-100%',
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                            transition: 'left 0.5s',
                                        },
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}, ${isDarkMode ? darkPalette.extra1.main : lightPalette.extra1.main})`,
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 8px 25px ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}50`,
                                            '&:before': {
                                                left: '100%',
                                            },
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                    startIcon={<FaHandHoldingHeart />}
                                >
                                    {t('donate.donateButton')}
                                </Button>

                                {/* Texto seguro */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        mt: 2,
                                    }}
                                >
                                    <FaShieldAlt
                                        style={{
                                            color: isDarkMode ? darkPalette.extra1.main : lightPalette.extra1.main,
                                            fontSize: '14px'
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {t('donate.securePayment')}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Texto de impacto */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 4,
                        p: 3,
                        borderRadius: '15px',
                        background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.background.paper : lightPalette.background.paper}, ${isDarkMode ? darkPalette.background.default : lightPalette.background.default})`,
                        border: `1px solid ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}20`,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main,
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                        }}
                    >
                        <FaHandHoldingHeart />
                        {t('donate.impactText')}
                    </Typography>
                </Box>
            </Box>
        </LayoutContentComponent>
    );
};

export default ColaborateSection;