import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, useTheme, alpha } from "@mui/material"
import { Launch as LaunchIcon } from "@mui/icons-material"
import { ContainerEntitiesComponent, JumbotronComponent } from "../components"
import { LoadingComponent, ErrorComponent } from "../components"
import { useTranslation } from "react-i18next";
import entitiesBG from '../assets/bgs/entities-bg.jpg'
import { fetchEntities } from '../services/entities.service';
import type { EntityCategory } from '../interfaces/entity';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdNUhyDMDgwbNoCBvc76cA2MXxUHdm98bo_SqRd4Lgf-U0w5A/viewform';

export const EntitiesPage = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [categories, setCategories] = useState<EntityCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEntities = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchEntities();
                setCategories(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar las entidades');
            } finally {
                setLoading(false);
            }
        };
        loadEntities();
    }, []);

    return (
        <>
            <JumbotronComponent
                title={t("entities.title")}
                subtitle={t("entities.subtitle")}
                background={entitiesBG}
                overlay={true}
                titleColor="#ffffff"
                subtitleColor="#f0f0f0"
            />
            <Container maxWidth="lg" sx={{ py: 4 }}>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'stretch', sm: 'center' },
                        justifyContent: 'space-between',
                        gap: 2,
                        p: { xs: 2.5, sm: 3 },
                        mb: 4,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${theme.palette.background.paper} 50%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                        boxShadow: theme.shadows[2],
                    }}
                >
                    <Typography
                        sx={{
                            flex: 1,
                            color: theme.palette.text.primary,
                            fontWeight: 500,
                            fontSize: { xs: '1rem', sm: '1.05rem' },
                            lineHeight: 1.6,
                        }}
                    >
                        {t('entities.formCta.message')}
                    </Typography>
                    <Button
                        component="a"
                        href={FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        endIcon={<LaunchIcon sx={{ fontSize: 18 }} />}
                        sx={{
                            alignSelf: { xs: 'flex-end', sm: 'center' },
                            flexShrink: 0,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            color: theme.palette.primary.contrastText,
                            fontWeight: 600,
                            px: 2.5,
                            py: 1.25,
                            borderRadius: '9999px',
                            textTransform: 'none',
                            boxShadow: theme.shadows[2],
                            '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                boxShadow: theme.shadows[4],
                            },
                        }}
                    >
                        {t('entities.formCta.button')}
                    </Button>
                </Box>

                {loading && <LoadingComponent />}

                {error && <ErrorComponent message={error} />}

                {!loading && !error && categories.map((category) => (
                    <ContainerEntitiesComponent
                        key={category.id}
                        entities={category.entities}
                        title={category.name}
                    />
                ))}
            </Container>
        </>
    )
}
