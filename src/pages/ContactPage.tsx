import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Container,
    Card,
    Grid,
    TextField,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    IconButton,
    Paper,
    alpha,
    Link,
    Zoom,
    Collapse
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import emailjs from '@emailjs/browser';
import { HeaderComponent } from '../components';
import { useTranslation } from 'react-i18next';
import { motion, type Variants } from 'framer-motion';

const contactImage = 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

interface Bubble {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    color: string;
    alpha: number;
}

export const ContactPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const form = useRef<HTMLFormElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | undefined>(undefined);
    const interactiveRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const bubbles: Bubble[] = [];
        const colors = [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.tertiary?.main || '#ff5733'
        ];

        const createBubbles = () => {
            for (let i = 0; i < 15; i++) {
                addBubble();
            }
        };

        const addBubble = () => {
            const radius = Math.random() * 80 + 20;
            bubbles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + radius,
                radius: radius,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * -2 - 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.5 + 0.3
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (Math.random() < 0.03) {
                addBubble();
            }

            for (let i = 0; i < bubbles.length; i++) {
                const bubble = bubbles[i];
                bubble.x += bubble.vx;
                bubble.y += bubble.vy;

                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                ctx.fillStyle = alpha(bubble.color, bubble.alpha);
                ctx.fill();

                if (bubble.y + bubble.radius < 0) {
                    bubbles.splice(i, 1);
                    i--;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        createBubbles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.tertiary?.main]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El formato del email no es válido';
            valid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es requerido';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        const serviceID = import.meta.env.VITE_PUBLIC_SERVICE;
        const templateID = import.meta.env.VITE_PUBLIC_TEMPLATE;
        const publicKey = import.meta.env.VITE_PUBLIC_KEY;

        emailjs.sendForm(serviceID, templateID, form.current!, publicKey)
            .then(() => {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                setSubmitStatus('error');
            })
            .finally(() => {
                setIsSubmitting(false);
                setTimeout(() => setSubmitStatus('idle'), 5000);
            });
    };

    useEffect(() => {
        const interBubble = interactiveRef.current;
        if (!interBubble) return;

        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            if (interBubble) {
                interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            animationRef.current = requestAnimationFrame(move);
        }

        const handleMouseMove = (event: MouseEvent) => {
            tgX = event.clientX;
            tgY = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        move();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const color1 = theme.palette.primary.main;
    const color2 = theme.palette.secondary.main;
    const color3 = theme.palette.tertiary?.main || '#ff5733';
    const color4 = theme.palette.primary.main;
    const color5 = theme.palette.secondary.main;
    const colorInteractive = theme.palette.primary.main;

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                py: 8,
                background: theme.palette.background.default
            }}
        >
            <Box
                className="gradient-bg"
                sx={{
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    overflow: 'hidden',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    '& svg': {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                }}
            >
                <Box
                    className="gradients-container"
                    sx={{
                        filter: 'blur(40px)',
                        width: '100%',
                        height: '100%',
                        '& > div': {
                            mixBlendMode: 'color-burn',
                            opacity: 0.8,
                            position: 'absolute',
                        },
                        '& .g1': {
                            width: '120%',
                            height: '120%',
                            top: 'calc(50% - 120% / 2)',
                            left: 'calc(50% - 120% / 2)',
                            animation: 'moveVertical 30s ease infinite',
                            background: `radial-gradient(circle at center, ${alpha(color1, 0.8)} 0, ${alpha(color1, 0)} 50%) no-repeat`
                        },
                        '& .g2': {
                            width: '120%',
                            height: '120%',
                            top: 'calc(50% - 120% / 2)',
                            left: 'calc(50% - 120% / 2)',
                            transformOrigin: 'calc(50% - 400px)',
                            animation: 'moveInCircle 20s reverse infinite',
                            background: `radial-gradient(circle at center, ${alpha(color2, 0.8)} 0, ${alpha(color2, 0)} 50%) no-repeat`
                        },
                        '& .g3': {
                            width: '120%',
                            height: '120%',
                            top: 'calc(50% - 120% / 2 + 200px)',
                            left: 'calc(50% - 120% / 2 - 500px)',
                            transformOrigin: 'calc(50% + 400px)',
                            animation: 'moveInCircle 40s linear infinite',
                            background: `radial-gradient(circle at center, ${alpha(color3, 0.8)} 0, ${alpha(color3, 0)} 50%) no-repeat`
                        },
                        '& .g4': {
                            width: '120%',
                            height: '120%',
                            top: 'calc(50% - 120% / 2)',
                            left: 'calc(50% - 120% / 2)',
                            transformOrigin: 'calc(50% - 200px)',
                            animation: 'moveHorizontal 40s ease infinite',
                            opacity: 0.7,
                            background: `radial-gradient(circle at center, ${alpha(color4, 0.8)} 0, ${alpha(color4, 0)} 50%) no-repeat`
                        },
                        '& .g5': {
                            width: '240%',
                            height: '240%',
                            top: 'calc(50% - 120%)',
                            left: 'calc(50% - 120%)',
                            transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
                            animation: 'moveInCircle 20s ease infinite',
                            background: `radial-gradient(circle at center, ${alpha(color5, 0.8)} 0, ${alpha(color5, 0)} 50%) no-repeat`
                        },
                        '& .interactive': {
                            width: '100%',
                            height: '100%',
                            top: '-50%',
                            left: '-50%',
                            opacity: 0.7,
                            background: `radial-gradient(circle at center, ${alpha(colorInteractive, 0.8)} 0, ${alpha(colorInteractive, 0)} 50%) no-repeat`
                        }
                    }}
                >
                    <Box className="g1" />
                    <Box className="g2" />
                    <Box className="g3" />
                    <Box className="g4" />
                    <Box className="g5" />
                    <Box ref={interactiveRef} className="interactive" />
                </Box>
            </Box>

            <style>
                {`
                @keyframes moveInCircle {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(180deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes moveVertical {
                    0% { transform: translateY(-50%); }
                    50% { transform: translateY(50%); }
                    100% { transform: translateY(-50%); }
                }
                @keyframes moveHorizontal {
                    0% { transform: translateX(-50%) translateY(-10%); }
                    50% { transform: translateX(50%) translateY(10%); }
                    100% { transform: translateX(-50%) translateY(-10%); }
                }
                `}
            </style>

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, marginTop: { sx: '40px', sm: '80px' } }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <Grid container justifyContent="center" sx={{ p: '0px !important', position: 'relative' }}>
                        <Grid size={{ xs: 12, md: 10, lg: 8 }} sx={{ p: '0px !important', position: 'relative' }}>

                            {!isMobile && (
                                <Paper
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: 0,
                                        transform: 'translate(-40%, -50%)',
                                        borderRadius: 3,
                                        p: 2,
                                        background: theme.palette.mode === 'light'
                                            ? 'rgba(255, 255, 255, 0.95)'
                                            : 'rgba(30, 30, 30, 0.95)',
                                        backdropFilter: 'blur(8px)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                        width: { xs: '70%', sm: '50%' },
                                        zIndex: 2,
                                        border: '1px solid',
                                        borderColor: theme.palette.mode === 'light'
                                            ? 'rgba(255, 255, 255, 0.3)'
                                            : 'rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <IconButton sx={{ color: 'primary.main', mr: 1 }}>
                                            <PhoneIcon />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            +54 9 351 303-3051
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <IconButton
                                            sx={{ color: 'primary.main', mr: 1 }}
                                            component={Link}
                                            href="mailto:redmisionesmundiales@gmail.com"
                                            target="_blank"
                                        >
                                            <EmailIcon />
                                        </IconButton>
                                        <Link
                                            href="mailto:redmisionesmundiales@gmail.com"
                                            target="_blank"
                                            sx={{
                                                fontWeight: 500,
                                                color: 'text.primary',
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' }
                                            }}
                                        >
                                            redmisionesmundiales@gmail.com
                                        </Link>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton
                                            sx={{ color: 'primary.main', mr: 1 }}
                                            component={Link}
                                            href="https://www.google.com/maps/search/?api=1&query=Cnel.+Ramón+L.+Falcón+4080+CABA"
                                            target="_blank"
                                        >
                                            <LocationOnIcon />
                                        </IconButton>
                                        <Link
                                            href="https://www.google.com/maps/search/?api=1&query=Cnel.+Ramón+L.+Falcón+4080+CABA"
                                            target="_blank"
                                            sx={{
                                                fontWeight: 500,
                                                color: 'text.primary',
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' }
                                            }}
                                        >
                                            Cnel. Ramón L. Falcón 4080 - CABA
                                        </Link>
                                    </Box>
                                </Paper>
                            )}

                            <Card
                                sx={{
                                    borderRadius: 4,
                                    background: theme.palette.mode === 'light'
                                        ? 'rgba(255, 255, 255, 0.75)'
                                        : 'rgba(30, 30, 30, 0.75)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    overflow: 'hidden',
                                    '&.MuiPaper-root': { padding: 0 },
                                    '&.MuiCard-root': { padding: 0 }
                                }}
                            >
                                <Grid container sx={{ '&.MuiGrid-container': { margin: 0, width: '100%', p: '0px !important' } }}>
                                    {!isMobile && (
                                        <Grid
                                            size={{ xs: 12, md: 4 }}
                                            sx={{
                                                position: 'relative',
                                                backgroundImage: `url(${contactImage})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                borderTopLeftRadius: 16,
                                                borderBottomLeftRadius: 16,
                                                minHeight: 500,
                                                p: '0px !important',
                                                m: 0,
                                                '&.MuiGrid-item': { padding: 0, margin: 0 }
                                            }}
                                        />
                                    )}

                                    <Grid size={{ xs: 12, md: isMobile ? 12 : 8 }}>
                                        <Box sx={{ p: 4 }}>
                                            <HeaderComponent
                                                title={t('contact.title')}
                                                subtitle={t('contact.subtitle')}
                                                titleVariant='h2'
                                                align='left'
                                                spacing={4}
                                            />

                                            {/* Mensajes de éxito/error mejorados */}
                                            <Collapse in={submitStatus !== 'idle'}>
                                                <Box sx={{ mb: 2 }}>
                                                    {submitStatus === 'success' && (
                                                        <Zoom in={true}>
                                                            <Paper
                                                                elevation={3}
                                                                sx={{
                                                                    p: 2,
                                                                    background: theme.palette.mode === 'light'
                                                                        ? 'rgba(76, 175, 80, 0.1)'
                                                                        : 'rgba(76, 175, 80, 0.2)',
                                                                    border: '1px solid',
                                                                    borderColor: 'success.main',
                                                                    borderRadius: 2
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                                                                    <Typography color="success.main" fontWeight="500">
                                                                        {t('contact.success')}
                                                                    </Typography>
                                                                </Box>
                                                            </Paper>
                                                        </Zoom>
                                                    )}

                                                    {submitStatus === 'error' && (
                                                        <Zoom in={true}>
                                                            <Paper
                                                                elevation={3}
                                                                sx={{
                                                                    p: 2,
                                                                    background: theme.palette.mode === 'light'
                                                                        ? 'rgba(244, 67, 54, 0.1)'
                                                                        : 'rgba(244, 67, 54, 0.2)',
                                                                    border: '1px solid',
                                                                    borderColor: 'error.main',
                                                                    borderRadius: 2
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <ErrorIcon color="error" sx={{ mr: 1 }} />
                                                                    <Typography color="error.main" fontWeight="500">
                                                                        {t('contact.error')}
                                                                    </Typography>
                                                                </Box>
                                                            </Paper>
                                                        </Zoom>
                                                    )}
                                                </Box>
                                            </Collapse>

                                            <form ref={form} onSubmit={handleSubmit}>
                                                <TextField
                                                    fullWidth
                                                    label="Nombre"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    error={!!errors.name}
                                                    helperText={errors.name}
                                                    sx={{
                                                        mb: 3,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 8,
                                                            '& fieldset': { borderColor: 'grey.400' }
                                                        }
                                                    }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    error={!!errors.email}
                                                    helperText={errors.email}
                                                    sx={{
                                                        mb: 3,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 8,
                                                            '& fieldset': { borderColor: 'grey.400' }
                                                        }
                                                    }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Mensaje"
                                                    name="message"
                                                    multiline
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    error={!!errors.message}
                                                    helperText={errors.message}
                                                    sx={{
                                                        mb: 3,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            '& fieldset': { borderColor: 'grey.400' }
                                                        }
                                                    }}
                                                />

                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={isSubmitting}
                                                    sx={{
                                                        borderRadius: 8,
                                                        py: 1.5,
                                                        px: 4,
                                                        fontSize: '1rem',
                                                        fontWeight: 600,
                                                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                                                        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .2)'
                                                    }}
                                                >
                                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                                                </Button>
                                            </form>

                                            {isMobile && (
                                                <Paper
                                                    sx={{
                                                        borderRadius: 3,
                                                        p: 2,
                                                        mt: 4,
                                                        background: theme.palette.mode === 'light'
                                                            ? 'rgba(255, 255, 255, 0.85)'
                                                            : 'rgba(30, 30, 30, 0.85)',
                                                        backdropFilter: 'blur(8px)'
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <IconButton sx={{ color: 'primary.main', mr: 1 }}>
                                                            <PhoneIcon />
                                                        </IconButton>
                                                        <Typography variant="body2">+54 9 351 303-3051</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <IconButton sx={{ color: 'primary.main', mr: 1 }}>
                                                            <LocationOnIcon />
                                                        </IconButton>
                                                        <Typography variant="body2">Cnel. Ramón L. Falcón 4080 - CABA</Typography>
                                                    </Box>
                                                </Paper>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};