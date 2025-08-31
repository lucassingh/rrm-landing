import { useState, useEffect } from 'react';
import {
    Box,
    IconButton,
    useTheme,
    useMediaQuery,
    Tooltip
} from '@mui/material';
import {
    FaFacebookF,
    FaInstagram,
    FaTelegram,
    FaWhatsapp,
    FaYoutube
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const AsideSocialBarComponent = () => {
    const [isVisible, setIsVisible] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            const footerSection = document.getElementById('footer-section');
            if (!footerSection) return;

            const footerRect = footerSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Ocultar cuando el footer está visible en la pantalla
            if (footerRect.top < viewportHeight * 0.8) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // No mostrar en dispositivos móviles para no saturar la interfaz
    if (isMobile) {
        return null;
    }

    const socialLinks = [
        {
            icon: <FaFacebookF />,
            href: "https://www.facebook.com/RedMisionesMundialesArgentina/",
            label: t('asideSocial.face'),
            color: "#1877F2"
        },
        {
            icon: <FaInstagram />,
            href: "https://www.instagram.com/rmm_argentina/",
            label: t('asideSocial.insta'),
            color: "#E4405F"
        },
        {
            icon: <FaTelegram />,
            href: "https://t.me/RMM_Argentina",
            label: t('asideSocial.tele'),
            color: "#26A5E4"
        },
        {
            icon: <FaYoutube />,
            href: "https://www.youtube.com/@redmisionesmundialesargentina",
            label: t('asideSocial.you'),
            color: "#FF0000"
        },
        {
            icon: <FaWhatsapp />,
            href: "https://wa.me/5491132119184",
            label: t('asideSocial.whats'),
            color: "#25cc64"
        }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed',
                        right: '0px',
                        top: '27%',
                        transform: 'translateY(-50%)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '12px 6px',
                        backgroundColor: 'rgba(236, 223, 223, 0.9)',
                        backdropFilter: 'blur(4px)',
                        borderTopLeftRadius: '12px',
                        borderBottomLeftRadius: '12px',
                        boxShadow: '0px 7px 6px rgba(0, 0, 0, 0.4)',
                    }}
                >
                    {socialLinks.map((social, index) => (
                        <Tooltip
                            key={index}
                            title={social.label}
                            placement="left"
                            arrow
                        >
                            <IconButton
                                component="a"
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: theme.palette.secondary.main,
                                    margin: '8px 0',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        color: social.color,
                                        transform: 'scale(1.15)',
                                        backgroundColor: 'transparent'
                                    }
                                }}
                                aria-label={social.label}
                            >
                                {social.icon}
                            </IconButton>
                        </Tooltip>
                    ))}

                    {/* Línea decorativa vertical */}
                    <Box
                        sx={{
                            width: '2px',
                            height: '20px',
                            backgroundColor: theme.palette.secondary.main,
                            margin: '8px 0',
                            borderRadius: '1px'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};