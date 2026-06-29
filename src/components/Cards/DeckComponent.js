import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Box, Typography, Grid, ButtonBase, Button, IconButton, Card, Tooltip, Dialog, DialogTitle, DialogActions, CardActions } from '@mui/material';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FolderIcon from '@mui/icons-material/Folder';


import SavedDecks from '../Dialogs/SavedDecks';
import CardList from '../../components/Lists/CardList';
import { CardDrag } from '../../components/Cards/Card';
import { CardSlot } from '../../components/Cards/CardSlot';

import { cards } from '../../static/cards';

function DeckComponent({ slots, setSlots, isInteractive = false, setDialogOpen, newSlotIndex, setSlotIndex, handleClear, canDelete,
    isClickable = false, savedDecksDialogOpen, setSavedDecksDialogOpen, DeckButtons, handleLoadDeck, decks, setDecks }) {

    const theme = useTheme();
    const [swapCardType, setSwapCardType] = useState(false);

    const [currentDeck, setCurrentDeck] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleDropCard = (fromIndex, toIndex) => {
        if ((Object.keys(slots[fromIndex]).length >= 1 && slots[fromIndex].rarity === 4) || (Object.keys(slots[toIndex]).length >= 1 && slots[toIndex].rarity === 4)) { // champion can only be moved between 2nd and 3rd slot
            if (!((fromIndex === 1 && toIndex === 2) || (fromIndex === 2 && toIndex === 1))) {
                return;
            }
        }
        const arr = [...slots];
        const temp = arr[fromIndex];
        arr[fromIndex] = arr[toIndex]
        arr[toIndex] = temp;
        setSlots(arr);

    }

    const handleRemoveCard = (index) => {
        const arr = [...slots];
        arr[index] = {};
        setSlots(arr);
    };


    const handleSwitchType = (value) => {
        if (value.hasEvo && value.hasHero) {
            setSwapCardType(!swapCardType);
        }
        return;
    }

    const handleSelectLoadDeck = () => {
        handleLoadDeck(currentDeck);
        setSavedDecksDialogOpen(false);
    }

    useEffect(() => { console.log(decks); }, []);
    useEffect(() => {
        if (decks && decks.length >= 1) {
            setCurrentDeck(decks[0]);
        }
        console.log(decks);
    }, [decks]);




    const Children = () => {
        return <Box sx={{}}>
            <Grid container rowSpacing={isInteractive ? 1 : 0} columnSpacing={isInteractive ? 2 : 0} sx={{ p: isInteractive ? 1 : 0 }}>
                <Grid >
                    <CardSlot value={slots[0]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={0} isInteractive={isInteractive}></CardSlot>
                </Grid>
                <Grid>
                    <CardSlot value={slots[1]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={1} isInteractive={isInteractive}></CardSlot>
                </Grid>
                <Grid >
                    <CardSlot value={slots[2]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} handleSwitchType={handleSwitchType}
                        swapCardType={swapCardType} index={2} isInteractive={isInteractive}></CardSlot>
                </Grid>
                <Grid>
                    <CardSlot value={slots[3]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={3} isInteractive={isInteractive}></CardSlot>
                </Grid>
            </Grid>
            <Grid container rowSpacing={isInteractive ? 1 : 0} columnSpacing={isInteractive ? 2 : 0} sx={{ p: isInteractive ? 1 : 0 }}>
                <Grid >
                    <CardSlot value={slots[4]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={4} isInteractive={isInteractive}></CardSlot>
                </Grid>
                <Grid>
                    <CardSlot value={slots[5]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={5} isInteractive={isInteractive}></CardSlot>
                </Grid>
                <Grid >
                    <CardSlot value={slots[6]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={6} isInteractive={isInteractive}></CardSlot>
                </Grid>
                <Grid>
                    <CardSlot value={slots[7]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={7} isInteractive={isInteractive}></CardSlot>
                </Grid>
            </Grid>
            {(isInteractive || !isClickable) &&
                <DeckButtons />
            }
        </Box>
    }

    return (
        <Box sx={{ pt: isInteractive || isClickable ? 8 : 0, pb: isInteractive ? 0 : 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1, }}>
            <DndProvider backend={HTML5Backend}>

                {!isClickable ? <Children /> :
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
                        }} leaveDelay={250} title={canDelete &&
                            <Tooltip title={'Delete'}>
                                <IconButton size='small' sx={{ bgColor: 'white', color: 'white', m: 0, p: 0 }}
                                    onClick={() => { handleClear(newSlotIndex); }}><DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        } placement="top-end">
                            <Button onClick={() => { setDialogOpen(true); setSlotIndex(newSlotIndex) }}>
                                <Children />
                            </Button>
                        </Tooltip>
                    </Card>}
            </DndProvider>
            {savedDecksDialogOpen &&
                <Dialog onClose={() => { setSavedDecksDialogOpen(false) }} open={savedDecksDialogOpen} fullWidth maxWidth='md' >
                    <DialogTitle>My Decks</DialogTitle>
                    <Card sx={{ p: 0 }}>
                        <IconButton
                            aria-label="close"
                            onClick={() => { setSavedDecksDialogOpen(false) }} //don't save changes
                            sx={(theme) => ({
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                // color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                        <SavedDecks isDialog={true} decks={decks} setDecks={setDecks}
                            currentDeck={currentDeck} setCurrentDeck={setCurrentDeck} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>

                            <IconButton size='medium' sx={{ border: 2, color: 'green', m: 2 }}
                                onClick={() => { handleSelectLoadDeck() }}
                            >
                                <CheckIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                    {/* <DialogActions sx={{ pb: 0, m: 0 }}>
                        <Button size='large' variant='contained' disableElevation={true} sx={{ m: 2 }} onClick={() => { setSavedDecksDialogOpen(false) }}>Save</Button>
                    </DialogActions> */}
                </Dialog>
            }
        </Box>

    );
}

export default DeckComponent;
