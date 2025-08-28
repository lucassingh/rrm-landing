import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Link,
    Chip,
    useTheme,
    alpha
} from "@mui/material";
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

// Importar componentes de mapas
import { NOMapComponent } from "./regions/NOMapComponent";
import { NEMapComponent } from "./regions/NEMapComponent";
import { CEMapComponent } from "./regions/CEMapComponent";
import { LIMapComponent } from "./regions/LIMapComponent";
import { CUMapComponent } from "./regions/CUMapComponent";
import { BSCMapComponent } from "./regions/BSCMapComponent";
import { BSLMapComponent } from "./regions/BSLMapComponent";
import { SUMapComponent } from "./regions/SUMapComponent";

// imgs avatars
import img1 from '../assets/bosses/img1.png';
import img2 from '../assets/bosses/img2.png';
import img3 from '../assets/bosses/img3.png';
import img4 from '../assets/bosses/img4.png';
import img5 from '../assets/bosses/img5.png';
import img6 from '../assets/bosses/img6.png';
import img7 from '../assets/bosses/img7.png';
import img8 from '../assets/bosses/img8.png';
import img9 from '../assets/bosses/img9.png';
import HeaderComponent from "./HeaderComponent";

// Definición de interfaces
interface Boss {
    id: number;
    nameRegion: string;
    provinces: string[];
    nameBoss: string;
    telephone: string;
    email: string;
    imgAvatar: string;
    regionMap: React.ReactNode;
}

interface BossCardProps {
    boss: Boss;
    provinceNames: Record<string, string>;
}

const regionColors: Record<string, string> = {
    "Región Noroeste": "#FF5733",
    "Región Noreste": "#1e6f2fff",
    "Región Litoral": "#40d25dff",
    "Región Centro": "#fcb040",
    "Región Cuyo": "#bd634fff",
    "Región Bs. As. (hasta 100 km)": "#222073ff",
    "Región Bs. As. (más de 100 km)": "#4972b2",
    "Región Sur (General Roca)": "#7b5ba1",
    "Región Sur (Neuquén)": "#7b5ba1",
    "Región Austral": "#49a6a6"
};

