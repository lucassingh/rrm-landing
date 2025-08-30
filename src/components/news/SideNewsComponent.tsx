// components/SideNews.tsx
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Card,
    CardContent,
    useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { News } from '../../interfaces/news';
import { darkPalette, lightPalette } from '../../theme/palettes';
import { motion, type Variants } from "framer-motion";

interface SideNewsProps {
    news: News[];
}

export const SideNewsComponent = ({ news }: SideNewsProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const handleNewsClick = (newsItem: News) => {
        navigate(`/news/${newsItem.id}`, { state: { news: newsItem } });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const slideInRightVariants: Variants = {
        offscreen: {
            x: 100,
            opacity: 0
        },
        onscreen: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideInRightVariants}
            transition={{ delay: 0.3 }}
        >
            <Card
                sx={{
                    borderRadius: 2,
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: isDarkMode ? darkPalette.background.paper : lightPalette.background.paper,
                    p: 2
                }}
            >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                            mb: 2
                        }}
                    >
                        Últimas noticias
                    </Typography>

                    <List sx={{ width: '100%' }}>
                        {news.map((newsItem, index) => (
                            <Box key={newsItem.id}>
                                <ListItem
                                    disablePadding
                                    sx={{
                                        mb: 1,
                                        borderRadius: 1,
                                        transition: 'background-color 0.2s',
                                        '&:hover': {
                                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                                        }
                                    }}
                                >
                                    <ListItemButton
                                        onClick={() => handleNewsClick(newsItem)}
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                                                        lineHeight: 1.4,
                                                        mb: 0.5
                                                    }}
                                                >
                                                    {newsItem.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box
                                                        sx={{
                                                            width: 12,
                                                            height: 12,
                                                            borderRadius: '50%',
                                                            backgroundColor: lightPalette.primary.main,
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                                                            fontSize: '0.7rem'
                                                        }}
                                                    >
                                                        {formatDate(newsItem.date)}
                                                    </Typography>
                                                </Box>
                                            }
                                            sx={{ m: 0 }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {index < news.length - 1 && (
                                    <Divider
                                        sx={{
                                            my: 1,
                                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </motion.div>
    );
};