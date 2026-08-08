"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import type { Forum } from "@rrm/db";
import { createForum, updateForum } from "@/services/forums.service";
import { themePalette } from "@/lib/theme";

const schema = Yup.object({
  name: Yup.string().trim().required("El nombre es requerido"),
  coordinatorName: Yup.string().trim().required("El coordinador es requerido"),
  whatsappUrl: Yup.string().trim().url("URL inválida").required("El link de WhatsApp es requerido"),
});

export function ForumForm({ initial }: { initial?: Forum }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = !!initial;

  const formik = useFormik({
    initialValues: {
      name: initial?.name ?? "",
      coordinatorName: initial?.coordinatorName ?? "",
      whatsappUrl: initial?.whatsappUrl ?? "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const input = {
        name: values.name.trim(),
        coordinatorName: values.coordinatorName.trim(),
        whatsappUrl: values.whatsappUrl.trim(),
      };
      try {
        if (isEdit) {
          await updateForum(initial.id, input);
          enqueueSnackbar("Foro actualizado correctamente", { variant: "success" });
        } else {
          await createForum(input);
          enqueueSnackbar("Foro creado correctamente", { variant: "success" });
        }
        router.push("/forums");
        router.refresh();
      } catch (err) {
        enqueueSnackbar(err instanceof Error ? err.message : "Error al guardar", { variant: "error" });
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 500 }}>
      <Typography variant="h5" sx={{ fontFamily: themePalette.FONT_HEADERS, color: themePalette.CHROME, mb: 3 }}>
        {isEdit ? "Editar foro" : "Nuevo foro"}
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TextField
          fullWidth
          label="Nombre del foro"
          name="name"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          label="Coordinador"
          name="coordinatorName"
          margin="normal"
          value={formik.values.coordinatorName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.coordinatorName && !!formik.errors.coordinatorName}
          helperText={formik.touched.coordinatorName && formik.errors.coordinatorName}
        />
        <TextField
          fullWidth
          label="Link de WhatsApp"
          name="whatsappUrl"
          margin="normal"
          placeholder="https://wa.me/549..."
          value={formik.values.whatsappUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.whatsappUrl && !!formik.errors.whatsappUrl}
          helperText={formik.touched.whatsappUrl && formik.errors.whatsappUrl}
        />
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting} sx={{ borderRadius: "50px" }}>
            {isEdit ? "Guardar cambios" : "Crear foro"}
          </Button>
          <Button variant="text" onClick={() => router.back()}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
