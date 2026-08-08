"use client";

// Ported from rrm-landing/src/components/news/NewsCardComponent.tsx.
// The click handler is simplified to a plain next/link (the detail page now
// fetches by id itself, so there is no need to pass router state).
import Link from "next/link";
import { Avatar, Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { darkPalette, lightPalette } from "@/lib/palettes";
import { htmlToExcerpt } from "@/lib/text";
import type { NewsWithAuthor } from "@/interfaces/news";

interface NewsCardComponentProps {
  news: NewsWithAuthor;
  index: number;
}

// The old app picked one of these 5 brand colors at random on every render
// (Math.random()) for the accent dot + avatar background. This list is now
// fetched and rendered server-side, so a per-render random pick would cause a
// server/client hydration mismatch. Deriving the color from the news id keeps
// the same "rotating accent color per card" look, deterministically.
const accentColors = [
  lightPalette.primary.main,
  lightPalette.secondary.main,
  lightPalette.tertiary.main,
  lightPalette.extra1.main,
  lightPalette.extra2.main,
];

export const NewsCardComponent = ({ news, index = 0 }: NewsCardComponentProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const accentColor = accentColors[news.id % accentColors.length];

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "RM";
    return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  };

  const revealVariants: Variants = {
    offscreen: {
      y: 30,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariants}
      transition={{ delay: index * 0.1 }}
      style={{ width: "100%" }}
    >
      <Card
        component={Link}
        href={`/news/${news.id}`}
        sx={{
          display: "block",
          borderRadius: 2,
          border: "none",
          boxShadow: "none",
          cursor: "pointer",
          textDecoration: "none",
          color: "inherit",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
          },
          p: 2,
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: accentColor,
                flexShrink: 0,
              }}
            />
            <Typography
              component="div"
              variant="overline"
              sx={{
                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                fontSize: "0.75rem",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              {news.subtitle}
            </Typography>
          </Box>

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
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.8rem" },
                }}
              >
                {news.title}
              </Typography>
            </Box>

            {news.imageUrl && (
              <Box flex={4}>
                <Box
                  component="img"
                  src={news.imageUrl}
                  alt={news.imageDescription}
                  sx={{
                    width: "100%",
                    height: { xs: 40, sm: 80 },
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Extracto del cuerpo */}
          <Box mb={2}>
            <Typography
              component="div"
              variant="body2"
              sx={{
                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.5,
              }}
            >
              {htmlToExcerpt(news.body)}
            </Typography>
          </Box>

          {/* Footer con fecha y autor */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Fecha */}
            <Typography
              component="div"
              variant="caption"
              sx={{
                color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                fontSize: "0.75rem",
              }}
            >
              Fecha de Creación: <br /> {formatDate(news.date)}
            </Typography>

            {/* Información del autor */}
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "0.75rem",
                  backgroundColor: accentColor,
                  color: "#FFFFFF",
                }}
              >
                {getInitials(news.author?.firstName, news.author?.lastName)}
              </Avatar>
              <Box>
                <Typography
                  component="div"
                  variant="caption"
                  sx={{
                    display: "block",
                    fontWeight: 500,
                    color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                  }}
                >
                  Escrito por:
                </Typography>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{
                    display: "block",
                    fontWeight: 500,
                    color: isDarkMode ? darkPalette.text.primary : lightPalette.text.primary,
                  }}
                >
                  {news.author ? `${news.author.firstName} ${news.author.lastName}` : "Red Misiones Mundiales"}
                </Typography>
                {news.author && (
                  <Typography
                    component="div"
                    variant="caption"
                    sx={{
                      color: isDarkMode ? darkPalette.text.secondary : lightPalette.text.secondary,
                      fontSize: "0.7rem",
                    }}
                  >
                    {news.author.email}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsCardComponent;
