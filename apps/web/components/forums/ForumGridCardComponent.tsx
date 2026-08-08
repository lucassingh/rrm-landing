"use client";

import React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { ForumCardComponent } from './ForumCardComponent';
import type { ForumCard } from '@/interfaces/forum';

interface ForumCardsGridComponentProps {
    cards: ForumCard[];
}

export const ForumCardsGridComponent: React.FC<ForumCardsGridComponentProps> = ({ cards }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        key={card.id}
                        sx={{
                            display: 'flex',
                            minHeight: 'auto',
                            '& > *': {
                                width: '100%'
                            }
                        }}
                    >
                        <ForumCardComponent card={card} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
