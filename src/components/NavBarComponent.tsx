import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    Box,
    useMediaQuery,
    useTheme,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    alpha,
    styled
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useThemeContext } from '../context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import resources from '../assets/navbar/resources.jpg';
import regions from '../assets/navbar/regions.jpg';
import news from '../assets/navbar/news.jpg';
import contact from '../assets/navbar/contact.jpg';

interface MenuItem {
    titleKey: string;
    descriptionKey: string;
    path: string;
    image: string;
}

export const NavBarComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [hoveredLink, setHoveredLink] = useState<number | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const { mode, toggleTheme } = useThemeContext();
    const { language, toggleLanguage } = useLanguageContext();
    const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    const mainMenuItems: MenuItem[] = [
        {
            titleKey: 'navbar.news',
            path: '/news',
            descriptionKey: 'navbar.newsDescription',
            image: news
        },
        {
            titleKey: 'navbar.regions',
            path: '/regions',
            descriptionKey: 'navbar.regionsDescription',
            image: regions
        },
        {
            titleKey: 'navbar.resources',
            path: '/resources',
            descriptionKey: 'navbar.resourcesDescription',
            image: resources
        },
        {
            titleKey: 'navbar.contact',
            path: '/contact',
            descriptionKey: 'navbar.contactDescription',
            image: contact
        }
    ];

    // Precargar imágenes
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = mainMenuItems.map(item => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = item.image;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            });

            try {
                await Promise.all(imagePromises);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error loading images:', error);
                setImagesLoaded(true); // Continuar aunque falle la carga
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuHover = (isHovering: boolean) => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
            menuTimeoutRef.current = null;
        }

        if (isHovering) {
            setIsMenuOpen(true);
        } else {
            menuTimeoutRef.current = setTimeout(() => {
                setIsMenuOpen(false);
                setHoveredItem(null);
                setHoveredLink(null);
            }, 300);
        }
    };

    const handleCardHover = (index: number | null) => {
        setHoveredItem(index);
    };

    const handleLinkHover = (index: number | null) => {
        setHoveredLink(index);
        setHoveredItem(index);
    };

    const handleLinkClick = (path: string) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    const getNavbarBackgroundColor = () => {
        if (mode === 'dark') {
            return theme.palette.primary.main;
        }
        return scrolled ? alpha(theme.palette.background.paper, 0.9) : theme.palette.background.paper;
    };

    const getNavbarTextColor = () => {
        if (mode === 'dark') {
            return theme.palette.primary.contrastText;
        }
        return theme.palette.text.primary;
    };

    const getLinkOpacity = (index: number) => {
        if (hoveredLink === null) return 1;
        return hoveredLink === index ? 1 : 0.6;
    };

    const CustomCard = styled(Card)(({ theme }) => ({
        width: '100%',
        borderRadius: theme.spacing(1),
        padding: '0px !important',
        transition: 'all 0.3s ease',
        '& .MuiCardContent-root': {
            padding: '10px',
            '&:last-child': {
                paddingBottom: '10px'
            }
        },
        '& .MuiCardActionArea-root': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        '& .MuiCardMedia-root': {
            width: '100%',
            flexShrink: 0
        }
    }));

    const { t } = useTranslation();

    const desktopNavbar = (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    mt: 3.125,
                    transition: 'all 0.3s ease',
                    width: '100%',
                    maxWidth: '1200px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <Toolbar
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 3,
                    }}
                >
                    {/* Links izquierda - Ahora con navegación al hacer clic */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flex: 1,
                            marginLeft: '21px',
                            justifyContent: 'flex-start'
                        }}
                        onMouseEnter={() => handleMenuHover(true)}
                        onMouseLeave={() => handleMenuHover(false)}
                    >
                        {mainMenuItems.map((item, index) => (
                            <Button
                                key={item.titleKey}
                                sx={{
                                    color: getNavbarTextColor(),
                                    borderRadius: 10,
                                    px: 2,
                                    py: 1,
                                    backgroundColor: 'transparent',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    opacity: getLinkOpacity(index),
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: '50%',
                                        width: hoveredLink === index ? '80%' : '0%',
                                        height: '2px',
                                        backgroundColor: mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.main,
                                        transition: 'all 0.3s ease',
                                        transform: 'translateX(-50%)',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        opacity: 1,
                                        '&::before': {
                                            width: '80%',
                                        },
                                    }
                                }}
                                onMouseEnter={() => handleLinkHover(index)}
                                onMouseLeave={() => {
                                    setHoveredLink(null);
                                    setHoveredItem(null);
                                }}
                                onClick={() => handleLinkClick(item.path)}
                            >
                                {t(item.titleKey)}
                            </Button>
                        ))}
                    </Box>

                    {/* Logo central */}
                    <Box
                        component={RouterLink}
                        to="/"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            textDecoration: 'none'
                        }}
                    >
                        <Typography variant="h2" fontSize='45px' fontStyle="italic" color={mode === 'dark' ? theme.palette.secondary.contrastText : theme.palette.primary.main}>RMM</Typography>
                    </Box>

                    {/* Botones derecha */}
                    <Box sx={{ display: 'flex', gap: 1, flex: 1, justifyContent: 'flex-end', marginRight: '15px' }}>
                        <Button
                            onClick={toggleTheme}
                            sx={{
                                color: mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.contrastText,
                                borderRadius: '60px',
                                minWidth: 'auto',
                                width: 120,
                                height: 40,
                                backgroundColor: mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.main,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: mode === 'dark'
                                        ? alpha(theme.palette.primary.contrastText, 0.8)
                                        : alpha(theme.palette.primary.main, 0.7),
                                }
                            }}
                        >
                            {mode === 'dark' ? t('navbar.lightMode') : t('navbar.darkMode')}
                        </Button>
                        <Button
                            onClick={toggleLanguage}
                            sx={{
                                color: mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.contrastText,
                                borderRadius: '60px',
                                minWidth: 'auto',
                                width: 120,
                                height: 40,
                                backgroundColor: mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.main,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: mode === 'dark'
                                        ? alpha(theme.palette.primary.contrastText, 0.8)
                                        : alpha(theme.palette.primary.main, 0.7),
                                }
                            }}
                        >
                            {language === 'es' ? t('navbar.english') : t('navbar.spanish')}
                        </Button>
                    </Box>
                </Toolbar>

                {/* Navbar background flotante */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '95%',
                        height: '100%',
                        backgroundColor: getNavbarBackgroundColor(),
                        borderRadius: 10,
                        boxShadow: scrolled ? 3 : 2,
                        zIndex: -1,
                        transition: 'all 0.3s ease'
                    }}
                />

                {/* Menú desplegable con transición suavizada */}
                <Box
                    sx={{
                        position: 'absolute',
                        backgroundColor: theme.palette.background.paper,
                        padding: 2,
                        borderRadius: 3,
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '95%',
                        mt: 1.875,
                        zIndex: 1300,
                        opacity: isMenuOpen && imagesLoaded ? 1 : 0,
                        visibility: isMenuOpen && imagesLoaded ? 'visible' : 'hidden',
                        transition: 'opacity 0.3s ease, visibility 0.3s ease',
                        boxShadow: 3,
                    }}
                    onMouseEnter={() => handleMenuHover(true)}
                    onMouseLeave={() => handleMenuHover(false)}
                >
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            width: '100%'
                        }}
                    >
                        {mainMenuItems.map((item, index) => (
                            <Grid
                                key={index}
                                sx={{
                                    display: 'flex',
                                    minWidth: 0
                                }}
                                onMouseEnter={() => handleCardHover(index)}
                                onMouseLeave={() => handleCardHover(null)}
                            >
                                <CustomCard
                                    sx={{
                                        opacity: hoveredItem !== null && hoveredItem !== index ? 0.7 : 1,
                                        transition: 'opacity 0.5s ease-in-out, transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4,
                                            opacity: 1
                                        }
                                    }}
                                >
                                    <CardActionArea
                                        component={RouterLink}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        sx={{
                                            padding: 0,
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item.image}
                                            alt={t(item.titleKey)}
                                            sx={{
                                                width: '100%',
                                                objectFit: 'cover',
                                                display: 'block',
                                                transition: 'opacity 0.3s ease',
                                                opacity: imagesLoaded ? 1 : 0
                                            }}
                                        />
                                        <CardContent sx={{
                                            padding: '10px',
                                            '&:last-child': {
                                                paddingBottom: '10px'
                                            }
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {t(item.titleKey)}
                                                </Typography>
                                                <ArrowForwardIcon fontSize="small" />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {t(item.descriptionKey)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </CustomCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </AppBar>
        </Box>
    );

    // Navbar para móvil con internacionalización
    const mobileNavbar = (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: mode === 'dark' ? theme.palette.primary.main : theme.palette.background.paper,
                boxShadow: theme.shadows[4],
            }}
        >
            <Box sx={{ px: 2 }}>
                <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
                    <Box
                        component={RouterLink}
                        to="/"
                        sx={{ textDecoration: 'none' }}
                    >
                        <Typography sx={{ marginTop: '8px' }} variant="h2" fontSize='45px' fontStyle="italic" color={mode === 'dark' ? theme.palette.secondary.contrastText : theme.palette.primary.main}>RMM</Typography>
                    </Box>

                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            backgroundColor: mode === 'dark' ? theme.palette.primary.contrastText : '#fff',
                            color: mode === 'dark' ? theme.palette.primary.main : 'inherit',
                            '&:hover': {
                                backgroundColor: mode === 'dark'
                                    ? alpha(theme.palette.primary.contrastText, 0.8)
                                    : alpha('#fff', 0.8),
                            }
                        }}
                    >
                        <MenuIcon sx={{ color: mode === 'dark' ? theme.palette.primary.main : theme.palette.text.primary }} />
                    </IconButton>
                </Toolbar>
            </Box>

            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '100%',
                        backgroundColor: theme.palette.background.default
                    },
                }}
            >
                <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h2" fontSize='45px' fontStyle="italic" color={mode === 'dark' ? theme.palette.secondary.contrastText : theme.palette.primary.main}>RMM</Typography>

                        <IconButton onClick={handleDrawerToggle}>
                            <CloseIcon />
                            <Typography variant="body1" sx={{ ml: 1 }}>
                                {t('navbar.close')}
                            </Typography>
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <List sx={{ flexGrow: 1 }}>
                        {mainMenuItems.map((item, index) => (
                            <Box key={index}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={RouterLink}
                                        to={item.path}
                                        onClick={handleDrawerToggle}
                                        sx={{ py: 2 }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 50 }}>
                                            <Box
                                                component="img"
                                                src={item.image}
                                                alt={t(item.titleKey)}
                                                sx={{ width: 40, height: 40, borderRadius: 1.5 }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={t(item.titleKey)}
                                            secondary={t(item.descriptionKey)}
                                            primaryTypographyProps={{ fontWeight: 'bold' }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {/* Divider de 1px entre cada item */}
                                {index < mainMenuItems.length - 1 && (
                                    <Divider
                                        sx={{
                                            mx: 2,
                                            backgroundColor: mode === 'dark'
                                                ? alpha(theme.palette.primary.contrastText, 0.2)
                                                : alpha(theme.palette.text.primary, 0.2),
                                            height: '1px'
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', py: 2 }}>
                        <Button
                            onClick={toggleLanguage}
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 10, py: 1.5 }}
                        >
                            {language === 'es' ? t('navbar.spanish') : t('navbar.english')}
                        </Button>
                        <Button
                            onClick={toggleTheme}
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 10, py: 1.5 }}
                        >
                            {mode === 'dark' ? t('navbar.lightMode') : t('navbar.darkMode')}
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </AppBar>
    );

    return isMobile ? mobileNavbar : desktopNavbar;
};