export const BossCard: React.FC<BossCardProps> = ({ boss, provinceNames }) => {

    const theme = useTheme();

    const { t } = useTranslation();

    const regionColor = regionColors[boss.nameRegion] || theme.palette.primary.main;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                padding: '0 !important',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                },
                borderLeft: `6px solid ${regionColor}`,
                border: `1px solid ${alpha(regionColor, 0.3)}`,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${alpha(regionColor, 0.8)}, ${alpha(regionColor, 0.2)})`,
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1, minWidth: 0, padding: '0 !important' }}>
                {/* Encabezado con avatar y nombre - MEJORADO */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        p: 1.5,
                        borderRadius: 1,
                        backgroundColor: alpha(regionColor, 0.05),
                        border: `1px solid ${alpha(regionColor, 0.1)}`,
                    }}
                >
                    <Avatar
                        src={boss.imgAvatar}
                        sx={{
                            width: 64,
                            height: 64,
                            mr: 2,
                            border: `3px solid ${alpha(regionColor, 0.3)}`,
                            boxShadow: `0 0 0 3px ${alpha(regionColor, 0.1)}`,
                            backgroundColor: alpha(regionColor, 0.2),
                        }}
                    >
                        {boss.nameBoss.charAt(0)}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            component="h3"
                            fontWeight="bold"
                            noWrap
                            sx={{
                                color: regionColor,
                                fontSize: '1.1rem',
                                textShadow: `0 1px 1px ${alpha(regionColor, 0.2)}`,
                            }}
                        >
                            {boss.nameBoss}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mt: 0.5,
                                fontWeight: 'medium',
                                fontSize: '13px',
                                color: 'text.primary',
                            }}
                            noWrap
                        >
                            <LocationIcon sx={{ fontSize: 14, mr: 0.5, color: regionColor }} />
                            {boss.nameRegion}
                        </Typography>
                    </Box>
                </Box>

                {/* Sección de mapa y provincias */}
                <Box padding={1}>
                    <Box
                        sx={{
                            mb: 2,
                            border: `1px solid ${alpha(regionColor, 0.3)}`,
                            borderRadius: 1.5,
                            backgroundColor: alpha(regionColor, 0.03),
                            overflow: 'hidden'
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontWeight="medium"
                            sx={{
                                px: 1,
                                py: 0.75,
                                borderBottom: `1px solid ${alpha(regionColor, 0.1)}`,
                                backgroundColor: alpha(regionColor, 0.05),
                                fontSize: '0.8rem'
                            }}
                        >
                            {t("regions.provinces")}
                        </Typography>

                        {/* Mapa SVG */}
                        <Box
                            sx={{
                                height: 120,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 0.5
                            }}
                        >
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '& svg': {
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    width: 'auto',
                                    height: 'auto'
                                }
                            }}>
                                {boss.regionMap}
                            </Box>
                        </Box>

                        {/* Chips de provincias */}
                        <Box
                            sx={{
                                px: 1,
                                py: 1,
                                borderTop: `1px solid ${alpha(regionColor, 0.1)}`,
                                backgroundColor: alpha(regionColor, 0.02)
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                                justifyContent: 'center'
                            }}>
                                {boss.provinces.map(province => (
                                    <Chip
                                        key={province}
                                        label={provinceNames[province] || province}
                                        size="small"
                                        sx={{
                                            backgroundColor: alpha(regionColor, 0.1),
                                            color: regionColor,
                                            fontWeight: 'medium',
                                            fontSize: '0.65rem',
                                            height: 24,
                                            border: `1px solid ${alpha(regionColor, 0.2)}`
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Información de contacto - MEJORADO */}
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        backgroundColor: alpha(regionColor, 0.03),
                        border: `1px solid ${alpha(regionColor, 0.1)}`,
                    }}
                >
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            fontSize: '0.9rem',
                            color: regionColor,
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1.5
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                backgroundColor: regionColor,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1,
                                color: 'white',
                                fontSize: '0.7rem'
                            }}
                        >
                            ✓
                        </Box>
                        {t("regions.contact")}
                    </Typography>

                    {/* Teléfono */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1.5,
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: alpha(regionColor, 0.05),
                            transition: 'background-color 0.2s',
                            '&:hover': {
                                backgroundColor: alpha(regionColor, 0.1),
                            }
                        }}
                    >
                        <Box
                            sx={{
                                p: 0.75,
                                borderRadius: '50%',
                                backgroundColor: alpha(regionColor, 0.2),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1.5,
                                color: regionColor,
                            }}
                        >
                            <PhoneIcon sx={{ fontSize: 16 }} />
                        </Box>
                        <Link
                            href={`https://wa.me/${boss.telephone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener"
                            sx={{
                                textDecoration: 'none',
                                flex: 1,
                                minWidth: 0,
                                fontWeight: 'medium',
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="primary"
                                noWrap
                                sx={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {boss.telephone}
                            </Typography>
                        </Link>
                    </Box>

                    {/* Email */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: alpha(regionColor, 0.05),
                            transition: 'background-color 0.2s',
                            '&:hover': {
                                backgroundColor: alpha(regionColor, 0.1),
                            }
                        }}
                    >
                        <Box
                            sx={{
                                p: 0.75,
                                borderRadius: '50%',
                                backgroundColor: alpha(regionColor, 0.2),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1.5,
                                color: regionColor,
                            }}
                        >
                            <EmailIcon sx={{ fontSize: 16 }} />
                        </Box>
                        <Link
                            href={`mailto:${boss.email}`}
                            sx={{
                                textDecoration: 'none',
                                flex: 1,
                                minWidth: 0,
                                fontWeight: 'medium',
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="primary"
                                noWrap
                                sx={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {boss.email}
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

const BossesCardsComponent: React.FC = () => {

    const { t } = useTranslation();

    const provinceNames: Record<string, string> = {
        "ARE": "Entre Ríos",
        "ARA": "Salta",
        "ARY": "Jujuy",
        "ARP": "Formosa",
        "ARN": "Misiones",
        "ARH": "Chaco",
        "ARW": "Corrientes",
        "ARK": "Catamarca",
        "ARF": "La Rioja",
        "ARJ": "San Juan",
        "ARM": "Mendoza",
        "ARQ": "Neuquén",
        "ARU": "Chubut",
        "ARR": "Río Negro",
        "ARZ": "Santa Cruz",
        "ARV": "Tierra del Fuego",
        "ARB": "Buenos Aires",
        "ARC": "Ciudad de Buenos Aires",
        "ARS": "Santa Fe",
        "ART": "Tucumán",
        "ARG": "Santiago del Est.",
        "ARD": "San Luis",
        "ARL": "La Pampa",
        "ARX": "Córdoba"
    };

    const bosses: Boss[] = [
        {
            id: 1,
            nameRegion: t("regions.cardBossesRegions.noro"),
            provinces: ["ARA", "ARY", "ART"],
            nameBoss: "Daniel González",
            telephone: "+54 9 387 5950324",
            email: "noa@redmisionesmundiales.org",
            imgAvatar: img1,
            regionMap: <NOMapComponent />
        },
        {
            id: 2,
            nameRegion: t("regions.cardBossesRegions.nore"),
            provinces: ["ARH", "ARP", "ARW", "ARN"],
            nameBoss: "María del Carmen Tejerina",
            telephone: "+54 9 376 460 9453",
            email: "nea@redmisionesmundiales.org",
            imgAvatar: img2,
            regionMap: <NEMapComponent />
        },
        {
            id: 3,
            nameRegion: t("regions.cardBossesRegions.center"),
            provinces: ["ARK", "ARF", "ARG", "ARX"],
            nameBoss: "Jorge Hang",
            telephone: "+54 9 351 2664660",
            email: "jorge@redmisionesmundiales.org",
            imgAvatar: img3,
            regionMap: <CEMapComponent />
        },
        {
            id: 4,
            nameRegion: t("regions.cardBossesRegions.lito"),
            provinces: ["ARS", "ARE"],
            nameBoss: "Pablo Lucas Andrada",
            telephone: "+54 9 351 2664660",
            email: "litoral@redmisionesmundiales.org",
            imgAvatar: img4,
            regionMap: <LIMapComponent />
        },
        {
            id: 5,
            nameRegion: t("regions.cardBossesRegions.cuyo"),
            provinces: ["ARD", "ARJ", "ARM"],
            nameBoss: "Martín Poblete",
            telephone: "+54 9 261 596 0463",
            email: "cuyo@redmisionesmundiales.org",
            imgAvatar: img5,
            regionMap: <CUMapComponent />
        },
        {
            id: 6,
            nameRegion: t("regions.cardBossesRegions.buenos-aires-cerca"),
            provinces: ["ARC"],
            nameBoss: "Daniel Russo",
            telephone: "+54 9 11 32119184",
            email: "region1@redmisionesmundiales.org",
            imgAvatar: img6,
            regionMap: <BSCMapComponent />
        },
        {
            id: 7,
            nameRegion: t("regions.cardBossesRegions.buenos-aires-lejos"),
            provinces: ["ARB"],
            nameBoss: "Daniela Merino",
            telephone: "+54 9 223 6911297",
            email: "bsas@redmisionesmundiales.org",
            imgAvatar: img7,
            regionMap: <BSLMapComponent />
        },
        {
            id: 8,
            nameRegion: t("regions.cardBossesRegions.south"),
            provinces: ["ARL", "ARQ", "ARR", "ARU"],
            nameBoss: "Evangelina Salazar",
            telephone: "+54 9 2984572821",
            email: "sur@redmisionesmundiales.org",
            imgAvatar: img8,
            regionMap: <SUMapComponent />
        },
        {
            id: 9,
            nameRegion: t("regions.cardBossesRegions.south2"),
            provinces: ["ARL", "ARQ", "ARR", "ARU"],
            nameBoss: "Gustavo Marcel",
            telephone: "+54 9 299 5065096",
            email: "neuquen@redmisionesmundiales.org",
            imgAvatar: img9,
            regionMap: <SUMapComponent />
        }
    ];

    return (
        <Box sx={{ px: { xs: 2, sm: 3 } }}>
            <HeaderComponent
                title="Encargados Regionales"
                titleVariant='h2'
                align="left"
                spacing={6}
                subtitle="Contactate con el encargado regional de tu provincia"
            />
            <Grid container rowSpacing={2} columnSpacing={2}>
                {bosses.map(boss => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={boss.id}
                        sx={{
                            display: 'flex',
                            minHeight: 400,
                        }}
                    >
                        <Box sx={{ width: '100%' }}>
                            <BossCard boss={boss} provinceNames={provinceNames} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BossesCardsComponent;