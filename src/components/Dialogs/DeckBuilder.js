import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Box, Typography, Grid, Dialog, IconButton, DialogActions, Button, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import CardList from '../../components/Lists/CardList';
import { cards } from '../../static/cards';
import DeckComponent from '../Cards/DeckComponent';

function DeckBuilder({ slotArray, setSlotArray, slotIndex, dialogOpen, setDialogOpen }) {

    const theme = useTheme();
    const [slots, setSlots] = useState(slotArray.length - 1 < slotIndex ? [{}, {}, {}, {}, {}, {}, {}, {}] : slotArray[slotIndex]); // if deck exists then load cards else initialize
    const [sortDirection, setSortDirection] = useState(true);


    const handleSelect = (card) => {
        const arr = [...slots];
        if (card.rarity === 4) { // if card is champion -- champions can only be in 2nd or 3rd slot
            if (Object.keys(arr[1]).length >= 1 && arr[1].rarity === 4 && Object.keys(arr[2]).length >= 1 && arr[2].rarity === 4) {// there can only be two champions in a deck
                return;
            }
            else if (Object.keys(arr[1]).length < 1) {
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
                if (card.rarity === 4) { // if champion -- champions can only be in 2nd or 3rd slot
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
        if (card.evo || card.hero) {
            return false;
        }
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].id && slots[i].id === card.id) {
                return false;
            }
        }

        if (slotArray.length > 0) { // filter out cards from previous decks
            for (let j = 0; j < slotArray.length; j++) {
                for (let i = 0; i < slotArray[j].length; i++) {
                    if (slotArray[j][i].id && slotArray[j][i].id === card.id) {
                        return false;
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
        // const p = [...slots]
        t[slotIndex] = slots;
        setSlotArray(t);
        setDialogOpen(false)
    };


    return (
        <Dialog onClose={() => { handleCloseDialog() }} open={dialogOpen} fullWidth maxWidth='xl' >
            <IconButton
                aria-label="close"
                onClick={() => { handleCloseDialog() }}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    // color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1 }}>
                <DeckComponent slots={slots} setSlots={setSlots} isInteractive={true} />
                <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '80%', pb: 2 }}>
                        <IconButton style={{ borderRadius: '5%' }} onClick={() => { setSortDirection(!sortDirection); }}><Typography variant='h5' sx={{ pr: 1 }}>Sort By</Typography>
                            {sortDirection ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</IconButton></Box>
                    <CardList handleSelect={handleSelect} cards={cards} filterCards={filterCards} sortDirection={sortDirection} />
                </Box>
            </Box>
            <DialogActions sx={{ pb: 0, m: 0 }}>
                <Button size='large' variant='contained' disableElevation={true} sx={{ m: 2 }} onClick={() => { handleCloseDialog() }}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeckBuilder;
