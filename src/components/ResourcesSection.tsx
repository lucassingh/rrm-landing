import React, { useState } from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    useTheme,
    alpha,
    Container
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Launch as LaunchIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ResourceItem {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string;
}

export const ResourcesSection: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const resources: ResourceItem[] = [
        {
            id: 'missionary-resources',
            title: t('resources.resourcesList.missionaryResources.title'),
            description: t('resources.resourcesList.missionaryResources.description'),
            url: 'http://www.recursosmisioneros.com/',
            category: 'education'
        },
        {
            id: 'muslim-world',
            title: t('resources.resourcesList.muslimWorld.title'),
            description: t('resources.resourcesList.muslimWorld.description'),
            url: 'https://musulmania.com/',
            category: 'specialized'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as any
            }
        }
    };

    const handleResourceClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.primary.main, 0.03)} 0%, 
                    ${alpha(theme.palette.background.paper, 1)} 50%,
                    ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Elementos decorativos sutiles */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    right: -100,
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                    zIndex: 0
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -50,
                    left: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 70%)`,
                    zIndex: 0
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants}>
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                {t('resources.title')}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="p"
                                sx={{
                                    color: 'text.secondary',
                                    maxWidth: 600,
                                    mx: 'auto',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '1rem', md: '1.2rem' }
                                }}
                            >
                                {t('resources.subtitle')}
                            </Typography>
                        </Box>
                    </motion.div>

                    {/* Acordeón de recursos */}
                    <motion.div variants={itemVariants}>
                        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                            {resources.map((resource) => (
                                <Accordion
                                    key={resource.id}
                                    expanded={expanded === resource.id}
                                    onChange={handleChange(resource.id)}
                                    sx={{
                                        mb: 2,
                                        borderRadius: '12px !important',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                        transition: 'all 0.3s ease',
                                        '&:before': { display: 'none' },
                                        '&:hover': {
                                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                            transform: 'translateY(-2px)'
                                        },
                                        '&.Mui-expanded': {
                                            margin: '16px 0',
                                            boxShadow: '0 8px 40px rgba(0,0,0,0.15)'
                                        }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <motion.div
                                                animate={{ rotate: expanded === resource.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ExpandMoreIcon
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: '1.8rem'
                                                    }}
                                                />
                                            </motion.div>
                                        }
                                        sx={{
                                            minHeight: 80,
                                            padding: '0 24px',
                                            '& .MuiAccordionSummary-content': {
                                                alignItems: 'center',
                                                gap: 2
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 40,
                                                borderRadius: 4,
                                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                flexShrink: 0
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'text.primary',
                                                    fontSize: { xs: '1.1rem', md: '1.3rem' }
                                                }}
                                            >
                                                {resource.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    mt: 0.5
                                                }}
                                            >
                                                {t('resources.discover')}
                                            </Typography>
                                        </Box>
                                    </AccordionSummary>

                                    <AccordionDetails
                                        sx={{
                                            padding: '24px 24px 24px 70px',
                                            background: alpha(theme.palette.primary.main, 0.02)
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'text.primary',
                                                lineHeight: 1.7,
                                                mb: 3
                                            }}
                                        >
                                            {resource.description}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            endIcon={<LaunchIcon />}
                                            onClick={() => handleResourceClick(resource.url)}
                                            sx={{
                                                background: theme.palette.primary.main,
                                                borderRadius: '30px',
                                                px: 3,
                                                py: 1,
                                                fontWeight: 'bold',
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                                '&:hover': {
                                                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                                                    transform: 'translateY(-2px)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {t('resources.visitWebsite')}
                                        </Button>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </motion.div>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ResourcesSection;