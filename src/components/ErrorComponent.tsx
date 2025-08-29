import { Box, Typography, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorComponentProps {
    message: string;
    onRetry?: () => void;
}

export const ErrorComponent = ({ message, onRetry }: ErrorComponentProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={4}
            textAlign="center"
        >
            <Typography variant="h6" color="error" gutterBottom>
                Error
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                {message}
            </Typography>
            {onRetry && (
                <Button
                    variant="contained"
                    startIcon={<Refresh />}
                    onClick={onRetry}
                >
                    Reintentar
                </Button>
            )}
        </Box>
    );
};