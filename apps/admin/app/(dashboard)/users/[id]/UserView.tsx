"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Avatar, Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useSnackbar } from "notistack";
import type { Profile } from "@rrm/db";
import { updateUserRole } from "@/services/users.service";
import { themePalette } from "@/lib/theme";

export function UserView({ profile }: { profile: Profile }) {
  const router = useRouter();
  const { user: currentUser } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [role, setRole] = useState(profile.role);
  const [saving, setSaving] = useState(false);

  const isSelf = currentUser?.id === profile.id;

  const handleToggleRole = async () => {
    const nextRole = role === "admin" ? "user" : "admin";
    setSaving(true);
    try {
      await updateUserRole(profile.id, nextRole);
      setRole(nextRole);
      enqueueSnackbar(`Rol actualizado a ${nextRole}`, { variant: "success" });
      router.refresh();
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : "Error al actualizar el rol", { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h5" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME, mb: 3 }}>
        Perfil de usuario
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Avatar sx={{ bgcolor: themePalette.TERTIARY, width: 72, height: 72, fontSize: 24, mb: 1 }}>
            {`${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase() || "?"}
          </Avatar>
          <Typography variant="h6">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Chip
            size="small"
            label={role}
            sx={{
              textTransform: "capitalize",
              mt: 0.5,
              bgcolor: role === "admin" ? themePalette.PRIMARY : themePalette.SECONDARY,
              color: "#fff",
            }}
          />
        </Box>

        <Stack spacing={1.5}>
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Estado" value={profile.isActive ? "Activo" : "Inactivo"} />
          <InfoRow label="Fecha de registro" value={format(new Date(profile.createdAt), "dd/MM/yyyy", { locale: es })} />
        </Stack>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 3, borderRadius: "50px" }}
          disabled={saving || isSelf}
          onClick={handleToggleRole}
        >
          {isSelf ? "No podés cambiar tu propio rol" : role === "admin" ? "Quitar rol de administrador" : "Hacer administrador"}
        </Button>
      </Paper>
    </Box>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}
