import React from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    useTheme,
    alpha,
    Container,
    useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import mockup from '../../assets/programs/mockup.png';
import googlePlay from '../../assets/programs/Google_Play_Store_badge_IT.svg 1.png';

export const AUEArgentina: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleVisitWebsite = () => {
        window.open('https://alcanceunaetnia.org/', '_blank', 'noopener,noreferrer');
    };

    const handleDownloadCatalog = () => {
        window.open('https://es.etnopedia.org/wiki/index.php/Cat%C3%A1logos_de_Etnias_No_Alcanzadas_para_la_Iglesia_Iberoamericana', '_blank', 'noopener,noreferrer');
    };

    const handleDownloadApp = () => {
        window.open('https://play.google.com/store/apps/details?id=io.devdemy.etnias_pray', '_blank', 'noopener,noreferrer');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={6} alignItems="center">
                    {/* Columna de contenido - Siempre visible */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                variants={itemVariants}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                style={{ textAlign: 'left' }}
                            >
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 3,
                                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        color: 'transparent',
                                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                                        lineHeight: 1.1
                                    }}
                                >
                                    {t('programs.aueArgentina.title')}
                                </Typography>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                style={{ textAlign: 'left' }}
                            >
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 600,
                                        mb: 3,
                                        fontSize: { xs: '1.3rem', md: '1.5rem' }
                                    }}
                                >
                                    {t('programs.aueArgentina.subtitle')}
                                </Typography>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                style={{ textAlign: 'left' }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.8,
                                        mb: 5,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('programs.aueArgentina.description')}
                                </Typography>
                            </motion.div>

                            {/* Botones */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 2,
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: { xs: 'center', sm: 'flex-start' }
                                }}>
                                    {/* Botón Visitar Sitio */}
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleVisitWebsite}
                                        sx={{
                                            borderRadius: '30px',
                                            px: 4,
                                            py: 2,
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            minWidth: '200px',
                                            height: '56px',
                                            background: theme.palette.primary.main,
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                            '&:hover': {
                                                background: theme.palette.primary.dark,
                                                boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
                                                transform: 'translateY(-2px)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {t('programs.aueArgentina.buttons.visitWebsite')}
                                    </Button>

                                    {/* Botón Descargar Catálogo */}
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={handleDownloadCatalog}
                                        sx={{
                                            borderRadius: '30px',
                                            background: 'transparent',
                                            px: 4,
                                            py: 2,
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            minWidth: '200px',
                                            height: '56px',
                                            borderWidth: 2,
                                            borderColor: theme.palette.primary.main,
                                            color: theme.palette.primary.main,
                                            '&:hover': {
                                                borderWidth: 2,
                                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {t('programs.aueArgentina.buttons.downloadCatalog')}
                                    </Button>

                                    {/* Botón Google Play */}
                                    <Button
                                        component="button"
                                        onClick={handleDownloadApp}
                                        sx={{
                                            borderRadius: '30px',
                                            minWidth: '200px',
                                            height: '56px',
                                            backgroundColor: '#000',
                                            '&:hover': {
                                                backgroundColor: '#000',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <img
                                            src={googlePlay}
                                            alt="Google Play"
                                            style={{
                                                width: '85%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Button>
                                </Box>
                            </motion.div>
                        </motion.div>
                    </Grid>

                    {/* Columna de la imagen - Oculto en mobile */}
                    {!isMobile && (
                        <Grid size={{ xs: 12, md: 6 }} sx={{ paddingBottom: '30px' }}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minHeight: 500
                                    }}
                                >
                                    <img
                                        src={mockup}
                                        alt="AUE App Mockup"
                                        style={{
                                            width: '50%',
                                            height: 'auto',
                                            borderRadius: '40px',
                                        }}
                                    />
                                </Box>
                            </motion.div>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default AUEArgentina;