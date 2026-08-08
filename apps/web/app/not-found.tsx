"use client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <Typography variant="h3">404 - Página no encontrada</Typography>
      <Button variant="contained" onClick={() => router.push("/")} sx={{ mt: 3 }}>
        Volver al inicio
      </Button>
    </div>
  );
}
