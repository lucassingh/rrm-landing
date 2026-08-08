"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { deleteEntity } from "@/services/entities.service";
import type { EntityWithCategory } from "@/interfaces/entity";
import { themePalette } from "@/lib/theme";

export function EntitiesTable({ initialEntities }: { initialEntities: EntityWithCategory[] }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState(initialEntities);
  const [toDelete, setToDelete] = useState<EntityWithCategory | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteEntity(toDelete.id);
      setRows((r) => r.filter((e) => e.id !== toDelete.id));
      enqueueSnackbar("Entidad eliminada correctamente", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : "Error al eliminar", { variant: "error" });
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME }}>
          Entidades
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => router.push("/entities/create")}
          sx={{ borderRadius: "50px" }}
        >
          Nueva entidad
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { bgcolor: themePalette.CHROME, color: "#fff", fontWeight: 600 } }}>
              <TableCell>#</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Logo blanco</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((entity) => (
              <TableRow key={entity.id} hover sx={{ cursor: "pointer" }} onClick={() => router.push(`/entities/${entity.id}`)}>
                <TableCell>{entity.id}</TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={entity.imageUrl ?? undefined}
                    sx={{ width: 48, height: 48, bgcolor: entity.isWhite ? "#2a2a2a" : undefined }}
                  />
                </TableCell>
                <TableCell>{entity.name}</TableCell>
                <TableCell>{entity.category?.name ?? "—"}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={entity.isWhite ? "Sí" : "No"}
                    sx={entity.isWhite ? { bgcolor: "#2a2a2a", color: "#fff" } : undefined}
                  />
                </TableCell>
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <IconButton size="small" onClick={() => router.push(`/entities/${entity.id}/edit`)}>
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => setToDelete(entity)}>
                    <Trash2 size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
                    No hay entidades todavía.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>¿Eliminar entidad?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se eliminará &quot;{toDelete?.name}&quot; y su imagen. Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleDelete} disabled={deleting}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
