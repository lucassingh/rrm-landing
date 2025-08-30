import { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { JumbotronComponent, NewsCard, NewsPagination, SideNewsComponent } from '../components';
import { LoadingComponent, ErrorComponent } from '../components';
import newsBG from '../assets/bgs/news-bg.jpg';
import { fetchNews } from '../services/news.service';
import type { News } from '../interfaces/news';

const ITEMS_PER_PAGE = 7;

export const NewsPage = () => {
    const { t } = useTranslation();
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            setLoading(true);
            setError(null);
            const newsData = await fetchNews();
            setNews(newsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar las noticias');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getLatestNews = () => {
        return news
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
    };

    const getPaginatedNews = () => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        return news.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    };

    const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

    if (loading) {
        return (
            <>
                <JumbotronComponent
                    title={t("news.title")}
                    subtitle={t("news.subtitle")}
                    background={newsBG}
                    overlay={true}
                    titleColor="#ffffff"
                    subtitleColor="#f0f0f0"
                />
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <LoadingComponent />
                </Container>
            </>
        );
    }

    if (error) {
        return (
            <>
                <JumbotronComponent
                    title={t("news.title")}
                    subtitle={t("news.subtitle")}
                    background={newsBG}
                    overlay={true}
                    titleColor="#ffffff"
                    subtitleColor="#f0f0f0"
                />
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <ErrorComponent message={error} onRetry={loadNews} />
                </Container>
            </>
        );
    }

    if (news.length === 0) {
        return (
            <>
                <JumbotronComponent
                    title={t("news.title")}
                    subtitle={t("news.subtitle")}
                    background={newsBG}
                    overlay={true}
                    titleColor="#ffffff"
                    subtitleColor="#f0f0f0"
                />
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box textAlign="center" py={4}>
                        <Typography variant="h6" color="textSecondary">
                            No hay noticias para mostrar
                        </Typography>
                    </Box>
                </Container>
            </>
        );
    }

    return (
        <>
            <JumbotronComponent
                title={t("news.title")}
                subtitle={t("news.subtitle")}
                background={newsBG}
                overlay={true}
                titleColor="#ffffff"
                subtitleColor="#f0f0f0"
            />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {getPaginatedNews().map((newsItem) => (
                                <NewsCard key={newsItem.id} news={newsItem} index={0} />
                            ))}
                        </Box>
                        <NewsPagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
                        <SideNewsComponent news={getLatestNews()} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};