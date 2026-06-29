import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { ListItem, List, ListItemAvatar, Avatar, ListItemText, ListItemButton, Box, Stack, Item, IconButton,Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import ImageIcon from '@mui/icons-material/Image';




function CardList({ handleSelect, cards, filterCards, sortDirection }) {
    return (
        <Stack direction="row"
            useFlexGap
            sx={{ flexWrap: 'wrap', width: '80%', bgcolor: 'white', maxHeight: 500, m: 0, p: 0, overflow: 'auto', }}
        >
            {
                cards.filter((card) => { return filterCards(card) }).sort((a, b) => sortDirection ? (b.rarity - a.rarity) : (a.rarity - b.rarity)).map((c, i) => {
                    return (
                        <Button onClick={() => handleSelect(c, i)} key={`card-list-item-${i}`}>
                            <img src={c.img} alt={c.id} style={{ height: 60 }}></img>
                        </Button>
                    );
                })
            }
        </Stack>
    );
};


export default CardList;