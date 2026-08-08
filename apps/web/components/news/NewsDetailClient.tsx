"use client";

// Client-side half of app/news/[id]/page.tsx — ported from
// rrm-landing/src/pages/NewsByIDPage.tsx. Uses useTheme() for the dark/light
// palette switch, so it must stay a client component; the Server Component
// page does the actual DB fetch and calls notFound() when the id doesn't
// resolve (see app/news/[id]/page.tsx for the bug this fixes).
import Link from "next/link";
import { AccessTime, ArrowBack, CalendarToday } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Container, Divider, Paper, Typography, useTheme } from "@mui/material";
import { darkPalette, lightPalette } from "@/lib/palettes";
import type { NewsWithAuthor } from "@/interfaces/news";

interface NewsDetailClientProps {
  news: NewsWithAuthor;
}

const accentPalette = [
  lightPalette.primary.main,
  lightPalette.secondary.main,
  lightPalette.tertiary.main,
  lightPalette.extra1.main,
  lightPalette.extra2.main,
];

// The old app colored the author avatar with a palette color chosen at
// random (Math.random()) on the card at click time, then threaded it through
// react-router state to this page. This page is now a real server-rendered
// route (no click-time state to read — see the bug-fix note above), so the
// color is instead derived deterministically from the author, keeping the
// same "brand-colored avatar" look without relying on client-only randomness.
function getAvatarColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return accentPalette[Math.abs(hash) % accentPalette.length];
}

export function NewsDetailClient({ news }: NewsDetailClientProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const author = news.author;

  const avatarColor = getAvatarColor(
    author ? `${author.id}-${author.firstName}-${author.lastName}` : `news-${news.id}`
  );

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min de lectura`;
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "RM";
    return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  };

  const authorBlock = (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          backgroundColor: avatarColor,
          color: "#FFFFFF",
        }}
      >
        {getInitials(author?.firstName, author?.lastName)}
      </Avatar>
      <Box>
        <Typography variant="body1" fontWeight={500}>
          {author ? `${author.firstName} ${author.lastName}` : "Red Misiones Mundiales"}
        </Typography>
        {author && (
          <Typography variant="caption" color="textSecondary">
            {author.email}
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box component="article">
      {/* Imagen de portada — a todo el ancho, a modo de encabezado editorial */}
      {news.imageUrl && (
        <Box sx={{ width: "100%", height: { xs: 240, sm: 340, md: 480 }, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={news.imageUrl}
            alt={news.imageDescription || news.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Box>
      )}

      {/* Card blanca que flota sobre el fondo gris de la página, superpuesta
          levemente a la imagen de portada para dar el efecto "blog" */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          mt: news.imageUrl ? { xs: "-20px", sm: "-32px", md: "-56px" } : { xs: 4, md: 6 },
          mb: 6,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 3, md: 4 },
            p: { xs: 3, sm: 5, md: 7 },
            backgroundColor: isDarkMode ? darkPalette.background.paper : lightPalette.background.paper,
            boxShadow: isDarkMode ? "0 24px 60px rgba(0, 0, 0, 0.55)" : "0 24px 60px rgba(15, 23, 42, 0.1)",
          }}
        >
          {/* Botón de volver */}
          <Button startIcon={<ArrowBack />} component={Link} href="/news" sx={{ mb: 3, ml: -1 }} color="inherit">
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
                fontSize: { xs: "2rem", md: "3.2rem" },
              }}
            >
              {news.title}
            </Typography>

            {news.subtitle && (
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                  mb: 3,
                  lineHeight: 1.4,
                }}
              >
                {news.subtitle}
              </Typography>
            )}

            {/* Información del autor y fecha */}
            <Box display="flex" alignItems="left" sx={{ flexDirection: "column" }} gap={2} flexWrap="wrap" mb={3}>
              {authorBlock}

              <Box display="flex" alignItems="center" gap={2}>
                <Chip icon={<CalendarToday />} label={formatDate(news.date)} size="small" variant="outlined" />
                <Chip icon={<AccessTime />} label={formatReadingTime(news.body)} size="small" variant="outlined" />
              </Box>
            </Box>

            <Divider />
          </Box>

          {news.imageDescription && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mb: 4,
                fontStyle: "italic",
                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
              }}
            >
              {news.imageDescription}
            </Typography>
          )}

          {/* Contenido de la noticia */}
          <Box
            sx={{
              // Editorial paste content (Word, sitios, etc.) sometimes carries
              // literal &nbsp; between every word, which blocks normal wrapping
              // and overflows the container — force-wrap regardless of that.
              overflowWrap: "break-word",
              wordBreak: "break-word",
              "& h1": {
                mt: 4,
                mb: 2,
                fontSize: "2rem",
                fontWeight: 700,
                color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
              },
              "& h2": {
                mt: 3,
                mb: 2,
                fontSize: "1.5rem",
                fontWeight: 600,
                color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
              },
              "& h3": {
                mt: 2,
                mb: 1,
                fontSize: "1.25rem",
                fontWeight: 600,
                color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
              },
              "& p": {
                mb: 2,
                lineHeight: 1.8,
                fontSize: "1.1rem",
                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
              },
              "& ul, & ol": {
                pl: 3,
                mb: 2,
                "& li": {
                  mb: 1,
                  lineHeight: 1.6,
                  color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                },
              },
              "& blockquote": {
                borderLeft: `4px solid ${lightPalette.primary.main}`,
                pl: 2,
                ml: 0,
                fontStyle: "italic",
                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
              },
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                my: 2,
              },
              "& strong": {
                color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                fontWeight: 600,
              },
              "& em": {
                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                fontStyle: "italic",
              },
            }}
            dangerouslySetInnerHTML={{ __html: news.body }}
          />

          {/* Footer de la noticia */}
          <Divider sx={{ my: 4 }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Button startIcon={<ArrowBack />} component={Link} href="/news" color="inherit">
              Volver a noticias
            </Button>

            <Typography variant="caption" color="textSecondary">
              Publicado el {formatDate(news.date)} por:
            </Typography>
            {authorBlock}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default NewsDetailClient;
