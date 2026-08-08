"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
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
import type { EntityCategory } from "@rrm/db";
import { deleteEntityCategory } from "@/services/entityCategories.service";
import { themePalette } from "@/lib/theme";

export function CategoriesTable({ initialCategories }: { initialCategories: EntityCategory[] }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState(initialCategories);
  const [toDelete, setToDelete] = useState<EntityCategory | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteEntityCategory(toDelete.id);
      setRows((r) => r.filter((c) => c.id !== toDelete.id));
      enqueueSnackbar("Categoría eliminada correctamente", { variant: "success" });
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
          Categorías de entidades
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => router.push("/entity-categories/create")}
          sx={{ borderRadius: "50px" }}
        >
          Nueva categoría
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { bgcolor: themePalette.CHROME, color: "#fff", fontWeight: 600 } }}>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((cat) => (
              <TableRow key={cat.id} hover>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => router.push(`/entity-categories/${cat.id}/edit`)}>
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => setToDelete(cat)}>
                    <Trash2 size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
                    No hay categorías todavía.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>¿Eliminar categoría?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esto también eliminará todas las entidades de &quot;{toDelete?.name}&quot; y sus imágenes. Esta
            acción no se puede deshacer.
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
