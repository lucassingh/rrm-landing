import { useTranslation } from 'react-i18next';
import { Typography, Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import videoBg from '../assets/videos/video_bg.mp4';
import { FaChevronDown } from 'react-icons/fa';
import { HeaderComponent, HeroComponent, LayoutContentComponent, RevealFromLeft, RevealFromRight, VideoComponent } from '../components';
import { useEffect, useRef } from 'react';
import img1 from '../assets/whatdo/img_1.jpg'
import img2 from '../assets/whatdo/img_2.jpg'
import img3 from '../assets/whatdo/img_3.jpg'
import mision from '../assets/mvv/mision.jpg'
import vision from '../assets/mvv/vision.jpg'
import values from '../assets/mvv/values.jpg'
import { styled } from '@mui/system';
import QRSection from '../components/QRSection';

export const HomePage = () => {

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { t } = useTranslation('common');

    const videoRef = useRef<HTMLVideoElement>(null);

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

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            // Forzar muted en iOS
            video.muted = true;
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');

            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise
                    .catch((error) => {
                        console.log('Autoplay prevented:', error);
                    });
            }
        };

        handlePlay();
        const handleUserInteraction = () => {
            handlePlay();
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };
    }, []);

    const ImageBox = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        height: isMobile ? '250px' : '500px',
        '&::before': {
            content: '""',
            position: 'absolute',
            height: 'auto',
            border: '4px solid rgba(73, 114, 178, 0.3)',
            borderRadius: '16px',
            zIndex: 1,
            transform: 'rotate(-3deg)',
        },
        '& img': {
            maxWidth: '70%',
            height: 'auto',
            position: 'relative',
            zIndex: 2,
            borderRadius: '12px',
            transition: 'all 0.4s ease',
            border: '4px solid white',
            '&:hover': {
                transform: 'scale(1.02)',
            },
            [theme.breakpoints.down('md')]: {
                maxWidth: '100%',
            }
        }
    }));

    const ParallaxImage = ({ src, alt }: any) => {
        const ref = useRef(null);
        const { scrollYProgress } = useScroll({
            target: ref,
            offset: ["start end", "end start"]
        });

        const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
        const rotate = useTransform(scrollYProgress, [0, 1], ["-3deg", "3deg"]);
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

        return (
            <ImageBox ref={ref}>
                <motion.img
                    src={src}
                    alt={alt}
                    style={{
                        y,
                        rotate,
                        scale,
                        transition: "all 0.5s cubic-bezier(0.33, 1, 0.68, 1)"

                    }}
                    whileHover={{
                        scale: 1.05,
                        rotate: 0,
                        transition: { duration: 0.3 }
                    }}
                />
            </ImageBox>
        );
    };

    const GradientText = styled('span')(() => ({
        background: `linear-gradient(45deg, #4972b2, #b63e81)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        fontWeight: 'bold',
        display: 'inline-block',
        fontSize: 'clamp(3rem, 8vw, 5rem)',
        lineHeight: 1,
        '@media (max-width:600px)': {
            fontSize: 'clamp(2.7rem, 10vw, 6.5rem)',
        }
    }));

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
                    justifyContent: 'flex-start',
                    borderBottomLeftRadius: { xs: '20px', md: '40px' },
                    borderBottomRightRadius: { xs: '20px', md: '40px' },
                }}
            >
                <Box
                    component="video"
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
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
                                            xs: '1.8rem',
                                            sm: '2.8rem',
                                            md: '3.8rem',
                                            lg: '4.8rem'
                                        },
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                        lineHeight: 1.1,
                                        mb: 1,
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
                                            xs: '1.8rem',
                                            sm: '2.8rem',
                                            md: '3.8rem',
                                            lg: '4.8rem'
                                        },
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                        lineHeight: 1.1,
                                        mb: 2,
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
                        left: '46%',
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
                layoutType="full"
                backgroundColor='inherit'
                height={isMobile ? 'auto' : '100vh'}
                sectionPadding={{ xs: '80px 6%', md: '6% 0' }}
            >
                <HeroComponent />
            </LayoutContentComponent>

            <VideoComponent />

            <LayoutContentComponent
                id='section2'
                layoutType="split"
                backgroundColor='inherit'
                backgroundColors={{ left: 'inherit', right: '#5c8dd1' }}
                height={isMobile ? 'auto' : '100vh'}
                sectionPadding={{ xs: '80px 6%', md: '6% 0' }}
            >
                <RevealFromLeft>
                    <Box padding={{ xs: '16px 0', md: '22%' }}>
                        <Typography variant="h3" component="h3" gutterBottom>
                            <GradientText>{t('mision.title')}</GradientText>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mt: 1,
                                color: 'text.secondary',
                                lineHeight: 1.8
                            }}
                        >
                            {t('mision.description')}
                        </Typography>
                    </Box>
                </RevealFromLeft>
                <RevealFromRight>
                    <ParallaxImage src={mision} alt="mision image" />
                </RevealFromRight>
            </LayoutContentComponent>

            <LayoutContentComponent
                id='section3'
                layoutType="split"
                backgroundColor='inherit'
                backgroundColors={{ left: '#d14a9d', right: 'inherit' }}
                height={isMobile ? 'auto' : '100vh'}
                sectionPadding={{ xs: '80px 6%', md: '6% 0' }}
            >
                <RevealFromLeft>
                    <ParallaxImage src={vision} alt="vision image" />
                </RevealFromLeft>
                <RevealFromRight>
                    <Box padding={{ xs: '16px 0', md: '22%' }}>
                        <Typography variant="h3" component="h3" gutterBottom>
                            <GradientText>{t('vision.title')}</GradientText>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mt: 1,
                                color: 'text.secondary',
                                lineHeight: 1.8
                            }}
                        >
                            {t('vision.description')}
                        </Typography>
                    </Box>
                </RevealFromRight>
            </LayoutContentComponent>

            <LayoutContentComponent
                id='section4'
                layoutType="split"
                backgroundColor='inherit'
                backgroundColors={{ left: 'inherit', right: '#ffc870' }}
                height={isMobile ? 'auto' : '100vh'}
                sectionPadding={{ xs: '80px 6%', md: '6% 0' }}
            >
                <RevealFromLeft>
                    <Box padding={{ xs: '16px 0', md: '22%' }}>
                        <Typography variant="h3" component="h3" gutterBottom>
                            <GradientText>{t('values.title')}</GradientText>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mt: 1,
                                color: 'text.secondary',
                                lineHeight: 1.8
                            }}
                        >
                            {t('values.description')}
                        </Typography>
                    </Box>
                </RevealFromLeft>
                <RevealFromRight>
                    <ParallaxImage src={values} alt="values image" />
                </RevealFromRight>
            </LayoutContentComponent>

            <LayoutContentComponent
                layoutType="full"
                backgroundColor="inherit"
                height={'auto'}
            >
                <Box sx={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    width: '100%',
                    px: isMobile ? 2 : 0
                }}>
                    <HeaderComponent
                        title={t('whatdo.title')}
                        subtitle={t('whatdo.subtitle')}
                        align='center'
                        sx={{ marginBottom: 6 }}
                    />

                    <Box sx={{
                        width: '100%',
                        maxWidth: '1000px',
                        height: isMobile ? 'auto' : '1000px',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '20px',
                        mb: 6
                    }}>
                        <RevealFromLeft>
                            <Box sx={{
                                width: isMobile ? '100%' : '500px',
                                height: isMobile ? 'auto' : '1000px',
                                borderRadius: '15px',
                                p: isMobile ? 3 : 4,
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                bgcolor: 'background.paper',
                                minHeight: isMobile ? 'auto' : '1000px'
                            }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        mb: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    <Typography variant="h4" component="h3" sx={{
                                        color: 'extra1.main',
                                        mb: 3,
                                        fontWeight: 700,
                                        fontSize: isMobile ? '1.5rem' : '1.9rem'
                                    }}>
                                        {t('whatdo.cardTitle1')}
                                    </Typography>

                                    <Typography variant="body1" sx={{
                                        color: 'text.primary',
                                        mb: 3,
                                        fontSize: isMobile ? '1rem' : '1.1rem',
                                        lineHeight: 1.6
                                    }}>
                                        {t('whatdo.cardSubtitle1')}
                                    </Typography>

                                    <Typography variant="body1" sx={{
                                        color: 'text.primary',
                                        mb: 3,
                                        fontSize: isMobile ? '1rem' : '1.1rem',
                                        lineHeight: 1.6
                                    }}>
                                        {t('whatdo.textCard1')}
                                    </Typography>
                                </Box>
                                {
                                    !isMobile && <Box sx={{
                                        width: '100%',
                                        position: 'relative',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        mt: 'auto'
                                    }}>
                                        <img width='100%' height='auto' src={img1} alt="" />
                                    </Box>
                                }
                            </Box>
                        </RevealFromLeft>

                        {!isMobile ? (
                            <RevealFromRight>
                                <Box sx={{
                                    width: '500px',
                                    height: '1000px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px'
                                }}>
                                    <Box sx={{
                                        width: '500px',
                                        height: '500px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '20px'
                                    }}>
                                        <Box sx={{
                                            width: '100%',
                                            height: '500px',
                                            borderRadius: '15px',
                                            p: 4,
                                            position: 'relative',
                                            overflow: 'visible',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            bgcolor: 'background.paper'
                                        }}>
                                            <Box
                                                component="img"
                                                src={img2}
                                                sx={{
                                                    position: 'absolute',
                                                    top: -80,
                                                    right: -70,
                                                    width: '180px',
                                                    height: '260px',
                                                    borderRadius: '10px',
                                                    objectFit: 'cover',
                                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                                                }}
                                            />

                                            <Typography
                                                variant="h4"
                                                component="h3"
                                                sx={{
                                                    color: 'secondary.main',
                                                    mb: 2,
                                                    fontWeight: 700
                                                }}
                                            >
                                                {t('whatdo.cardTitle2')}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: 'text.primary',
                                                    fontSize: '1.1rem',
                                                    lineHeight: 1.6
                                                }}
                                            >
                                                {t('whatdo.cardSubtitle2')}
                                            </Typography>
                                            <Typography variant="body1" sx={{
                                                color: 'text.primary',
                                                mt: 2
                                            }}>
                                                {t('whatdo.textCard2')}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        width: '100%',
                                        height: '500px',
                                        borderRadius: '15px',
                                        p: 4,
                                        position: 'relative',
                                        overflow: 'visible',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        bgcolor: 'background.paper'
                                    }}>
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 30,
                                            right: -60,
                                            width: '300px',
                                            height: '200px',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                            border: '2px solid',
                                            borderColor: 'background.paper',
                                            zIndex: 2
                                        }}>
                                            <Box
                                                component="img"
                                                src={img3}
                                                alt="Certificaciones"
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center'
                                                }}
                                            />
                                        </Box>

                                        <Typography variant="h4" component="h3" sx={{
                                            color: 'tertiary.main',
                                            mb: 2,
                                            fontWeight: 700,
                                            mt: 16
                                        }}>
                                            {t('whatdo.cardTitle3')}
                                        </Typography>
                                        <Typography variant="body1" sx={{
                                            color: 'text.primary',
                                            mt: 2
                                        }}>
                                            {t('whatdo.cardSubtitle3')}
                                        </Typography>
                                    </Box>
                                </Box>
                            </RevealFromRight>
                        ) : (
                            <>
                                <RevealFromRight>
                                    <Box sx={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '15px',
                                        p: 3,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 3,
                                        bgcolor: 'background.paper'
                                    }}>
                                        <Typography
                                            variant="h4"
                                            component="h3"
                                            sx={{
                                                color: 'secondary.main',
                                                mb: 2,
                                                fontWeight: 700,
                                                fontSize: '1.5rem'
                                            }}
                                        >
                                            {t('whatdo.cardTitle2')}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'text.primary',
                                                fontSize: '1rem',
                                                lineHeight: 1.6,
                                                mb: 2
                                            }}
                                        >
                                            {t('whatdo.cardSubtitle2')}
                                        </Typography>
                                        <Typography variant="body1" sx={{
                                            color: 'text.primary',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.5
                                        }}>
                                            {t('whatdo.textCard2')}
                                        </Typography>
                                    </Box>
                                </RevealFromRight>

                                <RevealFromRight>
                                    <Box sx={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '15px',
                                        p: 3,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        bgcolor: 'background.paper'
                                    }}>
                                        <Typography variant="h4" component="h3" sx={{
                                            color: 'tertiary.main',
                                            mb: 2,
                                            fontWeight: 700,
                                            fontSize: '1.5rem'
                                        }}>
                                            {t('whatdo.cardTitle3')}
                                        </Typography>
                                        <Typography variant="body1" sx={{
                                            color: 'text.primary',
                                            fontSize: '1rem',
                                            lineHeight: 1.6,
                                            mb: 2
                                        }}>
                                            {t('whatdo.cardSubtitle3')}
                                        </Typography>
                                        <Typography variant="body1" sx={{
                                            color: 'text.primary',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.5
                                        }}>
                                            {t('whatdo.textCard3')}
                                        </Typography>
                                    </Box>
                                </RevealFromRight>
                            </>
                        )}
                    </Box>
                </Box>
            </LayoutContentComponent>

            <QRSection />
        </>
    );
};