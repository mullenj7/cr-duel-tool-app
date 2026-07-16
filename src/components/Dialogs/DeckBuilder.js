import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, CardActions, Dialog, IconButton, DialogActions, Button, DialogTitle, Tooltip, ButtonBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';


import SavedDecks from './SavedDecks';
import CardList from '../../components/Lists/CardList';
import { cards } from '../../static/cards';
import DeckComponent from '../Cards/DeckComponent';
import { GeneralButton } from '../Buttons/GeneralButton';

function DeckBuilder({ slotArray, setSlotArray, slotIndex, dialogOpen, setDialogOpen, decks, setDecks, loadDeck = true, filterUsedCards = true, saveDeck = false, handleSaveDeck }) {

    const theme = useTheme();
    const [slots, setSlots] = useState(slotArray.length - 1 < slotIndex ? [{}, {}, {}, {}, {}, {}, {}, {}] : slotArray[slotIndex]); // if deck exists then load cards else initialize
    const [sortDirection, setSortDirection] = useState(true);
    const [savedDecksDialogOpen, setSavedDecksDialogOpen] = useState(false);
    const [currentDeck, setCurrentDeck] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [swapCardType, setSwapCardType] = useState(false);


    const navigate = useNavigate();

    useEffect(() => { // init swap card type
        if (slotIndex <= slotArray.length - 1) {
            const arr = slotArray[slotIndex];
            if (arr.length > 0 && Object.keys(arr[2]).length > 0 && arr[2].hasOwnProperty('swapCardType')) {
                setSwapCardType(arr[2].swapCardType);
            }
        }
    }, [slotArray]);


    useEffect(() => {
        if (decks && decks.length >= 1) { //for user decks list
            setCurrentDeck(decks[0]);
        }
    }, [decks]);


    const handleSelect = (card) => {
        const arr = [...slots];
        if (card.rarity === 4) { // if card is champion -- champions can only be in 2nd or 3rd slot
            if (Object.keys(arr[1]).length >= 1 && arr[1].rarity === 4 && Object.keys(arr[2]).length >= 1 && arr[2].rarity === 4) {// both slots full - do nothing there can only be two champions in a deck
                return;
            }
            else if (Object.keys(arr[1]).length < 1) { //put in 2nd or 3rd slot if free
                arr[1] = card;
                setSlots(arr);
                return;
            }
            else if (Object.keys(arr[2]).length < 1) {
                arr[2] = card;
                setSlots(arr);
                return;
            }
        }
        for (let i = 0; i < arr.length; i++) {
            if (Object.keys(arr[i]).length < 1) {
                if (card.rarity === 4) { // if champion and there is a free slot in deck swap 2nd or 3rd card -- champions can only be in 2nd or 3rd slot
                    const second = arr[1];
                    if (arr[1].rarity !== 4) {
                        arr[1] = card;
                        arr[i] = second; // swap card in second slot with champion
                    }
                    else if (arr[2].rarity !== 4) {
                        arr[2] = card;
                        arr[i] = second; // swap card in third slot with champion
                    }
                }
                else {
                    arr[i] = card;
                }
                break;

            }
        }
        setSlots(arr);
    };

    const filterCards = (card) => {
        if (card.evo || card.hero) { // don't show hero or evo images
            return false;
        }
        for (let i = 0; i < slots.length; i++) { // filter out cards from current deck
            if (slots[i].id && slots[i].id === card.id) {
                return false;
            }
        }


        if (filterUsedCards && slotArray.length > 0) { // filter out cards from previous decks
            for (let j = 0; j < slotArray.length; j++) {
                if (j !== slotIndex) { // don't do current deck as it has been edited in slots state - handled in previous for loop
                    for (let i = 0; i < slotArray[j].length; i++) {
                        if (slotArray[j][i].id && slotArray[j][i].id === card.id) {
                            return false;
                        }
                    }
                }
            }
        }

        return true;
    };

    const handleCloseDialog = () => { // let incomplete decks be saved for now
        // for (let i = 0; i < slots.length; i++) { // all slots must be full to save changes
        //     if (Object.keys(slots[i]).length < 1) { // if slot empty return
        //         setDialogOpen(false);
        //         return;
        //     }
        // }
        const t = [...slotArray]
        const newSlots = slots.map((s, i) => { // if 3rd card has swap option need to set property
            if (i === 2) {
                if (s.hasEvo && s.hasHero) { // if has swap option
                    return { ...s, swapCardType: swapCardType }
                }
                else return s;
            } else {
                return s;
            }
        });
        t[slotIndex] = newSlots;
        setSlotArray(t);
        if (saveDeck) {
            handleSaveDeck(slotIndex, t);
        }
        setDialogOpen(false)
    };

    const handleClearDeck = () => {
        setSlots([{}, {}, {}, {}, {}, {}, {}, {}]);
    }

    const handleLoadDeck = (deck) => {
        setSlots(deck);
    }

    const handleSelectLoadDeck = () => {
        handleLoadDeck(currentDeck);
        setSavedDecksDialogOpen(false);
    }

    const DeckButtons = () => {
        return <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            {loadDeck &&
                <Tooltip title={'Load Saved Deck'}><IconButton size={'medium'} color='primary' sx={{ border: 2 }} onClick={() => { setSavedDecksDialogOpen(true); }}><FolderIcon /></IconButton></Tooltip>
            }
            <Tooltip title={'Clear'}><IconButton size={'medium'} color='error' sx={{ border: 2, ml: 2 }} onClick={() => { handleClearDeck() }}><DeleteIcon /></IconButton></Tooltip>
        </Box>
    }


    return (
        <Dialog onClose={() => { setDialogOpen(false) }} open={dialogOpen} fullWidth maxWidth='xl' >
            <IconButton
                aria-label="close"
                onClick={() => { setDialogOpen(false) }} //don't save changes
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    // color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1, py: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1, }}>
                    <Box sx={{ pt: 8, pb: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1, }}>
                        <DeckComponent slots={slots} setSlots={setSlots} isInteractive={true} setSavedDecksDialogOpen={setSavedDecksDialogOpen} isLarge={true}
                            savedDecksDialogOpen={savedDecksDialogOpen} DeckButtons={DeckButtons} handleLoadDeck={handleLoadDeck} decks={decks} setDecks={setDecks}
                            swapCardType={swapCardType} setSwapCardType={setSwapCardType} />
                    </Box>
                </Box>
                <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '80%', pb: 2 }}>
                        <IconButton style={{ borderRadius: '5%' }} onClick={() => { setSortDirection(!sortDirection); }}>
                            <Typography variant='h5' sx={{ pr: 1 }}>Sort</Typography>
                            {sortDirection ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                        </IconButton>
                    </Box>
                    <CardList handleSelect={handleSelect} cards={cards} filterCards={filterCards} sortDirection={sortDirection} />
                </Box>
            </Box>
            <DialogActions sx={{ pb: 0, m: 0 }}>
                <Button size='large' variant='contained' disableElevation={true} sx={{ m: 2 }} onClick={() => { handleCloseDialog() }}>Save</Button>
            </DialogActions>
            {savedDecksDialogOpen && decks.length > 0 &&
                <Dialog onClose={() => { setSavedDecksDialogOpen(false) }} open={savedDecksDialogOpen} fullWidth maxWidth='md' >
                    <DialogTitle>My Decks</DialogTitle>
                    <Card sx={{ p: 0, m: 0, }}>
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
                        <CardActions sx={{ justifyContent: 'flex-end', p: 0, m: 0, }}>
                            <Tooltip title={'Load Deck'}>
                                <IconButton size='small' sx={{ border: 2, color: 'green', m: 2 }}
                                    onClick={() => { handleSelectLoadDeck() }}
                                >
                                    <CheckIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Card>



                </Dialog>
            }
            {savedDecksDialogOpen && decks.length <= 0 &&
                <Dialog onClose={() => { setSavedDecksDialogOpen(false) }} open={savedDecksDialogOpen} fullWidth maxWidth='md' >

                    <Card sx={{ p: 10, m: 0, minHeight: 450, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>You currently have no saved decks</Typography>
                        <GeneralButton focusRipple
                            onClick={() => {
                                navigate('/decks', { replace: true });
                            }}>
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
                                Add Decks
                            </Typography>
                        </GeneralButton>
                    </Card></Dialog>
            }
        </Dialog>
    );
}

export default DeckBuilder;
