"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
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
import { Trash2 } from "lucide-react";
import { useSnackbar } from "notistack";
import type { Profile } from "@rrm/db";
import { deleteUser } from "@/services/users.service";
import { themePalette } from "@/lib/theme";

export function UsersTable({ initialUsers }: { initialUsers: Profile[] }) {
  const router = useRouter();
  const { user: currentUser } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState(initialUsers);
  const [toDelete, setToDelete] = useState<Profile | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteUser(toDelete.id);
      setRows((r) => r.filter((u) => u.id !== toDelete.id));
      enqueueSnackbar("Usuario eliminado correctamente", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : "Error al eliminar", { variant: "error" });
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME, mb: 3 }}>
        Usuarios
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { bgcolor: themePalette.CHROME, color: "#fff", fontWeight: 600 } }}>
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((u) => (
              <TableRow key={u.id} hover sx={{ cursor: "pointer" }} onClick={() => router.push(`/users/${u.id}`)}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: themePalette.TERTIARY, width: 32, height: 32, fontSize: 13 }}>
                      {`${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.toUpperCase() || "?"}
                    </Avatar>
                    {u.firstName} {u.lastName}
                  </Box>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={u.role}
                    sx={{
                      textTransform: "capitalize",
                      bgcolor: u.role === "admin" ? themePalette.PRIMARY : themePalette.SECONDARY,
                      color: "#fff",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip size="small" label={u.isActive ? "Activo" : "Inactivo"} color={u.isActive ? "success" : "default"} />
                </TableCell>
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  {u.id !== currentUser?.id && (
                    <IconButton size="small" color="error" onClick={() => setToDelete(u)}>
                      <Trash2 size={16} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>¿Eliminar usuario?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se eliminará la cuenta de &quot;{toDelete?.firstName} {toDelete?.lastName}&quot;. Sus noticias
            quedarán sin autor. Esta acción no se puede deshacer.
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
