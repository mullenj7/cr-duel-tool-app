import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Box, Typography, Card, Button, IconButton, Tooltip, ListItem, List, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import CheckIcon from '@mui/icons-material/Check';



import DeckComponent from '../Cards/DeckComponent';


function SavedDecks({ isDialog, decks, setDecks, currentDeck, setCurrentDeck, selectedIndex, setSelectedIndex,handleSelectLoadDeck }) {


    const handleListItemClick = (index, deck) => {
        setSelectedIndex(index);
        setCurrentDeck(deck)
    };


    const DeckButtons = () => {
        if (!isDialog) {
            return <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title={'Load Deck'}><IconButton size={'small'} sx={{ border: 2, color: 'blue' }} onClick={() => { }}><FolderIcon /></IconButton></Tooltip>
                <Tooltip title={'Clear'}><IconButton size={'small'} color='error' sx={{ border: 2, ml: 2 }} onClick={() => { }}><DeleteIcon /></IconButton></Tooltip>
            </Box>
        }
        else {
            return null;
        }
    }

    return (

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 350, width: '100%', flexGrow: 1, py: 0, }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90%', width: '30%', flexGrow: 1, }}>
                <List sx={{ m: 0, p: 0, overflow: 'auto', width: '100%', }}>
                    {decks.map((d, i) => {
                        return <ListItem component="div" disablePadding key={`deck-item-${i}`}>
                            <ListItemButton onClick={() => handleListItemClick(i, d)} selected={selectedIndex === i}>
                                <ListItemText align='center' primary={`Deck ${i + 1}`} />
                            </ListItemButton>
                        </ListItem>
                    })} {[...Array(10 - decks.length)].map((d, i) => { // fill rest of list with empty decks
                        return <Tooltip title={'No Deck In This Slot'} key={`deck-item-${i + decks.length}`}><ListItem component="div" disablePadding >
                            <ListItemButton disabled>
                                <ListItemText align='center' primary={`Deck ${i + 1 + decks.length}`} />
                            </ListItemButton>
                        </ListItem></Tooltip>
                    })}
                </List>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '70%', flexGrow: 1, }}>
                <Box sx={{ pt: 0, pb: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1, }}>
                    <Button onClick={()=>{handleSelectLoadDeck()}}>
                    <DeckComponent isLarge={false} size={125} slots={currentDeck} setSlots={setCurrentDeck} isInteractive={false} DeckButtons={DeckButtons} isClickable={false} />
                    </Button>
                </Box>
            </Box>
        </Box>

    );
}

export default SavedDecks;
