"use client";

import React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { ForumCardComponent } from './ForumCardComponent';
import type { Forum } from '@/interfaces/forum';

interface ForumCardsGridComponentProps {
    forums: Forum[];
}

export const ForumCardsGridComponent: React.FC<ForumCardsGridComponentProps> = ({ forums }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                {forums.map((forum) => (
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        key={forum.id}
                        sx={{
                            display: 'flex',
                            minHeight: 'auto',
                            '& > *': {
                                width: '100%'
                            }
                        }}
                    >
                        <ForumCardComponent forum={forum} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
