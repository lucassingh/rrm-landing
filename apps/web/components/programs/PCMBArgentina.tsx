"use client";

import React from "react";
import { Box, Typography, Button, Grid, useTheme, Container, useMediaQuery } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaFacebook } from "react-icons/fa";

export const PCMBArgentina: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleJoinFacebook = () => {
    window.open("https://www.facebook.com/capacitacion.misionerapcmb/", "_blank", "noopener,noreferrer");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Columna de contenido - Siempre visible */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
              <motion.div variants={itemVariants} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: "left" }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.1,
                  }}
                >
                  {t("programs.pcmb.title")}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} style={{ textAlign: "left" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                  }}
                >
                  {t("programs.pcmb.subtitle")}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} style={{ textAlign: "left" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    mb: 5,
                    fontSize: "1.1rem",
                  }}
                >
                  {t("programs.pcmb.description")}
                </Typography>
              </motion.div>

              {/* Botón */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleJoinFacebook}
                    startIcon={<FaFacebook size={20} />}
                    sx={{
                      borderRadius: "30px",
                      px: 4,
                      py: 2,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      minWidth: "200px",
                      height: "56px",
                      background: theme.palette.primary.main,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      "&:hover": {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t("programs.pcmb.buttons.join")}
                  </Button>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Columna de la imagen - Oculto en mobile */}
          {!isMobile && (
            <Grid size={{ xs: 12, md: 6 }} sx={{ paddingBottom: "30px" }}>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 500,
                    padding: { xs: 3, md: 6 },
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/programs/pcmb.png"
                    alt="PCMB Programa"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "30px",
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default PCMBArgentina;
