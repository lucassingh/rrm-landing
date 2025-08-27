import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Typography variant="h3">404 - Página no encontrada</Typography>
            <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{ mt: 3 }}
            >
                Volver al inicio
            </Button>
        </div>
    )
}
