import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, Dialog, Tooltip, IconButton, Card, Button, ButtonBase, Divider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


import DeckComponent from '../../components/Cards/DeckComponent';

function GameDecks({ slotArray, slotIndex, setSlotIndex, setDialogOpen, setSlotArray, align = 'left', decks, setDecks }) {

    const theme = useTheme();

    const handleClear = (index) => {
        setSlotArray(slotArray.filter((a, i) => { return i !== index }));
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
                    return (
                        <Box key={`slotArray=${i}`} sx={{ pt: 8, pb: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1, }}>
                            <Card elevation={0}>
                                <Tooltip slotProps={{
                                    tooltip: {
                                        sx: {
                                            //   color: "#5a4cd8",
                                            backgroundColor: "#b12c2c",
                                            borderRadius: '50%',
                                            py: 1, px: 1, m: 0
                                        },
                                    },
                                }} title={(i === slotArray.length - 1) &&
                                    <Tooltip title={'Delete'}>
                                        <IconButton size='small' sx={{ bgColor: 'white', color: 'white', m: 0, p: 0 }}
                                            onClick={() => { handleClear(i); }}><DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                } placement="top-end">
                                    <Button onClick={() => { setDialogOpen(true); setSlotIndex(i) }}>
                                        <DeckComponent slots={slot} isInteractive={false} isClickable={true} setDialogOpen={setDialogOpen} key={`game-deck-${align}-${i}`}
                                            newSlotIndex={i} setSlotIndex={setSlotIndex} handleClear={handleClear} canDelete={i === slotArray.length - 1} />
                                    </Button>
                                </Tooltip>
                            </Card>

                            {i <= slotArray.length - 1 && <Divider orientation="horizontal" variant="middle" sx={{ py: 2, width: '80%', }} >Game {i + 1}</Divider>}
                        </Box>)
                })
            }
            {slotArray.length < 10 && // max of 9 decks can be added per side
                <Box sx={{ pt: 8, pb: 5, width: '60%', height: '50%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
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
