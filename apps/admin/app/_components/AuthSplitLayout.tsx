"use client";

import { Box, Container, Grid, Paper, Typography, styled } from "@mui/material";

// Ported from rmm-frontend/src/pages/LoginPage.tsx — full-bleed background image
// on the left, centered white card on the right. Clerk's <SignIn/>/<SignUp/>
// render inside FormContainer instead of the old hand-built Formik form.
const FormContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 8,
  border: `1px solid ${theme.palette.info.main}`,
  boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
  padding: 40,
  maxWidth: 450,
  width: "100%",
}));

export function AuthSplitLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <Grid container component="main" sx={{ minHeight: "100vh" }}>
      <Grid
        size={{ xs: 0, sm: 8 }}
        sx={{
          display: { xs: "none", sm: "block" },
          // Raw CSS url() string — unlike next/image, this does NOT get
          // basePath auto-prefixed, so it's spelled out explicitly.
          backgroundImage: "url(/admin/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid size={{ xs: 12, sm: 4 }}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            p: 3,
          }}
        >
          <Container
            maxWidth="sm"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
              {subtitle}
            </Typography>
            <FormContainer elevation={0}>{children}</FormContainer>
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}
