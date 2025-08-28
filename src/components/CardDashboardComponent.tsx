import { Card, type CardProps } from '@mui/material';
import type { ReactNode } from 'react';

interface CardDashboardComponentProps extends CardProps {
    children: ReactNode;
    padding?: number | string;
    borderRadius?: number | string;
}

export const CardDashboardComponent: React.FC<CardDashboardComponentProps> = ({
    children,
    padding = 2,
    borderRadius = 2,
    sx = {},
    ...props
}) => {
    return (
        <Card
            sx={{
                p: padding,
                borderRadius: borderRadius,
                boxShadow: 3,
                backgroundColor: 'background.paper',
                position: 'relative',
                marginBottom: '15px',
                ...sx
            }}
            {...props}
        >
            {children}
        </Card>
    );
};