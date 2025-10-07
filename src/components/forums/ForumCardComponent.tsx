import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Avatar,
    Box,
    Chip,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Email,
    WhatsApp,
    Groups
} from '@mui/icons-material';
import type { ForumCard } from '../../interfaces/forum';

interface ForumCardComponentProps {
    card: ForumCard;
}

export const ForumCardComponent: React.FC<ForumCardComponentProps> = ({ card }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleWhatsAppClick = () => {
        window.open(card.whatsappGroup, '_blank', 'noopener,noreferrer');
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDarkMode
                        ? '0 8px 25px rgba(0,0,0,0.5)'
                        : '0 8px 25px rgba(0,0,0,0.15)',
                },
                background: isDarkMode
                    ? 'linear-gradient(145deg, #1E1E1E 0%, #2D2D2D 100%)'
                    : 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
                border: isDarkMode
                    ? '1px solid #333'
                    : '1px solid #e0e0e0',
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={card.forumImage}
                alt={card.forumName}
                sx={{
                    objectFit: 'cover',
                    width: '100%',
                    borderTopLeftRadius: '4px', // Bordes redondeados solo arriba
                    borderTopRightRadius: '4px',
                    borderBottom: 'none' // Sin borde inferior
                }}
            />
            <CardContent sx={{
                flexGrow: 1,
                p: 3,
                pt: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        sx={{
                            bgcolor: card.avatarColor || theme.palette.primary.main,
                            width: 48,
                            height: 48,
                            mr: 2,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        {getInitials(card.name)}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                                mb: 0.5,
                                fontSize: '1.1rem'
                            }}
                        >
                            {card.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: '0.8rem'
                            }}
                        >
                            <Email sx={{ fontSize: 14 }} />
                            {card.email}
                        </Typography>
                    </Box>
                </Box>

                <Chip
                    icon={<Groups color="inherit" sx={{ color: 'white' }} />}
                    label={card.forumName}
                    size="small"
                    sx={{
                        mb: 2,
                        bgcolor: isDarkMode
                            ? theme.palette.primary.main
                            : theme.palette.primary.light,
                        color: 'white',
                        fontWeight: 600,
                        alignSelf: 'flex-start'
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.5,
                        mb: 2,
                        flexGrow: 1,
                        fontSize: '0.875rem'
                    }}
                >
                    {card.forumDescription}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'space-between',
                    mt: 'auto'
                }}>
                    <IconButton
                        onClick={handleWhatsAppClick}
                        size="small"
                        sx={{
                            flex: 1,
                            bgcolor: isDarkMode
                                ? 'rgba(37, 211, 102, 0.1)'
                                : 'rgba(37, 211, 102, 0.08)',
                            color: '#25D366',
                            borderRadius: 1,
                            py: 0.75,
                            '&:hover': {
                                bgcolor: isDarkMode
                                    ? 'rgba(37, 211, 102, 0.2)'
                                    : 'rgba(37, 211, 102, 0.15)',
                            }
                        }}
                    >
                        <WhatsApp fontSize="small" />
                        <Typography variant="button" sx={{ ml: 0.5, fontSize: '0.9rem' }}>
                            {isMobile ? '' : 'Unirse'}
                        </Typography>
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};