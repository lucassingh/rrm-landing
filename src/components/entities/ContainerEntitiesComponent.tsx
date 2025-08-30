import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Grid,
    Typography,
    IconButton,
    useTheme,
    keyframes
} from '@mui/material';
import {
    Language as WebIcon,
    Facebook as FacebookIcon,
    WhatsApp as WhatsAppIcon
} from '@mui/icons-material';
import { motion, type Variants } from 'framer-motion';
import type { Entity } from '../../utils/entitiesData';
import HeaderComponent from '../HeaderComponent';

interface ContainerEntitiesProps {
    entities: Entity[];
    title: string;
    subtitle?: string;
}

// Definición de la animación de pulso
const pulseBorder = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(25, 118, 210, 0.2);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0px rgba(25, 118, 210, 0);
  }
`;

// Variantes de animación para Framer Motion con tipos correctos
const cardVariants: Variants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

export const ContainerEntitiesComponent: React.FC<ContainerEntitiesProps> = ({
    entities,
    title,
    subtitle
}) => {
    const theme = useTheme();
    const isLightMode = theme.palette.mode === 'light';

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: theme.palette.background.paper,
                borderRadius: '10px',
                boxShadow: theme.shadows[3],
                p: 3,
                mb: 4
            }}
        >
            <HeaderComponent
                title={title}
                subtitle={subtitle}
                titleVariant='h2'
                align="left"
                sx={{ marginBottom: '20px' }}
            />

            {/* Grid de tarjetas */}
            <Grid container spacing={3}>
                {entities.map((entity, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={entity.id}>
                        <motion.div
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '10px',
                                    boxShadow: theme.shadows[2],
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    position: 'relative',
                                    // Animación de pulso solo en modo claro
                                    ...(isLightMode && {
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            borderRadius: '10px',
                                            animation: `${pulseBorder} 2s infinite`,
                                            pointerEvents: 'none'
                                        }
                                    }),
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[6],
                                        // Intensificar la animación al hacer hover
                                        ...(isLightMode && {
                                            '&::before': {
                                                animation: `${pulseBorder} 1s infinite`
                                            }
                                        })
                                    }
                                }}
                            >
                                {/* Header con logo - Fondo adaptativo para logos blancos */}
                                <Box
                                    sx={{
                                        backgroundColor: entity.isWhite
                                            ? (isLightMode ? theme.palette.grey[800] : theme.palette.grey[700])
                                            : (isLightMode ? '#fff' : '#fff'),
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 140,
                                        py: 2,
                                        borderTopLeftRadius: '10px',
                                        borderTopRightRadius: '10px',
                                        width: '100%'
                                    }}
                                >
                                    {entity.logo ? (
                                        <Box
                                            component="img"
                                            src={entity.logo}
                                            alt={entity.name}
                                            sx={{
                                                maxHeight: 100,
                                                maxWidth: '80%',
                                                width: 'auto',
                                                height: 'auto',
                                                objectFit: 'contain',
                                                borderRadius: '10px',
                                                display: 'block',
                                                margin: '0 auto',
                                                ...(entity.isWhite && isLightMode && {
                                                    filter: 'brightness(0) invert(1)'
                                                })
                                            }}
                                        />
                                    ) : (
                                        <Typography
                                            variant="h6"
                                            textAlign="center"
                                            sx={{
                                                width: '100%',
                                                padding: 2,
                                                color: entity.isWhite && isLightMode ? '#fff' : 'inherit'
                                            }}
                                        >
                                            {entity.name}
                                        </Typography>
                                    )}
                                </Box>

                                {/* Body con nombre */}
                                <CardContent sx={{ flexGrow: 1, py: 2 }}>
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            fontWeight: 600,
                                            textAlign: 'center',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            minHeight: '64px'
                                        }}
                                    >
                                        {entity.name}
                                    </Typography>
                                </CardContent>

                                {/* Footer con iconos de contacto */}
                                <CardActions
                                    sx={{
                                        justifyContent: 'center',
                                        backgroundColor: theme.palette.mode === 'light'
                                            ? theme.palette.grey[100]
                                            : theme.palette.grey[800],
                                        py: 1.5,
                                        borderBottomLeftRadius: '10px',
                                        borderBottomRightRadius: '10px'
                                    }}
                                >
                                    {entity.webUrl && (
                                        <IconButton
                                            aria-label="Sitio web"
                                            onClick={() => window.open(entity.webUrl, '_blank')}
                                            sx={{
                                                color: theme.palette.mode === 'light'
                                                    ? theme.palette.primary.main
                                                    : theme.palette.primary.light
                                            }}
                                        >
                                            <WebIcon />
                                        </IconButton>
                                    )}
                                    {entity.facebookUrl && (
                                        <IconButton
                                            aria-label="Facebook"
                                            onClick={() => window.open(entity.facebookUrl, '_blank')}
                                            sx={{
                                                color: theme.palette.mode === 'light'
                                                    ? '#1877F2'
                                                    : '#2D88FF'
                                            }}
                                        >
                                            <FacebookIcon />
                                        </IconButton>
                                    )}
                                    {entity.whatappUrl && (
                                        <IconButton
                                            aria-label="WhatsApp"
                                            onClick={() => window.open(entity.whatappUrl, '_blank')}
                                            sx={{
                                                color: theme.palette.mode === 'light'
                                                    ? '#25D366'
                                                    : '#00E676'
                                            }}
                                        >
                                            <WhatsAppIcon />
                                        </IconButton>
                                    )}
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};