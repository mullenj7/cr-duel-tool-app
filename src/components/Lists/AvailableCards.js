import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Divider, Box, Stack, Paper, Button, Typography, Grid } from '@mui/material';
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', ml: align === 'left' ? 0 : 2, mr: align === 'right' ? 0 : 2 }}>{filteredCards.map((filtered, index) => {
            return (
                <Box key={`category-${align}-${index}`} sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                    <Box sx={{ pb: 2 }}>
                        <Divider orientation="horizontal" variant="middle"><Typography sx={{}} > {categories[index]}</Typography></Divider>
                    </Box>
                    <Stack direction="row" spacing={1}
                        useFlexGap
                        sx={{ flexWrap: 'wrap', pb: 3, display: 'flex', justifyContent: align === 'left' ? 'flex-start' : 'flex-end',pl: align === 'left' ? 1 : 0, pr: align === 'right' ? 1 : 0  }}
                    >
                        {
                            filtered.sort((a, b) => b.rarity - a.rarity).map((c, i) => {
                                return (
                                    <img src={c.img} alt={c.id} key={`av-cards-${align}-${i}`} style={{ height: 42, }}></img>
                                );
                            })
                        }
                    </Stack>

                    {/* <div style={{
                    justifyContent: 'center', alignItems: 'center', alignContent: 'center', 
                    textAlign: align === 'left' ? 'left' : 'right', paddingRight: 5, paddingLeft: 5,
                }}>
                    {
                        filtered.sort((a, b) => b.rarity - a.rarity).map((c, i) => {
                            return (<div style={{ display: 'inline-block', marginLeft: 2, marginRight: 2 }}>
                                <img src={c.img} alt={c.id} key={`av-cards-${align}-${i}`} style={{ height: 42, }}></img>
                            </div>
                            );
                        })
                    }
                </div> */}
                </Box>
            );
        })}
        </Box>
    );
};


export default AvailableCards;