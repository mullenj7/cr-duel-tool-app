import React from 'react';
import { useTheme } from '@mui/material/styles';

import { Box, Typography, Tooltip, IconButton, Card, Button, Divider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


import { GeneralButton } from '../Buttons/GeneralButton';
import DeckComponent from '../../components/Cards/DeckComponent';

function GameDecks({ slotArray, slotIndex, setSlotIndex, setDialogOpen, setSlotArray, align = 'left' }) {

    const theme = useTheme();

    const handleClear = (index) => {
        setSlotArray(slotArray.filter((a, i) => { return i !== index }));
    };


    return (
        <Box sx={{ pt: 3, display: 'flex', flexGrow: 1, width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
            {
                slotArray.map((slot, i) => {
                    return (
                        <Box key={`slotArray=${i}`} sx={{
                            pt: { lg: 1, xl: 3 }, pb: 0, display: 'flex', flexDirection: 'column',
                            justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1,
                        }}>
                            <Card elevation={0} sx={{}}>
                                <Tooltip leaveDelay={100} slotProps={{
                                    tooltip: {
                                        sx: {
                                            backgroundColor: theme.palette.error.main,
                                            borderRadius: '50%',
                                            p: 0, m: 0
                                        },
                                    },
                                    popper: { sx: { zIndex: 1000 } }
                                }} title={(i === slotArray.length - 1) &&
                                    <Tooltip title={'Delete'}>
                                        <IconButton size='small' sx={{ bgColor: 'white', color: 'white', m: 0, p: 1 }}
                                            onClick={() => { handleClear(i); }}><DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                } placement="top-end">
                                    <Button onClick={() => { setDialogOpen(true); setSlotIndex(i) }}>
                                        <DeckComponent slots={slot} isInteractive={false} isClickable={true} setDialogOpen={setDialogOpen} key={`game-deck-${align}-${i}`}
                                            newSlotIndex={i} setSlotIndex={setSlotIndex} handleClear={handleClear} canDelete={i === slotArray.length - 1} isLarge={false} size={105} />
                                    </Button>
                                </Tooltip>
                            </Card>
                            {i <= slotArray.length - 1 && <Divider orientation="horizontal" variant="middle" sx={{ py: 3, width: '80%', }} >Game {i + 1}</Divider>}

                        </Box>)
                })

            }
            {slotArray.length < 10 && // max of 9 decks can be added per side
                <Box sx={{ pt: { lg: 3, xl: 4 }, pb: 5, width: '60%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: 2, borderRadius: '16px' }}>
                        <GeneralButton focusRipple
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
                                {`Game ${slotArray.length + 1}`}
                            </Typography>
                        </GeneralButton>
                    </Box>
                </Box>
            }
        </Box>
    );
}

export default GameDecks;
