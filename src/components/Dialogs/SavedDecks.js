import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Box, Typography, Card, Dialog, IconButton, DialogActions, Button, DialogTitle, Tooltip, ListItem, List, ListItemButton, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import CheckIcon from '@mui/icons-material/Check';



import DeckComponent from '../Cards/DeckComponent';


function SavedDecks({ isDialog, decks, setDecks, currentDeck, setCurrentDeck, selectedIndex, setSelectedIndex }) {



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

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 450, width: '100%', flexGrow: 1, py: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60%', width: '35%', flexGrow: 1, }}>

                <List sx={{ m: 0, p: 0, overflow: 'auto', width: '100%' }}>
                    {decks.map((d, i) => {
                        return <ListItem component="div" disablePadding key={`deck-item-${i}`}>
                            <ListItemButton onClick={() => handleListItemClick(i, d)} selected={selectedIndex === i}>
                                <ListItemText align='center' primary={`Item ${i + 1}`} />
                            </ListItemButton>
                        </ListItem>
                    })}
                </List>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '65%', flexGrow: 1, }}>
                <DeckComponent slots={currentDeck} setSlots={setCurrentDeck} isInteractive={false} DeckButtons={DeckButtons} isClickable={false} />
            </Box>
        </Box>

    );
}

export default SavedDecks;
