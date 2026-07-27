import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Box, Stack, Item, IconButton, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';




function CardList({ handleSelect, cards, filterCards, sortDirection }) {

    const cardColors = ['rgba(188, 213, 255, 0.87)', 'rgba(255, 221, 188, 0.87)', 'rgba(226, 188, 255, 0.87)', 'rgba(225, 225, 225, 0.87)', 'rgba(253, 241, 186, 0.87)']
    return (
        <Stack direction="row"
            useFlexGap
            sx={{ flexWrap: 'wrap', width: '80%', maxHeight: 500, m: 0, p: 0, overflow: 'auto',  }}
        >
            {
                cards.filter((card) => { return filterCards(card) }).sort((a, b) => sortDirection ? (b.rarity - a.rarity) : (a.rarity - b.rarity)).map((c, i) => {
                    return (
                        <Button onClick={() => handleSelect(c, i)} key={`card-list-item-${i}`} sx={{ m: 0.2, backgroundColor: cardColors[c.rarity], borderRadius: '5%' }}>
                            <img src={c.img} alt={c.id} style={{ height: 60 }}></img>
                        </Button>
                    );
                })
            }
        </Stack>
    );
};


export default CardList;