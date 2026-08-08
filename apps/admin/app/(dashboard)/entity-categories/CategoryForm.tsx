"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import type { EntityCategory } from "@rrm/db";
import { createEntityCategory, updateEntityCategory } from "@/services/entityCategories.service";
import { themePalette } from "@/lib/theme";

const schema = Yup.object({ name: Yup.string().trim().required("El nombre es requerido") });

export function CategoryForm({ initial }: { initial?: EntityCategory }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = !!initial;

  const formik = useFormik({
    initialValues: { name: initial?.name ?? "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          await updateEntityCategory(initial.id, values.name.trim());
          enqueueSnackbar("Categoría actualizada correctamente", { variant: "success" });
        } else {
          await createEntityCategory(values.name.trim());
          enqueueSnackbar("Categoría creada correctamente", { variant: "success" });
        }
        router.push("/entity-categories");
        router.refresh();
      } catch (err) {
        enqueueSnackbar(err instanceof Error ? err.message : "Error al guardar", { variant: "error" });
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 500 }}>
      <Typography variant="h5" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME, mb: 3 }}>
        {isEdit ? "Editar categoría" : "Nueva categoría"}
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
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting} sx={{ borderRadius: "50px" }}>
            {isEdit ? "Guardar cambios" : "Crear categoría"}
          </Button>
          <Button variant="text" onClick={() => router.back()}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
