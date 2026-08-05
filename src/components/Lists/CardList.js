import React from 'react';
import { Stack, Button } from '@mui/material';




function CardList({ handleSelect, cards, filterCards, sortDirection, searchText }) {

    const cardColors = ['rgba(188, 213, 255, 0.87)', 'rgba(255, 221, 188, 0.87)', 'rgba(226, 188, 255, 0.87)', 'rgba(225, 225, 225, 0.87)', 'rgba(253, 241, 186, 0.87)']
    return (
        <Stack direction="row"
            useFlexGap
            sx={{ flexWrap: 'wrap', width: '80%', maxHeight: 500, m: 0, p: 0, overflow: 'auto', }}
        >
            {
                cards.filter((c) => { return ((`Images/${c.img}.png`)).includes(searchText.replace(/\s/g, '-')) }).filter((card) => { return filterCards(card) }).sort((a, b) => sortDirection ?
                    (b.rarity - a.rarity) : (a.rarity - b.rarity)).map((c, i) => {
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