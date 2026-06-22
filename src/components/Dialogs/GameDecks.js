import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, Dialog, DialogTitle, Button, ButtonBase, Divider } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AddIcon from '@mui/icons-material/Add';


import CardList from '../../components/Lists/CardList';
import { CardDrag } from '../../components/Cards/Card';
import { CardSlot } from '../../components/Cards/CardSlot';

import DeckBuilder from '../../components/Dialogs/DeckBuilder';
import DeckComponent from '../../components/Cards/DeckComponent';

function GameDecks({ slotArray, slotIndex, setSlotIndex, setDialogOpen }) {

    const theme = useTheme();


    const ImageButton = styled(ButtonBase)(({ theme }) => ({ // courtesy material UI
        position: 'relative',

        //width: 300,
        width: '75%',
        height: 150,
        // [theme.breakpoints.down('sm')]: {
        //   width: '100% !important', // Overrides inline-style
        //   height: 100,
        // },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    return (

        <>
            {
                slotArray.map((slot, i) => {
                    return (<><ButtonBase disableTouchRipple  onClick={() => { setDialogOpen(true); setSlotIndex(i) }}>
                        <DeckComponent slots={slot} isInteractive={false} />
                    </ButtonBase>
                        {i <= slotArray.length - 1 && <Divider orientation="horizontal" variant="middle" sx={{ py: 2, width: '80%', }} />}
                    </>)
                })
            }

            <Box sx={{ pt: 5, width: '40%', height: '50%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <ImageButton focusRipple
                    onClick={() => { setDialogOpen(true); setSlotIndex(slotArray.length) }}>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        sx={[
                            {
                                color: 'inherit',
                            },
                            (theme) => ({
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: `calc(${theme.spacing(1)} + 6px)`,
                            }),
                        ]}
                    >
                        Add Deck
                    </Typography>
                </ImageButton>
            </Box>
        </>
    );
}

export default GameDecks;
