import { useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery, keyframes } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa';
import { LayoutContentComponent } from './LayoutContentComponent';
import { darkPalette, lightPalette } from '../theme/palettes';
import qrlogo from '../assets/qr-logo.png';
import { useTranslation } from 'react-i18next';

// Animaciones
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const QRSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { t } = useTranslation();

    // Efecto para detectar el modo oscuro del tema
    useEffect(() => {
        setIsDarkMode(theme.palette.mode === 'dark');
    }, [theme]);

    return (
        <LayoutContentComponent
            layoutType="full"
            backgroundColor={isDarkMode ? darkPalette.background.default : lightPalette.background.default}
            height="100vh"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                padding: isMobile ? '2rem 1rem' : '0',
            }}
        >
            {/* Elementos decorativos de fondo con más contraste */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}30, ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}30)`,
                    filter: 'blur(60px)',
                    zIndex: 0,
                    animation: `${floatAnimation} 15s ease-in-out infinite`,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.extra1.main : lightPalette.extra1.main}30, ${isDarkMode ? darkPalette.tertiary.main : lightPalette.tertiary.main}30)`,
                    filter: 'blur(60px)',
                    zIndex: 0,
                    animation: `${floatAnimation} 12s ease-in-out infinite reverse`,
                }}
            />

            {/* Elemento adicional para más profundidad */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main}15, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}15)`,
                    filter: 'blur(50px)',
                    zIndex: 0,
                    animation: `${floatAnimation} 20s ease-in-out infinite`,
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1200px',
                    gap: isMobile ? '3rem' : '5rem',
                    zIndex: 1,
                }}
            >
                {/* Texto impactante */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    <Typography
                        variant={isMobile ? 'h3' : 'h2'}
                        component="h2"
                        sx={{
                            fontWeight: 900,
                            background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}, ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main})`,
                            backgroundSize: '200% 200%',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            fontSize: { xs: '2rem', sm: '5rem' },
                            color: 'transparent',
                            lineHeight: 1.2,
                            animation: `${gradientBackground} 8s ease infinite`,
                        }}
                    >
                        ¿Querés ser parte de RMM?
                    </Typography>

                    <Typography
                        variant={isMobile ? 'h5' : 'h4'}
                        component="p"
                        sx={{
                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                            fontWeight: 500,
                            lineHeight: 1.4,
                            maxWidth: '500px',
                            margin: isMobile ? '0 auto' : '0',
                        }}
                    >
                        Escaneá el QR para saber más sobre cómo unirte a nuestra comunidad y no perderte ninguna novedad.
                    </Typography>
                </Box>

                {/* Tarjeta con QR */}
                <Box
                    sx={{
                        flex: isMobile ? 1 : 0.6,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        animation: `${floatAnimation} 6s ease-in-out infinite`,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#25D366',
                            borderRadius: '20px',
                            padding: isMobile ? '1.5rem' : '2rem',
                            width: isMobile ? '100%' : 'auto',
                            maxWidth: '350px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: `0 20px 40px ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)'}`,
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                                transform: 'rotate(45deg)',
                                animation: `${pulseAnimation} 3s ease infinite`,
                                zIndex: 1,
                            },
                            '&:hover': {
                                transform: 'translateY(-10px) scale(1.02)',
                                boxShadow: `0 30px 60px ${isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
                            }
                        }}
                    >
                        <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#1c1c1c',
                                    fontWeight: 900,
                                    textAlign: 'center',
                                    marginBottom: '1.5rem',
                                    fontSize: isMobile ? '1rem' : '1.3rem',
                                }}
                            >
                                {t('footer.whatsappTitle')}
                            </Typography>

                            <Box
                                component="img"
                                src={qrlogo}
                                alt="QR Code"
                                sx={{
                                    width: isMobile ? '150px' : '200px',
                                    height: isMobile ? '150px' : '200px',
                                    borderRadius: '12px',
                                    objectFit: 'cover',
                                    border: '4px solid white',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                    margin: '0 auto',
                                    display: 'block',
                                }}
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    marginTop: '1.5rem',
                                }}
                            >
                                <FaWhatsapp style={{ color: '#1c1c1c', fontSize: '24px' }} />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#1c1c1c',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {t('footer.whatsappAction')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutContentComponent>
    );
};

export default QRSection;