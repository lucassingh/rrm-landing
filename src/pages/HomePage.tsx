import { useTranslation } from 'react-i18next';
import { Typography, Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { motion, type Variants } from 'framer-motion';
import videoBg from '../assets/videos/video_bg.mp4';
import { FaChevronDown } from 'react-icons/fa';
import { LayoutContentComponent } from '../components';

export const HomePage = () => {

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { t } = useTranslation('common');

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: "easeOut",
                staggerChildren: 0.3
            }
        }
    };

    const lineVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const descriptionVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.8
            }
        }
    };

    const scrollIndicatorVariants: Variants = {
        animate: {
            y: [0, 10, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                <Box
                    component="video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={videoBg}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        zIndex: 0,
                        objectFit: 'cover'
                    }}
                />

                {/* Overlay con gradient que se intensifica hacia abajo */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        background: `linear-gradient(
                        to bottom,
                        rgba(73, 114, 178, 0.2) 0%,
                        rgba(73, 114, 178, 0.4) 40%,
                        rgba(73, 114, 178, 0.7) 70%,
                        rgba(73, 114, 178, 0.9) 100%
                    )`
                    }}
                />

                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    <Box
                        sx={{
                            color: 'white',
                            textAlign: 'left',
                            padding: { xs: '0 20px', md: '0 40px', lg: '0 60px' },
                            maxWidth: { xs: '100%', md: '85%', lg: '80%' }
                        }}
                    >
                        {/* Título animado */}
                        <motion.div
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={lineVariants}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: {
                                            xs: '2.8rem',
                                            sm: '3.8rem',
                                            md: '4.8rem',
                                            lg: '5.8rem'
                                        },
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                        lineHeight: 1.1,
                                        mb: 1,
                                        textTransform: 'uppercase',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {t('home.titleLine1')}
                                </Typography>
                            </motion.div>

                            <motion.div variants={lineVariants}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: {
                                            xs: '2.8rem',
                                            sm: '3.8rem',
                                            md: '4.8rem',
                                            lg: '5.8rem'
                                        },
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                        lineHeight: 1.1,
                                        mb: 2,
                                        textTransform: 'uppercase',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {t('home.titleLine2')}
                                </Typography>
                            </motion.div>
                        </motion.div>

                        {/* Descripción animada */}
                        <motion.div
                            variants={descriptionVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Typography
                                component="div"
                                variant="body1"
                                sx={{
                                    fontSize: {
                                        xs: '1rem',
                                        sm: '1.1rem',
                                        md: '1.3rem'
                                    },
                                    fontWeight: 'normal',
                                    lineHeight: 1.5,
                                    maxWidth: { xs: '100%', md: '80%', lg: '65%' },
                                    mt: 3
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'rgba(73, 114, 178, 0.8)',
                                        padding: '15px 20px',
                                        borderRadius: '8px',
                                        backdropFilter: 'blur(5px)'
                                    }}
                                >
                                    {t('home.description')}
                                </Box>
                            </Typography>
                        </motion.div>
                    </Box>
                </Container>

                {/* Scroll Indicator con mejor contraste */}
                <motion.div
                    variants={scrollIndicatorVariants}
                    animate="animate"
                    onClick={handleScrollDown}
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'white'
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                            fontWeight: 'regular',
                            fontSize: '1rem',
                        }}
                    >
                        {t('home.scroll')}
                    </Typography>
                    <Box
                        sx={{
                            borderRadius: '50px',
                        }}
                    >
                        <FaChevronDown size={28} />
                    </Box>
                </motion.div>
            </Box>
            <LayoutContentComponent
                id='section2'
                layoutType="split"
                backgroundColors={isMobile ? undefined : { left: '#0a0a0c', right: '#dadada' }}
                backgroundColor={isMobile ? '#0a0a0c' : undefined}
                height={isMobile ? 'auto' : '100vh'}
                sectionPadding={{ xs: '80px 6%', md: '6% 0' }}
            >
                <h2>asdasd</h2>
            </LayoutContentComponent>
        </>
    );
};