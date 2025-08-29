// components/LoadingComponent.tsx
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingComponentProps {
    message?: string;
}

export const LoadingComponent = ({ message = "Cargando..." }: LoadingComponentProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={4}
        >
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Box>
    );
};