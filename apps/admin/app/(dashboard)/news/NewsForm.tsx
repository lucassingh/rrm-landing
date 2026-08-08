"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { RichTextEditor } from "@/components/RichTextEditor";
import { createNews, updateNews } from "@/services/news.service";
import { sanitizeHTML } from "@/lib/sanitize";
import type { NewsWithAuthor } from "@/interfaces/news";
import { themePalette } from "@/lib/theme";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

const schema = Yup.object({
  title: Yup.string().required("El título es requerido"),
  subtitle: Yup.string().required("El subtítulo es requerido"),
  image_description: Yup.string().required("La descripción de la imagen es requerida"),
  body: Yup.string().required("El contenido es requerido"),
});

export function NewsForm({ initial }: { initial?: NewsWithAuthor }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initial?.imageUrl ?? null);
  const [imageError, setImageError] = useState<string | null>(null);
  const isEdit = !!initial;

  const formik = useFormik({
    initialValues: {
      title: initial?.title ?? "",
      subtitle: initial?.subtitle ?? "",
      image_description: initial?.imageDescription ?? "",
      body: initial?.body ?? "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!isEdit && !imageFile) {
        setImageError("La imagen es requerida");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle);
      formData.append("image_description", values.image_description);
      formData.append("body", sanitizeHTML(values.body));
      if (imageFile) formData.append("image", imageFile);

      try {
        if (isEdit) {
          await updateNews(initial.id, formData);
          enqueueSnackbar("Noticia actualizada correctamente", { variant: "success" });
        } else {
          await createNews(formData);
          enqueueSnackbar("Noticia creada correctamente", { variant: "success" });
        }
        router.push("/news");
        router.refresh();
      } catch (err) {
        enqueueSnackbar(err instanceof Error ? err.message : "Error al guardar", { variant: "error" });
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setImageError("Formato no soportado. Usá JPEG, PNG, WEBP o GIF.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setImageError("La imagen no debe superar los 5MB.");
      return;
    }
    setImageError(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 800 }}>
      <Typography variant="h5" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME, mb: 3 }}>
        {isEdit ? "Editar noticia" : "Nueva noticia"}
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TextField
          fullWidth
          label="Título"
          name="title"
          margin="normal"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          label="Subtítulo"
          name="subtitle"
          margin="normal"
          value={formik.values.subtitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.subtitle && !!formik.errors.subtitle}
          helperText={formik.touched.subtitle && formik.errors.subtitle}
        />
        <TextField
          fullWidth
          label="Descripción de la imagen"
          name="image_description"
          margin="normal"
          value={formik.values.image_description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image_description && !!formik.errors.image_description}
          helperText={formik.touched.image_description && formik.errors.image_description}
        />

        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Imagen principal {isEdit ? "(opcional — dejar vacío para mantener la actual)" : ""}
          </Typography>
          {imagePreview && (
            <Avatar variant="rounded" src={imagePreview} sx={{ width: 120, height: 120, mb: 1 }} />
          )}
          <Box>
            <Button variant="outlined" component="label" sx={{ borderRadius: "50px" }}>
              {imagePreview ? "Cambiar imagen" : "Subir imagen"}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>
          {imageError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {imageError}
            </Alert>
          )}
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Contenido
        </Typography>
        <RichTextEditor value={formik.values.body} onChange={(html) => formik.setFieldValue("body", html)} />
        {formik.touched.body && formik.errors.body && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {formik.errors.body}
          </Alert>
        )}

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting} sx={{ borderRadius: "50px" }}>
            {isEdit ? "Guardar cambios" : "Publicar noticia"}
          </Button>
          <Button variant="text" onClick={() => router.back()}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
