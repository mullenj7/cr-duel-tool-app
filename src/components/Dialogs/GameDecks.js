import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, Dialog, DialogTitle, Button, ButtonBase, Divider, } from '@mui/material';


import DeckComponent from '../../components/Cards/DeckComponent';

function GameDecks({ slotArray, slotIndex, setSlotIndex, setDialogOpen, setSlotArray }) {

    const theme = useTheme();

    const handleClear = (index) => {
        const arr = []
        setSlotArray(
            slotArray.filter((a, i) => { return i !== index })
        );
    };


    const ImageButton = styled(ButtonBase)(({ theme }) => ({ // courtesy material UI
        position: 'relative',

        //width: 300,
        width: '100%',
        height: 150,

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
                    return (<>
                        <DeckComponent slots={slot} isInteractive={false} setDialogOpen={setDialogOpen} 
                        newSlotIndex={i} setSlotIndex={setSlotIndex} handleClear={handleClear} canDelete={i===slotArray.length-1} />
                        {i <= slotArray.length - 1 && <Divider orientation="horizontal" variant="middle" sx={{ py: 2, width: '80%', }} />}
                    </>)
                })
            }
            {slotArray.length < 10 && // max of 9 decks can be added
                <Box sx={{ py: 5, width: '60%', height: '50%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: 2, borderRadius: '16px' }}>
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
                </Box>
            }
        </>
    );
}

export default GameDecks;
