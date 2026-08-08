"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { deleteEntity } from "@/services/entities.service";
import type { EntityWithCategory } from "@/interfaces/entity";
import { themePalette } from "@/lib/theme";

export function EntityView({ entity }: { entity: EntityWithCategory }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteEntity(entity.id);
      enqueueSnackbar("Entidad eliminada correctamente", { variant: "success" });
      router.push("/entities");
      router.refresh();
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : "Error al eliminar", { variant: "error" });
    }
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME }}>
          {entity.name}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button startIcon={<Pencil size={16} />} onClick={() => router.push(`/entities/${entity.id}/edit`)}>
            Editar
          </Button>
          <Button color="error" startIcon={<Trash2 size={16} />} onClick={() => setConfirmOpen(true)}>
            Eliminar
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box
          sx={{
            width: 160,
            height: 160,
            borderRadius: 2,
            bgcolor: entity.isWhite ? "#1f2937" : "#f4f6fb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            overflow: "hidden",
          }}
        >
          {entity.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={entity.imageUrl} alt={entity.name} style={{ maxWidth: "100%", maxHeight: "100%" }} />
          ) : (
            <Typography color="text.secondary">Sin imagen</Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={entity.category?.name ?? "Sin categoría"} />
          {entity.isWhite && <Chip label="Logo blanco" sx={{ bgcolor: "#2a2a2a", color: "#fff" }} />}
        </Stack>

        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>Web:</strong>{" "}
            {entity.webUrl ? (
              <a href={entity.webUrl} target="_blank" rel="noopener noreferrer">
                {entity.webUrl}
              </a>
            ) : (
              "Sin URL"
            )}
          </Typography>
          <Typography variant="body2">
            <strong>Facebook:</strong>{" "}
            {entity.facebookUrl ? (
              <a href={entity.facebookUrl} target="_blank" rel="noopener noreferrer">
                {entity.facebookUrl}
              </a>
            ) : (
              "Sin URL"
            )}
          </Typography>
          <Typography variant="body2">
            <strong>WhatsApp:</strong>{" "}
            {entity.whatsappUrl ? (
              <a href={entity.whatsappUrl} target="_blank" rel="noopener noreferrer">
                {entity.whatsappUrl}
              </a>
            ) : (
              "Sin URL"
            )}
          </Typography>
        </Stack>
      </Paper>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Eliminar entidad?</DialogTitle>
        <DialogContent>
          <DialogContentText>Esta acción no se puede deshacer.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
