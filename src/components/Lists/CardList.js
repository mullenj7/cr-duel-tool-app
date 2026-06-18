import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { ListItem, List, ListItemAvatar, Avatar, ListItemText, ListItemButton, Box, Stack, Item, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';




function CardList({ handleSelect, cards }) {


    return (
     

        <Stack direction="row"
            useFlexGap
            sx={{ flexWrap: 'wrap',width: '80%',bgcolor: 'white', maxHeight: 450,  m: 0, p: 0, overflow: 'auto',}}
            >
            {
                cards.map((c, i) => {
                    return (
                        <Button onClick={() => handleSelect(c, i)}>
                            <img src={c.img} alt={c.name} style={{ height: 75 }}></img>
                        </Button>
                    );
                })
            }
        </Stack>
    );
};


export default CardList;