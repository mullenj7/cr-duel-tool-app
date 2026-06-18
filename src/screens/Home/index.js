import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Box, Typography, Grid, Card, ListItem, List, ListItemAvatar, Avatar, ListItemText, ListItemButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CardList from '../../components/Lists/CardList';
import { CardDrag } from '../../components/Cards/Card';
import { CardSlot } from '../../components/Cards/CardSlot';

import { cards } from '../../static/cards';

function Home() {

  const theme = useTheme();
  const [slots, setSlots] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);

  const handleSelect = (card) => {
    const arr = [...slots];

    for (let i = 0; i < arr.length; i++) {
      if (Object.keys(arr[i]).length < 1) {
        arr[i] = card;
        break;
      }
    }
    setSlots(arr);

  };

  const handleDropCard = (fromIndex, toIndex) => {
    const arr = [...slots];
    const temp = arr[fromIndex];
    arr[fromIndex] = arr[toIndex]
    arr[toIndex] = temp;
    console.log(arr);
    setSlots(arr);
  }

  const handleRemoveCard = ()=> {

    
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', flexGrow: 1 }}>
      <Box sx={{ p: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexGrow: 1, backgroundColor: 'red' }}>
        <DndProvider backend={HTML5Backend}>
          <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 1 }}>
            <Grid >
              <CardSlot value={slots[0]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={0}></CardSlot>
            </Grid>
            <Grid>
              <CardSlot value={slots[1]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={1}></CardSlot>
            </Grid>
            <Grid >
              <CardSlot value={slots[2]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={2}></CardSlot>
            </Grid>
            <Grid>
              <CardSlot value={slots[3]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={3}></CardSlot>
            </Grid>
          </Grid>
          <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 1 }}>
            <Grid >
              <CardSlot value={slots[4]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={4}></CardSlot>
            </Grid>
            <Grid>
              <CardSlot value={slots[5]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={5}></CardSlot>
            </Grid>
            <Grid >
              <CardSlot value={slots[6]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={6}></CardSlot>
            </Grid>
            <Grid>
              <CardSlot value={slots[7]} handleDropCard={handleDropCard} handleRemoveCard={handleRemoveCard} index={7}></CardSlot>
            </Grid>
          </Grid>
        </DndProvider>
      </Box>
      <Box sx={{ height: '100%', width: '100%', bgcolor: 'yellow', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardList handleSelect={handleSelect} cards={cards}/>
      </Box>
    </Box>
  );
}

export default Home;
