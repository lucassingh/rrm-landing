"use client";

// Client-side half of app/news/page.tsx — holds the pagination state and
// "latest 5" sidebar calc that rrm-landing/src/pages/NewsPage.tsx used to do
// after its own useEffect fetch. The Server Component page now fetches the
// full list up front and passes it in as a prop; no loading/error states are
// needed here anymore.
import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { JumbotronComponent } from "@/components/JumbotronComponent";
import type { NewsWithAuthor } from "@/interfaces/news";
import { NewsCardComponent } from "./NewsCardComponent";
import { PaginationComponent } from "./PaginationComponent";
import { SideNewsComponent } from "./SideNewsComponent";

const ITEMS_PER_PAGE = 7;

interface NewsListClientProps {
  news: NewsWithAuthor[];
}

export function NewsListClient({ news }: NewsListClientProps) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const latestNews = [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  if (news.length === 0) {
    return (
      <>
        <JumbotronComponent
          title={t("news.title")}
          subtitle={t("news.subtitle")}
          background="/assets/bgs/news-bg.jpg"
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
        background="/assets/bgs/news-bg.jpg"
        overlay={true}
        titleColor="#ffffff"
        subtitleColor="#f0f0f0"
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {paginatedNews.map((newsItem) => (
                <NewsCardComponent key={newsItem.id} news={newsItem} index={0} />
              ))}
            </Box>
            <PaginationComponent count={totalPages} page={page} onChange={handlePageChange} />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }} sx={{ display: { xs: "none", lg: "block" } }}>
            <SideNewsComponent news={latestNews} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default NewsListClient;
