import * as React from "react";
import {
    Container,
    Card,
    Grid,
    Box,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { ARMapComponent, CardDashboardComponent, HeaderComponent, JumbotronComponent } from "../components";
import regionsBG from '../assets/bgs/regions-bg.jpg';
import BossesCardsComponent from "../components/BossesCardsComponent";
import { useTranslation } from "react-i18next";
import { motion, type Variants } from "framer-motion";
import mapARes from '../assets/mapARes.png';
import mapARen from '../assets/mapARen.png';

interface Region {
    id: string;
    name: string;
    color: string;
    provinces: string[];
    description: string;
}

interface RegionTooltip {
    region: Region | null;
    x: number;
    y: number;
    visible: boolean;
}

export const RegionsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t, i18n } = useTranslation();

    const regions: Region[] = [
        {
            id: "noroeste",
            name: t("regions.noro"),
            color: "#FF5733",
            provinces: ["ARA", "ARY", "ART"],
            description: "Salta, Jujuy, Tucumán"
        },
        {
            id: "noreste",
            name: t("regions.nore"),
            color: "#1e6f2fff",
            provinces: ["ARH", "ARP", "ARW", "ARN"],
            description: "Chaco, Formosa, Corrientes, Misiones"
        },
        {
            id: "litoral",
            name: t("regions.lito"),
            color: "#40d25dff",
            provinces: ["ARS", "ARE"],
            description: "Santa Fe, Entre Ríos"
        },
        {
            id: "centro",
            name: t("regions.center"),
            color: "#fcb040",
            provinces: ["ARK", "ARF", "ARG", "ARX"],
            description: "Catamarca, La Rioja, Santiago del Estero, Córdoba"
        },
        {
            id: "cuyo",
            name: t("regions.cuyo"),
            color: "#bd634fff",
            provinces: ["ARD", "ARJ", "ARM"],
            description: "San Luis, San Juan, Mendoza"
        },
        {
            id: "buenos-aires-cerca",
            name: t("regions.buenos-aires-cerca"),
            color: "#222073ff",
            provinces: ["ARC"],
            description: "Ciudad de Buenos Aires"
        },
        {
            id: "buenos-aires-lejos",
            name: t("regions.buenos-aires-lejos"),
            color: "#4972b2",
            provinces: ["ARB"],
            description: "Provincia de Buenos Aires"
        },
        {
            id: "sur",
            name: t("regions.south"),
            color: "#7b5ba1",
            provinces: ["ARL", "ARQ", "ARR", "ARU"],
            description: "La Pampa, Neuquén, Río Negro, Chubut"
        },
        {
            id: "austral",
            name: t("regions.austral"),
            color: "#49a6a6",
            provinces: ["ARZ", "ARV"],
            description: "Santa Cruz, Tierra del Fuego"
        }
    ];

    const [activeRegion, setActiveRegion] = React.useState<Region | null>(null);

    const [regionTooltip, setRegionTooltip] = React.useState<RegionTooltip>({
        region: null,
        x: 0,
        y: 0,
        visible: false
    });

    const mapContainerRef = React.useRef<HTMLDivElement | null>(null);

    const findRegionByProvince = (provinceId: string): Region | null => {
        return regions.find(region => region.provinces.includes(provinceId)) || null;
    };

    // Función para convertir color hexadecimal a RGBA con opacidad
    const hexToRgba = (hex: string, opacity: number): string => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const getRandomPositionNearRegion = (region: Region) => {
        const validElements: SVGGraphicsElement[] = [];

        region.provinces.forEach(provinceId => {
            const element = document.getElementById(provinceId);
            if (element && typeof (element as any).getBBox === 'function') {
                validElements.push(element as any as SVGGraphicsElement);
            }
        });

        if (validElements.length === 0) return { x: 400, y: 500 };

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        validElements.forEach(el => {
            const bbox = el.getBBox();
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
        });

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        const randomOffsetX = (Math.random() - 0.5) * 80;
        const randomOffsetY = (Math.random() - 0.5) * 80;

        return {
            x: centerX + randomOffsetX,
            y: centerY + randomOffsetY
        };
    };

    // Función para asegurar que el tooltip de región esté dentro del contenedor
    const ensureTooltipInViewport = (x: number, y: number, width: number = 250, height: number = 120) => {
        if (!mapContainerRef.current) return { x, y };

        const containerRect = mapContainerRef.current.getBoundingClientRect();
        let newX = x;
        let newY = y;
        if (newX - width / 2 < 0) {
            newX = width / 2 + 10;
        } else if (newX + width / 2 > containerRect.width) {
            newX = containerRect.width - width / 2 - 10;
        }

        // Ajustar posición vertical (tanto superior como inferior)
        if (newY - height < 0) {
            newY = height + 10; // Evita que se corte por arriba
        } else if (newY + height > containerRect.height) {
            newY = containerRect.height - height - 10; // Evita que se corte por abajo
        }

        return { x: newX, y: newY };
    };

    React.useEffect(() => {
        const addHoverListeners = () => {
            // Colorear provincias
            regions.forEach(region => {
                region.provinces.forEach(provinceId => {
                    const element = document.getElementById(provinceId);
                    if (element) {
                        const opacity = isMobile ? 1 : 0.6;
                        element.style.fill = hexToRgba(region.color, opacity);
                        element.style.transition = 'fill 0.3s ease';
                        element.style.cursor = 'pointer';
                    }
                });
            });

            // Agregar event listeners para hover (solo desktop)
            if (!isMobile) {
                regions.forEach(region => {
                    region.provinces.forEach(provinceId => {
                        const element = document.getElementById(provinceId);
                        if (element) {
                            // Mouse over - resaltar región
                            element.addEventListener('mouseover', () => {
                                const region = findRegionByProvince(provinceId);
                                if (region) {
                                    setActiveRegion(region);

                                    // Resaltar todas las provincias de la región
                                    region.provinces.forEach(provId => {
                                        const provElement = document.getElementById(provId);
                                        if (provElement) {
                                            provElement.style.fill = region.color;
                                        }
                                    });

                                    // Mostrar tooltip de región en posición ajustada
                                    const position = getRandomPositionNearRegion(region);
                                    const adjustedPosition = ensureTooltipInViewport(position.x, position.y);

                                    setRegionTooltip({
                                        region,
                                        x: adjustedPosition.x,
                                        y: adjustedPosition.y,
                                        visible: true
                                    });
                                }
                            });

                            // Mouse out - restaurar colores
                            element.addEventListener('mouseout', () => {
                                setActiveRegion(null);
                                setRegionTooltip(prev => ({ ...prev, visible: false }));

                                regions.forEach(r => {
                                    r.provinces.forEach(provId => {
                                        const provElement = document.getElementById(provId);
                                        if (provElement) {
                                            provElement.style.fill = hexToRgba(r.color, 0.6);
                                        }
                                    });
                                });
                            });
                        }
                    });
                });
            }
        };

        const timer = setTimeout(addHoverListeners, 100);

        return () => {
            clearTimeout(timer);
            regions.forEach(region => {
                region.provinces.forEach(provinceId => {
                    const element = document.getElementById(provinceId);
                    if (element) {
                        element.replaceWith(element.cloneNode(true));
                    }
                });
            });
        };
    }, [isMobile]);

    const zoomInVariants: Variants = {
        offscreen: {
            scale: 0.8,
            opacity: 0
        },
        onscreen: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            }
        }
    };

    // Determinar qué imagen de mapa mostrar según el idioma
    const mapImage = i18n.language === 'es' ? mapARes : mapARen;

    return (
        <>
            <JumbotronComponent
                title={t("regions.title")}
                subtitle={t("regions.subtitle")}
                background={regionsBG}
                overlay={true}
                titleColor="#ffffff"
                subtitleColor="#f0f0f0"
            />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <CardDashboardComponent>
                    <Grid container spacing={3}>
                        {/* Mapa */}
                        <Grid size={{ xs: 12, md: 8 }} >
                            <motion.div
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={zoomInVariants}
                            >
                                <Box
                                    ref={mapContainerRef}
                                    sx={{
                                        position: 'relative',
                                        borderRadius: 1,
                                        overflow: 'visible',
                                        minHeight: isMobile ? '400px' : '500px'
                                    }}
                                >
                                    {!isMobile && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                left: 10,
                                                zIndex: 1000,
                                                maxWidth: 200
                                            }}
                                        >
                                            <Card
                                                sx={{
                                                    p: 1.5,
                                                    backdropFilter: 'blur(4px)',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 'medium',
                                                        color: 'text.primary',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {t("regions.messages")}
                                                </Typography>
                                            </Card>
                                        </Box>
                                    )}

                                    {/* Mostrar componente interactivo en desktop, imagen en mobile */}
                                    {!isMobile ? (
                                        <ARMapComponent
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    ) : (
                                        <Box
                                            component="img"
                                            src={mapImage}
                                            alt="Mapa de Argentina"
                                            sx={{ width: '100%', height: 'auto' }}
                                        />
                                    )}

                                    {!isMobile && regionTooltip.visible && regionTooltip.region && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                left: regionTooltip.x,
                                                top: regionTooltip.y,
                                                transform: 'translate(-50%, -100%)',
                                                bgcolor: 'background.paper',
                                                color: 'text.primary',
                                                p: 2,
                                                borderRadius: 2,
                                                boxShadow: 4,
                                                maxWidth: 280,
                                                minWidth: 200,
                                                pointerEvents: 'none',
                                                zIndex: 1001,
                                                borderLeft: `4px solid ${regionTooltip.region.color}`,
                                                transition: 'all 0.3s ease',
                                                '&::after': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    bottom: '-8px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: '16px',
                                                    height: '16px',
                                                    bgcolor: 'background.paper',
                                                    zIndex: -1
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                sx={{
                                                    color: regionTooltip.region.color,
                                                    fontSize: '15px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {regionTooltip.region.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '13px', lineHeight: 1.4 }}>
                                                {regionTooltip.region.description}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </motion.div>
                        </Grid>

                        {/* Panel lateral - Ocultar en mobile */}
                        {!isMobile && (
                            <Grid size={{ xs: 12, md: 4 }}>
                                <motion.div
                                    initial="offscreen"
                                    whileInView="onscreen"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={zoomInVariants}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {/* Leyenda de regiones */}
                                        <Card sx={{ p: 2 }}>
                                            <HeaderComponent
                                                title={t("regions.legend")}
                                                titleVariant='h2'
                                                align="left"
                                            />
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                {regions.map(region => (
                                                    <Box
                                                        key={region.id}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            p: 1,
                                                            borderRadius: 1,
                                                            backgroundColor: activeRegion?.id === region.id ? 'action.hover' : 'transparent',
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                backgroundColor: region.color,
                                                                mr: 1.5,
                                                                borderRadius: 0.5,
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                        <Typography variant="body2">
                                                            {region.name}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Card>

                                        {/* Información de región activa (solo mobile) */}
                                        {isMobile && activeRegion && (
                                            <Card
                                                sx={{
                                                    p: 2,
                                                    backgroundColor: 'background.default',
                                                    borderLeft: `4px solid ${activeRegion.color}`,
                                                    borderRadius: 1
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{ color: activeRegion.color }}
                                                >
                                                    {activeRegion.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {activeRegion.description}
                                                </Typography>
                                            </Card>
                                        )}
                                    </Box>
                                </motion.div>
                            </Grid>
                        )}
                    </Grid>
                </CardDashboardComponent>
                <CardDashboardComponent>
                    <BossesCardsComponent />
                </CardDashboardComponent>
            </Container>
        </>
    );
};

export default RegionsPage;