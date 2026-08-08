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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { deleteNews } from "@/services/news.service";
import type { NewsWithAuthor } from "@/interfaces/news";
import { themePalette } from "@/lib/theme";

export function NewsTable({ initialNews }: { initialNews: NewsWithAuthor[] }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState(initialNews);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toDelete, setToDelete] = useState<NewsWithAuthor | null>(null);
  const [deleting, setDeleting] = useState(false);

  const paginated = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteNews(toDelete.id);
      setRows((r) => r.filter((n) => n.id !== toDelete.id));
      enqueueSnackbar("Noticia eliminada correctamente", { variant: "success" });
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
          Noticias
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => router.push("/news/create")}
          sx={{ borderRadius: "50px" }}
        >
          Nueva noticia
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { bgcolor: themePalette.CHROME, color: "#fff", fontWeight: 600 } }}>
              <TableCell>Imagen</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Subtítulo</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`/news/${item.id}`)}
              >
                <TableCell>
                  <Avatar variant="rounded" src={item.imageUrl ?? undefined} sx={{ width: 56, height: 56 }} />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.subtitle}</TableCell>
                <TableCell>
                  {item.author ? (
                    `${item.author.firstName} ${item.author.lastName}`
                  ) : (
                    <Chip size="small" label="Sin autor" />
                  )}
                </TableCell>
                <TableCell>{format(new Date(item.date), "dd/MM/yyyy", { locale: es })}</TableCell>
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <IconButton size="small" onClick={() => router.push(`/news/${item.id}/edit`)}>
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => setToDelete(item)}>
                    <Trash2 size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
                    No hay noticias todavía.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Filas por página"
        />
      </TableContainer>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>¿Eliminar noticia?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. Se eliminará &quot;{toDelete?.title}&quot; y su imagen.
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
