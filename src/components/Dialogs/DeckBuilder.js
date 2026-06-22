import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Box, Typography, Grid, Dialog } from '@mui/material';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CardList from '../../components/Lists/CardList';
import { CardDrag } from '../../components/Cards/Card';
import { CardSlot } from '../../components/Cards/CardSlot';

import { cards } from '../../static/cards';
import DeckComponent from '../Cards/DeckComponent';

function DeckBuilder({ slotArray, setSlotArray, slotIndex, dialogOpen, setDialogOpen }) {

    const theme = useTheme();
    const [slots, setSlots] = useState(slotArray.length - 1 < slotIndex ? [{}, {}, {}, {}, {}, {}, {}, {}] : slotArray[slotIndex]); // if deck exists then load cards else initialize


    const handleSelect = (card) => {
        const arr = [...slots];
        for (let i = 0; i < arr.length; i++) {
            if (card.rarity === 4 && Object.keys(arr[i]).length >= 1 && arr[i].rarity === 4) { // if there is already champion in deck can't add another
                return;
            }
            if (Object.keys(arr[i]).length < 1) {
                if (card.rarity === 4) { // if champion -- champions can only be in second slot
                    const second = arr[1];
                    arr[1] = card;
                    arr[i] = second; // swap card in second slot with champion
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

    const handleCloseDialog = () => {
        for (let i = 0; i < slots.length; i++) { // all slots must be full to save changes
            if (Object.keys(slots[i]).length < 1) { // if slot empty return
                setDialogOpen(false);
                return;
            }
        }
        const t = [...slotArray]
        // const p = [...slots]
        t[slotIndex] = slots;
        setSlotArray(t);
        setDialogOpen(false)
    };


    return (
        <Dialog onClose={() => { handleCloseDialog() }} open={dialogOpen} fullWidth maxWidth='xl'>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1 }}>
                <DeckComponent slots={slots} setSlots={setSlots} isInteractive={true} />
                <Box sx={{ height: '100%', width: '100%', bgcolor: 'yellow', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CardList handleSelect={handleSelect} cards={cards} filterCards={filterCards} />
                </Box>
            </Box>
        </Dialog>
    );
}

export default DeckBuilder;
