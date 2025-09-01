import { useRef } from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
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
                <Grid
                    container
                    spacing={4}
                    sx={{
                        height: isMobile ? 'auto' : '100%',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: { xs: '0 16px', sm: '0 24px' }
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
                                    <Box
                                        component="a"
                                        href="https://wa.me/5491132119184"
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
                                        <FaWhatsapp />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* colum 3  */}
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
                            gap: 3
                        }}>
                            {/* Título de la sección */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#FFF',
                                    mb: 1,
                                    fontWeight: '800',
                                    fontSize: '1.1rem'
                                }}
                            >
                                {t('footer.location') || 'Nuestra Ubicación'}
                            </Typography>

                            {/* Contenedor del mapa */}
                            <Box sx={{
                                width: '100%',
                                height: '200px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                position: 'relative'
                            }}>
                                {/* Mapa de Google usando iframe directamente */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.536389057038!2d-58.486495!3d-34.6358552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc99796be8e73%3A0x113f27c7674d1780!2sCnel.%20Ram%C3%B3n%20L.%20Falc%C3%B3n%204080%2C%20C1407GSP%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1725223940494!5m2!1ses!2sar"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </Box>

                            {/* Información de dirección */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography sx={{
                                    color: '#fff',
                                    fontSize: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <span style={{
                                        color: '#b63e81',
                                        fontWeight: 'bold',
                                        fontSize: '18px'
                                    }}>📍</span>
                                    {t('footer.address') || 'Dirección:'}
                                </Typography>
                                <Typography sx={{
                                    color: '#ccc',
                                    fontSize: '14px',
                                    pl: 3
                                }}>
                                    Coronel Ramón L. Falcón 4080
                                    <br />
                                    Ciudad Autónoma de Buenos Aires
                                    <br />
                                    C1407GSP
                                </Typography>
                            </Box>

                            {/* Botón para abrir en Google Maps */}
                            <Button
                                variant="outlined"
                                href="https://www.google.com/maps/place/Cnel.+Ram%C3%B3n+L.+Falc%C3%B3n+4080,+C1407GSP+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.6358552,-58.4839202,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcc99796be8e73:0x113f27c7674d1780!8m2!3d-34.6358552!4d-58.4839202!16s%2Fg%2F11b8v82s3s?entry=ttu"
                                target="_blank"
                                sx={{
                                    color: '#ffffff',
                                    fontSize: '14px',
                                    '&:hover': {
                                        borderColor: '#fff',
                                        color: '#fff',
                                        backgroundColor: '#b63e81'
                                    }
                                }}
                            >
                                {t('footer.openMaps') || 'Abrir en Google Maps'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </motion.div>
        </Box>
    );
};