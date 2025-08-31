import { useRef } from 'react';
import { Box, Typography, TextField, Button, useMediaQuery, useTheme, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import qrlogo from '../assets/qr-logo.png';
import { useTranslation } from 'react-i18next';

export const FooterComponent = () => {
    const footerRef = useRef(null);
    const { t } = useTranslation();

    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const width = useTransform(scrollYProgress, [0, 1], ["80%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    return (
        <Box
            id='footer-section'
            ref={footerRef}
            sx={{
                width: '100%',
                height: isMobile ? 'auto' : '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <motion.div
                style={{
                    width,
                    opacity,
                    height: isMobile ? 'auto' : '80%',
                    position: isMobile ? 'relative' : 'absolute',
                    bottom: '0',
                    padding: '20px',
                    background: '#1E1E1E',
                    borderTopLeftRadius: '30px',
                    borderTopRightRadius: '30px'
                }}
            >
                {/* Eliminé el Container que envolvía al Grid */}
                <Grid
                    container
                    spacing={4}
                    sx={{
                        height: isMobile ? 'auto' : '100%',
                        maxWidth: '1200px', // Añadí un ancho máximo similar al Container
                        margin: '0 auto',   // Centrado horizontal
                        padding: { xs: '0 16px', sm: '0 24px' } // Padding responsivo
                    }}
                >
                    {/* Columna 1: Logo y descripción */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: isMobile ? 'flex-start' : 'center',
                        alignItems: 'flex-start',
                        height: isMobile ? 'auto' : '100%',
                        marginTop: isMobile ? '30px' : '0'
                    }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '4rem', md: '4rem' },
                                fontWeight: '700',
                                fontStyle: 'italic',
                                background: '#FFF',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                width: '300px',
                                color: 'transparent',
                                mb: 1,
                                lineHeight: '0.9'
                            }}
                        >
                            RMM
                        </Typography>

                        <Typography
                            sx={{
                                color: '#fff',
                                mb: 4,
                                fontWeight: 'medium',
                                fontSize: '16px',
                                width: '270px'
                            }}
                        >
                            {t('footer.description')}
                        </Typography>
                    </Grid>

                    {/* Columna 2: Links, redes sociales y newsletter */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: isMobile ? 'flex-start' : 'center',
                        alignItems: 'flex-start',
                        height: isMobile ? 'auto' : '100%',
                    }}>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4
                        }}>
                            <Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#FFF',
                                        mb: 2,
                                        fontWeight: '800'
                                    }}
                                >
                                    {t('footer.usefulLinks')}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography
                                        component="a"
                                        href="#section0"
                                        sx={{
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#b63e81' }
                                        }}
                                    >
                                        {t('footer.news')}
                                    </Typography>
                                    <Typography
                                        component="a"
                                        href="#section1"
                                        sx={{
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#b63e81' }
                                        }}
                                    >
                                        {t('footer.regions')}
                                    </Typography>
                                    <Typography
                                        component="a"
                                        href="#section2"
                                        sx={{
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#b63e81' }
                                        }}
                                    >
                                        {t('footer.resources')}
                                    </Typography>
                                    <Typography
                                        component="a"
                                        href="#section4"
                                        sx={{
                                            color: '#fff',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#b63e81' }
                                        }}
                                    >
                                        {t('footer.contact')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#FFF',
                                        mb: 2,
                                        fontWeight: '800'
                                    }}
                                >
                                    {t('footer.socialNetworks')}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box
                                        component="a"
                                        href="https://www.facebook.com/RedMisionesMundialesArgentina/"
                                        target="_blank"
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: '#0a0a0c',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#ffffff',
                                            '&:hover': {
                                                color: '#b63e81',
                                                backgroundColor: '#0a0a0c'
                                            }
                                        }}
                                    >
                                        <FaFacebookF />
                                    </Box>
                                    <Box
                                        component="a"
                                        href="https://www.instagram.com/rmm_argentina/"
                                        target="_blank"
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: '#0a0a0c',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#ffffff',
                                            '&:hover': {
                                                color: '#b63e81',
                                                backgroundColor: '#0a0a0c'
                                            }
                                        }}
                                    >
                                        <FaInstagram />
                                    </Box>
                                    <Box
                                        component="a"
                                        href="https://t.me/RMM_Argentina"
                                        target="_blank"
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: '#0a0a0c',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#ffffff',
                                            '&:hover': {
                                                color: '#b63e81',
                                                backgroundColor: '#0a0a0c'
                                            }
                                        }}
                                    >
                                        <FaTelegram />
                                    </Box>
                                    <Box
                                        component="a"
                                        href="https://www.youtube.com/@redmisionesmundialesargentina"
                                        target="_blank"
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: '#0a0a0c',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#ffffff',
                                            '&:hover': {
                                                color: '#b63e81',
                                                backgroundColor: '#0a0a0c'
                                            }
                                        }}
                                    >
                                        <FaYoutube />
                                    </Box>
                                </Box>
                            </Box>

                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#fff',
                                        mb: 2,
                                        fontWeight: 'medium'
                                    }}
                                >
                                    {t('footer.newsletter')}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField
                                        placeholder={t('footer.emailPlaceholder')}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '4px',
                                            flex: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'none',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#b63e81',
                                                },
                                            },
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#b63e81',
                                            color: '#0a0a0c',
                                            height: '40px',
                                            '&:hover': {
                                                backgroundColor: '#b63e81',
                                                color: '#0a0a0c'
                                            }
                                        }}
                                    >
                                        {t('footer.send')}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Columna 3: Card de WhatsApp con QR */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: isMobile ? 'flex-start' : 'center',
                        alignItems: 'flex-start',
                        height: isMobile ? 'auto' : '100%',
                    }}>
                        <Card sx={{
                            backgroundColor: '#25D366',
                            borderRadius: '12px',
                            padding: '20px',
                            width: '100%',
                            height: isMobile ? 'auto' : '75%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%',
                                padding: '0 !important'
                            }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#1c1c1c',
                                        fontWeight: '900',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        maxWidth: '200px',
                                        gap: 0.5
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
                                        borderRadius: '8px',
                                        objectFit: 'cover'
                                    }}
                                />

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#1c1c1c',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}
                                >
                                    <FaWhatsapp style={{ color: '#1c1c1c', fontSize: '24px' }} />
                                    {t('footer.whatsappAction')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </motion.div>
        </Box>
    );
};