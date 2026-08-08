"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { deleteNews } from "@/services/news.service";
import type { NewsWithAuthor } from "@/interfaces/news";
import { themePalette } from "@/lib/theme";

export function NewsView({ item }: { item: NewsWithAuthor }) {
  const router = useRouter();
  const { user } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isAdmin = (user?.publicMetadata?.role as string | undefined) === "admin";
  const isOwner = item.userId === user?.id;

  const handleDelete = async () => {
    try {
      await deleteNews(item.id);
      enqueueSnackbar("Noticia eliminada correctamente", { variant: "success" });
      router.push("/news");
      router.refresh();
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : "Error al eliminar", { variant: "error" });
    }
  };

  return (
    <Box sx={{ maxWidth: 900 }}>
      {item.imageUrl && (
        <Box
          component="img"
          src={item.imageUrl}
          alt={item.imageDescription}
          sx={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 2, mb: 3 }}
        />
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME }}>
            {item.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {item.subtitle}
          </Typography>
        </Box>
        {(isAdmin || isOwner) && (
          <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
            <Button startIcon={<Pencil size={16} />} onClick={() => router.push(`/news/${item.id}/edit`)}>
              Editar
            </Button>
            <Button color="error" startIcon={<Trash2 size={16} />} onClick={() => setConfirmOpen(true)}>
              Eliminar
            </Button>
          </Box>
        )}
      </Box>

      <Paper sx={{ p: 2, mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: themePalette.TERTIARY }}>
          {item.author ? `${item.author.firstName[0]}${item.author.lastName[0]}` : "?"}
        </Avatar>
        <Box>
          <Typography variant="body2">
            {item.author ? `${item.author.firstName} ${item.author.lastName}` : "Autor eliminado"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.author?.role === "admin" ? "Editor" : "Redactor"} ·{" "}
            {format(new Date(item.date), "dd/MM/yyyy", { locale: es })}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            // Pasted content (Word, sitios, etc.) sometimes carries literal
            // &nbsp; between every word, blocking normal wrapping — force it.
            overflowWrap: "break-word",
            wordBreak: "break-word",
            "& h1, & h2, & h3": { fontFamily: themePalette.FONT_HEADERS, mt: 2, mb: 1 },
            "& p": { mb: 2, lineHeight: 1.7 },
            "& img": { maxWidth: "100%", borderRadius: 1 },
            "& blockquote": {
              borderLeft: `4px solid ${themePalette.PRIMARY}`,
              pl: 2,
              color: "text.secondary",
            },
          }}
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      </Paper>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Eliminar noticia?</DialogTitle>
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
