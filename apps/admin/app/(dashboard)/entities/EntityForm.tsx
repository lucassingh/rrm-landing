"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import type { EntityCategory } from "@rrm/db";
import { createEntity, updateEntity } from "@/services/entities.service";
import type { EntityWithCategory } from "@/interfaces/entity";
import { themePalette } from "@/lib/theme";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

const schema = Yup.object({
  name: Yup.string().trim().required("El nombre es requerido"),
  category_id: Yup.number().required("La categoría es requerida"),
  web_url: Yup.string().url("URL inválida").nullable(),
  facebook_url: Yup.string().url("URL inválida").nullable(),
  whatsapp_url: Yup.string().url("URL inválida").nullable(),
});

export function EntityForm({
  categories,
  initial,
}: {
  categories: EntityCategory[];
  initial?: EntityWithCategory;
}) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initial?.imageUrl ?? null);
  const [imageError, setImageError] = useState<string | null>(null);
  const isEdit = !!initial;

  const formik = useFormik({
    initialValues: {
      name: initial?.name ?? "",
      category_id: initial?.categoryId ?? "",
      web_url: initial?.webUrl ?? "",
      facebook_url: initial?.facebookUrl ?? "",
      whatsapp_url: initial?.whatsappUrl ?? "",
      is_white: initial?.isWhite ?? false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("category_id", String(values.category_id));
      formData.append("web_url", values.web_url.trim());
      formData.append("facebook_url", values.facebook_url.trim());
      formData.append("whatsapp_url", values.whatsapp_url.trim());
      formData.append("is_white", String(values.is_white));
      if (imageFile) formData.append("image", imageFile);

      try {
        if (isEdit) {
          await updateEntity(initial.id, formData);
          enqueueSnackbar("Entidad actualizada correctamente", { variant: "success" });
        } else {
          await createEntity(formData);
          enqueueSnackbar("Entidad creada correctamente", { variant: "success" });
        }
        router.push("/entities");
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
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600 }}>
      <Typography variant="h5" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME, mb: 3 }}>
        {isEdit ? "Editar entidad" : "Nueva entidad"}
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />

        <FormControl fullWidth margin="normal" error={formik.touched.category_id && !!formik.errors.category_id}>
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            name="category_id"
            label="Categoría"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="URL Web (opcional)"
          name="web_url"
          margin="normal"
          value={formik.values.web_url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.web_url && !!formik.errors.web_url}
          helperText={formik.touched.web_url && formik.errors.web_url}
        />
        <TextField
          fullWidth
          label="URL Facebook (opcional)"
          name="facebook_url"
          margin="normal"
          value={formik.values.facebook_url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.facebook_url && !!formik.errors.facebook_url}
          helperText={formik.touched.facebook_url && formik.errors.facebook_url}
        />
        <TextField
          fullWidth
          label="URL WhatsApp (opcional)"
          name="whatsapp_url"
          margin="normal"
          value={formik.values.whatsapp_url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.whatsapp_url && !!formik.errors.whatsapp_url}
          helperText={formik.touched.whatsapp_url && formik.errors.whatsapp_url}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="is_white"
              checked={formik.values.is_white}
              onChange={formik.handleChange}
            />
          }
          label="Logo blanco (fondo oscuro en la card)"
        />

        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Imagen (opcional)
          </Typography>
          {imagePreview && (
            <Avatar
              variant="rounded"
              src={imagePreview}
              sx={{ width: 100, height: 100, mb: 1, bgcolor: formik.values.is_white ? "#2a2a2a" : undefined }}
            />
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

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting} sx={{ borderRadius: "50px" }}>
            {isEdit ? "Guardar cambios" : "Crear entidad"}
          </Button>
          <Button variant="text" onClick={() => router.back()}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
