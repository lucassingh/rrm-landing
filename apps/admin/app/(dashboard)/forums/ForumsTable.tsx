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
import type { Forum } from "@rrm/db";
import { deleteForum } from "@/services/forums.service";
import { themePalette } from "@/lib/theme";

export function ForumsTable({ initialForums }: { initialForums: Forum[] }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState(initialForums);
  const [toDelete, setToDelete] = useState<Forum | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteForum(toDelete.id);
      setRows((r) => r.filter((f) => f.id !== toDelete.id));
      enqueueSnackbar("Foro eliminado correctamente", { variant: "success" });
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
          Foros
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => router.push("/forums/create")}
          sx={{ borderRadius: "50px" }}
        >
          Nuevo foro
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { bgcolor: themePalette.CHROME, color: "#fff", fontWeight: 600 } }}>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Coordinador</TableCell>
              <TableCell>WhatsApp</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((forum) => (
              <TableRow key={forum.id} hover>
                <TableCell>{forum.id}</TableCell>
                <TableCell>{forum.name}</TableCell>
                <TableCell>{forum.coordinatorName}</TableCell>
                <TableCell>
                  <a href={forum.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    {forum.whatsappUrl}
                  </a>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => router.push(`/forums/${forum.id}/edit`)}>
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => setToDelete(forum)}>
                    <Trash2 size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
                    No hay foros todavía.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>¿Eliminar foro?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se eliminará &quot;{toDelete?.name}&quot;. Esta acción no se puede deshacer.
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
