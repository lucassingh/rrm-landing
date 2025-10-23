import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    keyframes,
    Button,
    Card,
    CardContent,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import { FaHandHoldingHeart, FaShieldAlt, FaGlobeAmericas, FaGlobe, FaCopy } from 'react-icons/fa';
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [copiedText, setCopiedText] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        setIsDarkMode(theme.palette.mode === 'dark');
    }, [theme]);

    const mercadoPagoInfo = {
        titular: "Daniel Mariano Russo",
        cuit: "20-26472631-0",
        cvu: "0000003100063059343371",
        alias: "rmm.ar"
    };

    const paypalUrl = "https://www.paypal.com/ncp/payment/M7WJ8VQ3MX4UC";

    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(label);
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error al copiar: ', err);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <LayoutContentComponent
            layoutType="full"
            backgroundColor={isDarkMode ? darkPalette.background.default : lightPalette.background.default}
            height="auto"
            style={{
                padding: isMobile ? '4rem 1rem' : '6rem 2rem',
                overflow: 'hidden',
                position: 'relative',
                isolation: 'isolate',
            }}
        >
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
                            <Box sx={{ textAlign: 'center', mb: 0 }}>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.primary.main : lightPalette.primary.main}, ${isDarkMode ? darkPalette.extra2.main : lightPalette.extra2.main})`,
                                        mb: 0,
                                        mt: 5,
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

                            {/* Información de Mercado Pago */}
                            <Box sx={{ mb: 3 }}>
                                {/* Titular */}
                                <Box sx={{ mb: 1 }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                            fontWeight: 600,
                                            display: 'block',
                                            mb: 0.5,
                                        }}
                                    >
                                        Titular
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {mercadoPagoInfo.titular}
                                    </Typography>
                                </Box>

                                {/* CUIT/CUIL */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                            fontWeight: 600,
                                            display: 'block',
                                            mb: 0.5,
                                        }}
                                    >
                                        CUIT/CUIL
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {mercadoPagoInfo.cuit}
                                    </Typography>
                                </Box>

                                {/* CVU - Resaltado */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: isDarkMode ? darkPalette.primary.main : lightPalette.primary.main,
                                            fontWeight: 700,
                                            display: 'block',
                                            mb: 0.5,
                                        }}
                                    >
                                        CVU
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                                fontWeight: 600,
                                                backgroundColor: isDarkMode ? darkPalette.primary.main + '20' : lightPalette.primary.main + '15',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                flexGrow: 1,
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {mercadoPagoInfo.cvu}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => copyToClipboard(mercadoPagoInfo.cvu, 'CVU')}
                                            sx={{
                                                color: isDarkMode ? darkPalette.primary.main : lightPalette.primary.main,
                                                '&:hover': {
                                                    backgroundColor: isDarkMode ? darkPalette.primary.main + '20' : lightPalette.primary.main + '20',
                                                }
                                            }}
                                        >
                                            <FaCopy size={14} />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Alias - Resaltado */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: isDarkMode ? darkPalette.primary.main : lightPalette.primary.main,
                                            fontWeight: 700,
                                            display: 'block',
                                            mb: 0.5,
                                        }}
                                    >
                                        Alias
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                                fontWeight: 600,
                                                backgroundColor: isDarkMode ? darkPalette.primary.main + '20' : lightPalette.primary.main + '15',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                flexGrow: 1,
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {mercadoPagoInfo.alias}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => copyToClipboard(mercadoPagoInfo.alias, 'Alias')}
                                            sx={{
                                                color: isDarkMode ? darkPalette.primary.main : lightPalette.primary.main,
                                                '&:hover': {
                                                    backgroundColor: isDarkMode ? darkPalette.primary.main + '20' : lightPalette.primary.main + '20',
                                                }
                                            }}
                                        >
                                            <FaCopy size={14} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Logo Mercado Pago */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2,
                                    animation: `${floatAnimation} 4s ease-in-out infinite`,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        width: isMobile ? '120px' : '140px',
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
                            <Box sx={{ textAlign: 'center', mb: 0 }}>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${isDarkMode ? darkPalette.secondary.main : lightPalette.secondary.main}, ${isDarkMode ? darkPalette.extra1.main : lightPalette.extra1.main})`,
                                        mb: 0,
                                        mt: 5,
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
                                    mt: 12,
                                    mb: 3,
                                    animation: `${floatAnimation} 4s ease-in-out infinite 0.5s`,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '7px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        width: isMobile ? '120px' : '140px',
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

                            {/* Botón de donación PayPal */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    href={paypalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        background: '#0070ba',
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
                                            background: `linear-gradient(135deg, #0070ba, #005ea6)`,
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 8px 25px rgba(0, 112, 186, 0.5)`,
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

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {copiedText} copiado al portapapeles
                </Alert>
            </Snackbar>
        </LayoutContentComponent>
    );
};

export default ColaborateSection;