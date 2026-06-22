import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, Dialog, DialogTitle, Button, ButtonBase, Divider,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AddIcon from '@mui/icons-material/Add';


import CardList from '../../components/Lists/CardList';
import { CardDrag } from '../../components/Cards/Card';
import { CardSlot } from '../../components/Cards/CardSlot';
import GameDecks from '../../components/Dialogs/GameDecks';
import AvailableCards from '../../components/Lists/AvailableCards';

import DeckBuilder from '../../components/Dialogs/DeckBuilder';
import DeckComponent from '../../components/Cards/DeckComponent';

function Home() {

  const theme = useTheme();
  const [slotArrayRed, setSlotArrayRed] = useState([]);
  const [slotArrayBlue, setSlotArrayBlue] = useState([]);

  const [dialogOpenRed, setDialogOpenRed] = useState(false);
  const [dialogOpenBlue, setDialogOpenBlue] = useState(false);

  const [slotIndexRed, setSlotIndexRed] = useState(0);
  const [slotIndexBlue, setSlotIndexBlue] = useState(0);



  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>
      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <GameDecks slotArray={slotArrayRed} setSlotArray={setSlotArrayRed} slotIndex={slotIndexRed} setSlotIndex={setSlotIndexRed} setDialogOpen={setDialogOpenRed} />
      </Box>
      <Box sx={{width: '100%', height: '100%', flexGrow: 1, display:'flex', flexDirection:'column'}}>
        <Typography variant='h4' align='center' sx={{py:2}}>Available Cards</Typography>
        <Box sx={{width: '100%', height: '100%', flexGrow: 1, display:'flex'}}>
      <Box sx={{ width: '50%', height: '100%', bgcolor: 'blue', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AvailableCards slotArray={slotArrayRed} />
      </Box>
      <Box sx={{ width: '50%', height: '100%', bgcolor: 'black', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AvailableCards slotArray={slotArrayBlue} align={'right'} />
      </Box>
      </Box>
      </Box>
      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <GameDecks slotArray={slotArrayBlue} setSlotArray={setSlotArrayBlue} slotIndex={slotIndexBlue} setSlotIndex={setSlotIndexBlue} setDialogOpen={setDialogOpenBlue} />
      </Box>


      {dialogOpenRed &&
        <DeckBuilder slotArray={slotArrayRed} setSlotArray={setSlotArrayRed} slotIndex={slotIndexRed} dialogOpen={dialogOpenRed} setDialogOpen={setDialogOpenRed} />
      } {dialogOpenBlue &&
        <DeckBuilder slotArray={slotArrayBlue} setSlotArray={setSlotArrayBlue} slotIndex={slotIndexBlue} dialogOpen={dialogOpenBlue} setDialogOpen={setDialogOpenBlue} />
      }
    </Box>
  );
}

export default Home;
