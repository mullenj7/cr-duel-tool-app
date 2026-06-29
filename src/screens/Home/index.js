import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, Dialog, DialogTitle, Button, ButtonBase, Divider, IconButton } from '@mui/material';
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
  const tester = [{ id: 76, img: 'Images/goblins.png', hasHero: true, rarity: 0 },
  { id: 77, img: 'Images/goblinstein.png', winCon: true, rarity: 4 },
  { id: 78, img: 'Images/golden-knight.png', rarity: 4 },
  { id: 79, img: 'Images/golem.png', winCon: true, rarity: 2 },
  { id: 80, img: 'Images/graveyard.png', winCon: true, rarity: 3 },
  { id: 81, img: 'Images/guards.png', rarity: 2 },
  { id: 82, img: 'Images/heal-spirit.png', rarity: 0 },
  { id: 83, img: 'Images/hog-rider.png', winCon: true, rarity: 1 }];
  const [decks, setDecks] = useState([tester, tester, tester, tester, tester, tester, tester, tester, tester]);
  const theme = useTheme();
  const [slotArrayRed, setSlotArrayRed] = useState([]);
  const [slotArrayBlue, setSlotArrayBlue] = useState([]);

  const [dialogOpenRed, setDialogOpenRed] = useState(false);
  const [dialogOpenBlue, setDialogOpenBlue] = useState(false);

  const [slotIndexRed, setSlotIndexRed] = useState(0);
  const [slotIndexBlue, setSlotIndexBlue] = useState(0);



  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'space-evenly', pb: 5 }}>
      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h4' align='center' sx={{ py: 2 }}>You</Typography>
        <GameDecks slotArray={slotArrayRed} setSlotArray={setSlotArrayRed} slotIndex={slotIndexRed} setSlotIndex={setSlotIndexRed} setDialogOpen={setDialogOpenRed}
          decks={decks} setDecks={setDecks} />
      </Box>
      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h4' align='center' sx={{ py: 2 }}>Available Cards</Typography>
        <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex' }}>
          <Box sx={{ width: '50%', height: '100%', bgcolor: 'blue', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AvailableCards slotArray={slotArrayRed} />
          </Box>
          <Box sx={{ width: '50%', height: '100%', bgcolor: 'black', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AvailableCards slotArray={slotArrayBlue} align={'right'} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h4' align='center' sx={{ py: 2 }}>Opponent</Typography>
        <GameDecks slotArray={slotArrayBlue} setSlotArray={setSlotArrayBlue} slotIndex={slotIndexBlue} setSlotIndex={setSlotIndexBlue} setDialogOpen={setDialogOpenBlue} align={'right'}
          decks={decks} setDecks={setDecks} />
      </Box>


      {dialogOpenRed &&
        <DeckBuilder slotArray={slotArrayRed} setSlotArray={setSlotArrayRed} slotIndex={slotIndexRed} dialogOpen={dialogOpenRed} setDialogOpen={setDialogOpenRed}  decks={decks} setDecks={setDecks}/>
      } {dialogOpenBlue &&
        <DeckBuilder slotArray={slotArrayBlue} setSlotArray={setSlotArrayBlue} slotIndex={slotIndexBlue} dialogOpen={dialogOpenBlue} setDialogOpen={setDialogOpenBlue}  decks={decks} setDecks={setDecks}/>
      }
    </Box>
  );
}

export default Home;
