"use client";

import { Box, Typography } from "@mui/material";

export default function DashboardError({ error }: { error: Error & { digest?: string } }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Ocurrió un error
      </Typography>
      <Typography color="text.secondary">{error.message || "No se pudo cargar esta página."}</Typography>
    </Box>
  );
}
