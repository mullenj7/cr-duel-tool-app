import React from 'react';
import { Box, Grid, } from '@mui/material';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



import { CardSlot } from '../../components/Cards/CardSlot';

function DeckComponent({ slots, setSlots, isInteractive, isClickable, DeckButtons, isLarge = false, size = 150, swapCardType, setSwapCardType, offset }) {

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

    return (
        <DndProvider backend={HTML5Backend}>
            <Box sx={{}}>
                <Grid container rowSpacing={isLarge ? 1 : 0} columnSpacing={isLarge ? 2 : 0} sx={{ p: isLarge ? 1 : 0 }}>
                    <Grid >
                        <CardSlot value={slots[0]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={0} isInteractive={isInteractive} isLarge={isLarge} size={size} offset={offset}></CardSlot>
                    </Grid>
                    <Grid>
                        <CardSlot value={slots[1]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={1} isInteractive={isInteractive} isLarge={isLarge} size={size} offset={offset}></CardSlot>
                    </Grid>
                    <Grid >
                        <CardSlot value={slots[2]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} handleSwitchType={handleSwitchType}
                            swapCardType={isInteractive ? swapCardType : slots[2].swapCardType} index={2} isInteractive={isInteractive} isLarge={isLarge} size={size} offset={offset}></CardSlot>
                    </Grid>
                    <Grid>
                        <CardSlot value={slots[3]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={3} isInteractive={isInteractive} isLarge={isLarge} size={size} offset={offset}></CardSlot>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={isLarge ? 1 : 0} columnSpacing={isLarge ? 2 : 0} sx={{ p: isLarge ? 1 : 0 }}>
                    <Grid >
                        <CardSlot value={slots[4]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={4} isInteractive={isInteractive} isLarge={isLarge} size={size} offset={offset}></CardSlot>
                    </Grid>
                    <Grid>
                        <CardSlot value={slots[5]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={5} isInteractive={isInteractive} isLarge={isLarge} size={size} offset={offset}></CardSlot>
                    </Grid>
                    <Grid >
                        <CardSlot value={slots[6]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={6} isInteractive={isInteractive} isLarge={isLarge} size={size} offset={offset}></CardSlot>
                    </Grid>
                    <Grid>
                        <CardSlot value={slots[7]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={7} isInteractive={isInteractive} isLarge={isLarge} size={size} offset={offset}></CardSlot>
                    </Grid>
                </Grid>
                {isInteractive &&
                    <DeckButtons />
                }
            </Box>
        </DndProvider>
    );
}

export default DeckComponent;
