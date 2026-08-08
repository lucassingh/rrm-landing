"use client";

import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, useTheme, alpha, useMediaQuery } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import AUEArgentina from "@/components/programs/AUEArgentina";
import { PCMBArgentina } from "@/components/programs/PCMBArgentina";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`program-tabpanel-${index}`} aria-labelledby={`program-tab-${index}`} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

export const ProgramsSection: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Función para truncar el texto de la primera tab en mobile
  const getTabLabel = (label: string, isFirstTab: boolean = false) => {
    if (isMobile && isFirstTab && label.length > 20) {
      return `${label.substring(0, 20)}...`;
    }
    return label;
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 14 },
          mx: "auto",
          maxWidth: "1800px",
        }}
      >
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                {t("programs.title")}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: "text.secondary",
                  maxWidth: 600,
                  mx: "auto",
                  lineHeight: 1.6,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                }}
              >
                {t("programs.subtitle")}
              </Typography>
            </Box>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTabs-indicator": {
                    height: 3,
                    borderRadius: 3,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                  "& .MuiTab-root": {
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    maxWidth: isMobile ? "none" : "400px",
                    minWidth: isMobile ? "auto" : "400px",
                    minHeight: 60,
                    color: "text.secondary",
                    "&.Mui-selected": {
                      color: "text.primary",
                    },
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  },
                }}
              >
                <Tab label={getTabLabel(t("programs.tabs.alcance"), true)} />
                <Tab label={t("programs.tabs.pcmb")} />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ textAlign: "center" }}>
                <AUEArgentina />
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ textAlign: "center" }}>
                <PCMBArgentina />
              </Box>
            </TabPanel>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ProgramsSection;
