import { Card, CardContent, Typography, Box, Avatar, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { News } from '../../interfaces/news';
import { motion, type Variants } from "framer-motion";
import { darkPalette, lightPalette } from '../../theme/palettes';

interface NewsCardProps {
    news: News;
    index: number
}

// Colores aleatorios para los círculos
const randomColors = [
    lightPalette.primary.main,
    lightPalette.secondary.main,
    lightPalette.tertiary.main,
    lightPalette.extra1.main,
    lightPalette.extra2.main
];

export const NewsCard = ({ news, index = 0 }: NewsCardProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Seleccionar color aleatorio para el círculo y avatar
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const handleClick = () => {
        navigate(`/news/${news.id}`, {
            state: {
                news,
                randomColor
            }
        });
    };

    // Variantes de animación para reveal
    const revealVariants: Variants = {
        offscreen: {
            y: 30,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealVariants}
            transition={{ delay: index * 0.1 }} // Retardo escalonado
            style={{ width: '100%' }}
        >
            <Card
                sx={{
                    borderRadius: 2,
                    border: 'none',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'translateY(-2px)'
                    },
                    p: 2
                }}
                onClick={handleClick}
            >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    {/* Header con círculo de color y subtítulo */}
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Box
                            sx={{
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                backgroundColor: randomColor,
                                flexShrink: 0
                            }}
                        />
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                lineHeight: 1
                            }}
                        >
                            {news.subtitle}
                        </Typography>
                    </Box>

                    {/* Contenido principal - Título e Imagen */}
                    <Box display="flex" gap={2} mb={2}>
                        {/* Título - 10 cols */}
                        <Box flex={8}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    mb: 1,
                                    color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.8rem' }
                                }}
                            >
                                {news.title}
                            </Typography>
                        </Box>

                        {/* Imagen - 2 cols */}
                        {news.image_url && (
                            <Box flex={4}>
                                <Box
                                    component="img"
                                    src={news.image_url}
                                    alt={news.image_description}
                                    sx={{
                                        width: '100%',
                                        height: 80,
                                        objectFit: 'cover',
                                        borderRadius: 1
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    {/* Extracto del cuerpo */}
                    <Box mb={2}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                lineHeight: 1.5
                            }}
                        >
                            {/* Extraer texto plano del HTML */}
                            {news.body.replace(/<[^>]*>/g, '').slice(0, 150)}...
                        </Typography>
                    </Box>

                    {/* Footer con fecha y autor */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        {/* Fecha */}
                        <Typography
                            variant="caption"
                            sx={{
                                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                fontSize: '0.75rem'
                            }}
                        >
                            Fecha de Creación: {formatDate(news.date)}
                        </Typography>

                        {/* Información del autor */}
                        <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.75rem',
                                    backgroundColor: randomColor,
                                    color: '#FFFFFF'
                                }}
                            >
                                {getInitials(news.author.first_name, news.author.last_name)}
                            </Avatar>
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: 'block',
                                        fontWeight: 500,
                                        color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary
                                    }}
                                >
                                    Escrito por:
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: 'block',
                                        fontWeight: 500,
                                        color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary
                                    }}
                                >
                                    {news.author.first_name} {news.author.last_name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                        fontSize: '0.7rem'
                                    }}
                                >
                                    {news.author.email}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};