// pages/NewsDetailPage.tsx
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    Avatar,
    Chip,
    Divider,
    useTheme
} from '@mui/material';
import {
    ArrowBack,
    CalendarToday,
    AccessTime
} from '@mui/icons-material';
import { JumbotronComponent } from '../components';
import type { News } from '../interfaces/news';
import { darkPalette, lightPalette } from '../theme/palettes';
import newsBG from '../assets/bgs/news-bg.jpg';

export const NewsByIDPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Obtener la noticia del estado de navegación
    const { news, randomColor } = (location.state as { news: News; randomColor: string }) || {};

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min de lectura`;
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    if (!news) {
        return (
            <>
                <JumbotronComponent
                    background={newsBG}
                    overlay={true}
                    titleColor="#ffffff"
                    subtitleColor="#f0f0f0"
                />
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box textAlign="center" py={4}>
                        <Typography variant="h6" color="textSecondary">
                            La noticia no está disponible
                        </Typography>
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => navigate('/news')}
                            sx={{ mt: 2 }}
                        >
                            Volver a noticias
                        </Button>
                    </Box>
                </Container>
            </>
        );
    }

    return (
        <>
            <JumbotronComponent
                background={news.image_url}
                overlay={true}
            />

            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Botón de volver */}
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/news')}
                    sx={{ mb: 4 }}
                    color="inherit"
                >
                    Volver a noticias
                </Button>

                {/* Header de la noticia */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            lineHeight: 1.2,
                            mb: 2,
                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                            fontSize: { xs: '2rem', md: '3.8rem' }
                        }}
                    >
                        {news.title}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                            mb: 3,
                            lineHeight: 1.4
                        }}
                    >
                        {news.subtitle}
                    </Typography>

                    {/* Información del autor y fecha */}
                    <Box display="flex" alignItems="left" sx={{ flexDirection: 'column' }} gap={2} flexWrap="wrap" mb={3}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: randomColor,
                                    color: '#FFFFFF'
                                }}
                            >
                                {getInitials(news.author.first_name, news.author.last_name)}
                            </Avatar>
                            <Box>
                                <Typography variant="body1" fontWeight={500}>
                                    {news.author.first_name} {news.author.last_name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {news.author.email}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap={2}>
                            <Chip
                                icon={<CalendarToday />}
                                label={formatDate(news.date)}
                                size="small"
                                variant="outlined"
                            />
                            <Chip
                                icon={<AccessTime />}
                                label={formatReadingTime(news.body)}
                                size="small"
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    <Divider />
                </Box>

                {/* Imagen principal */}
                {news.image_url && (
                    <Box sx={{ mb: 4 }}>
                        <img
                            src={news.image_url}
                            alt={news.image_description}
                            style={{
                                width: '100%',
                                maxHeight: '400px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                        {news.image_description && (
                            <Typography
                                variant="caption"
                                color="textSecondary"
                                sx={{ display: 'block', mt: 1, textAlign: 'center' }}
                            >
                                {news.image_description}
                            </Typography>
                        )}
                    </Box>
                )}

                {/* Contenido de la noticia */}
                <Box
                    sx={{
                        '& h1': {
                            mt: 4,
                            mb: 2,
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary
                        },
                        '& h2': {
                            mt: 3,
                            mb: 2,
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary
                        },
                        '& h3': {
                            mt: 2,
                            mb: 1,
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary
                        },
                        '& p': {
                            mb: 2,
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary
                        },
                        '& ul, & ol': {
                            pl: 3,
                            mb: 2,
                            '& li': {
                                mb: 1,
                                lineHeight: 1.6,
                                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary
                            }
                        },
                        '& blockquote': {
                            borderLeft: `4px solid ${lightPalette.primary.main}`,
                            pl: 2,
                            ml: 0,
                            fontStyle: 'italic',
                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary
                        },
                        '& img': {
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            my: 2
                        },
                        '& strong': {
                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                            fontWeight: 600
                        },
                        '& em': {
                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                            fontStyle: 'italic'
                        }
                    }}
                    dangerouslySetInnerHTML={{ __html: news.body }}
                />

                {/* Footer de la noticia */}
                <Divider sx={{ my: 4 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/news')}
                        color="inherit"
                    >
                        Volver a noticias
                    </Button>

                    <Typography variant="caption" color="textSecondary">
                        Publicado el {formatDate(news.date)} por:
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: randomColor,
                                color: '#FFFFFF'
                            }}
                        >
                            {getInitials(news.author.first_name, news.author.last_name)}
                        </Avatar>
                        <Box>
                            <Typography variant="body1" fontWeight={500}>
                                {news.author.first_name} {news.author.last_name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {news.author.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};