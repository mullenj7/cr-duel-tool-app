import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { ListItem, List, ListItemAvatar, Avatar, ListItemText, ListItemButton, Box, Stack, Item, Button, Typography, } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import { cards } from '../../static/cards';




function AvailableCards({ slotArray, align = 'left' }) {

    const categories = ['Win Conditions', 'Spells', 'Buildings', 'Troops'];
    const [filteredCards, setFilteredCards] = useState([]);

    const checkCard = (card) => {
        try {
            for (let j = 0; j < slotArray.length; j++) {
                for (let i = 0; i < slotArray[j].length; i++) {
                    if (slotArray[j][i].id && slotArray[j][i].id === card.id) {
                        return false;
                    }
                }
            }
            return true;
        } catch (e) { return true }
    }

    const filterCards = () => {
        const arr1 = [];
        const arr2 = [];
        const arr3 = [];
        const arr4 = [];
        const newFiltered = [];

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            if (!card.evo && !card.hero && checkCard(card)) {

                if (card.winCon) {
                    arr1.push(card);
                }
                else if (card.spell) {
                    arr2.push(card);
                }
                else if (card.building) {
                    arr3.push(card);
                }
                else {
                    arr4.push(card);
                }

            }
        }
        newFiltered.push(arr1);
        newFiltered.push(arr2);
        newFiltered.push(arr3);
        newFiltered.push(arr4);

        setFilteredCards(newFiltered);
    }


    useEffect(() => {
        filterCards();
    }, [slotArray]);



    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>{filteredCards.map((filtered, index) => {
            return (<div key={`category-${align}-${index}`}><Typography sx={{ pb: 2 }} align='center'> {categories[index]}</Typography>
                <Stack direction="row" spacing={1}
                    useFlexGap
                    sx={{ flexWrap: 'wrap', width: '100%', bgcolor: 'white', m: 0, p: 0, display: 'flex', justifyContent: align === 'left' ? 'flex-start' : 'flex-end' }}
                >
                    {
                        filtered.sort((a, b) => b.rarity - a.rarity).map((c, i) => {
                            return (
                                <img src={c.img} alt={c.id} key={`av-cards-${align}-${i}`} style={{ height: 40 }}></img>
                            );
                        })
                    }</Stack></div>);
        })}
        </Box>
    );
};


export default AvailableCards;