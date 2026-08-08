"use client";

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    useTheme,
    alpha
} from '@mui/material';
import {
    WhatsApp,
    Groups,
    Person
} from '@mui/icons-material';
import type { Forum } from '@/interfaces/forum';
import { useTranslation } from 'react-i18next';

interface ForumCardComponentProps {
    forum: Forum;
}

// Rotating brand-color accent, same approach as NewsCardComponent — the DB
// row has no color field (kept the admin form to just the 3 fields that
// matter), so the card color is derived deterministically from the id.
const ACCENT_COLORS = ['#39b54a', '#fcb040', '#7b5ba1', '#ff5733', '#bd634f', '#4972b2', '#49a6a6', '#1e6f2f', '#b63e81'];

export const ForumCardComponent: React.FC<ForumCardComponentProps> = ({ forum }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const { t } = useTranslation();

    const forumColor = ACCENT_COLORS[forum.id % ACCENT_COLORS.length];

    const handleWhatsAppClick = () => {
        window.open(forum.whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Card
            sx={{
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 28px ${alpha(forumColor, 0.3)}`,
                },
                background: isDarkMode
                    ? `linear-gradient(145deg, ${alpha(forumColor, 0.1)} 0%, #2D2D2D 100%)`
                    : `linear-gradient(145deg, ${alpha(forumColor, 0.05)} 0%, #FFFFFF 100%)`,
                border: `1px solid ${alpha(forumColor, 0.2)}`,
                borderRadius: 2,
                position: 'relative',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${forumColor}, ${alpha(forumColor, 0.7)})`,
                }
            }}
        >
            <CardContent sx={{
                flexGrow: 1,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                {/* ENCABEZADO - SOLO TÍTULO DEL FORO */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                            fontWeight: 'bold',
                            color: forumColor,
                            fontSize: '1.4rem',
                            mb: 1,
                            textShadow: `0 2px 4px ${alpha(forumColor, 0.2)}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <Groups sx={{ fontSize: '1.5rem' }} />
                        {forum.name}
                    </Typography>
                </Box>

                {/* COORDINADOR - ELEMENTO SECUNDARIO */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 'bold',
                            color: 'text.secondary',
                            mb: 1.5,
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                    >
                        <Person sx={{ fontSize: 16 }} />
                        {t("forums.coordinators")}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: alpha(forumColor, 0.05),
                            border: `1px solid ${alpha(forumColor, 0.1)}`,
                        }}
                    >
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                bgcolor: alpha(forumColor, 0.2),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1.5,
                                color: forumColor,
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                flexShrink: 0
                            }}
                        >
                            {getInitials(forum.coordinatorName)}
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 'medium',
                                color: 'text.primary',
                                fontSize: '0.9rem'
                            }}
                        >
                            {forum.coordinatorName}
                        </Typography>
                    </Box>
                </Box>

                {/* BOTÓN WHATSAPP */}
                <Box sx={{ mt: 'auto' }}>
                    <IconButton
                        onClick={handleWhatsAppClick}
                        size="small"
                        sx={{
                            width: '100%',
                            bgcolor: alpha('#25D366', 0.1),
                            color: '#25D366',
                            borderRadius: 2,
                            py: 1.5,
                            border: `1px solid ${alpha('#25D366', 0.2)}`,
                            '&:hover': {
                                bgcolor: alpha('#25D366', 0.2),
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <WhatsApp fontSize="small" />
                        <Typography
                            variant="button"
                            sx={{
                                ml: 1,
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {t("forums.joinGroup")}
                        </Typography>
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};
