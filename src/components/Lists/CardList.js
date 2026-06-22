import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { ListItem, List, ListItemAvatar, Avatar, ListItemText, ListItemButton, Box, Stack, Item, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';




function CardList({ handleSelect, cards, filterCards }) {


    return (


        <Stack direction="row"
            useFlexGap
            sx={{ flexWrap: 'wrap', width: '80%', bgcolor: 'white', maxHeight: 450, m: 0, p: 0, overflow: 'auto', }}
        >
            {
                cards.filter((card) => { return filterCards(card) }).map((c, i) => {
                    return (
                        <Button onClick={() => handleSelect(c, i)}>
                            <img src={c.img} alt={c.id} style={{ height: 75 }}></img>
                        </Button>
                    );
                })
            }
        </Stack>
    );
};


export default CardList;