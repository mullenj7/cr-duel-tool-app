import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';


import GameDecks from '../../components/Dialogs/GameDecks';
import AvailableCards from '../../components/Lists/AvailableCards';
import { UserContext } from '../../context/UserContext';
import DeckBuilder from '../../components/Dialogs/DeckBuilder';

function Play() {

  const [userDecks, setUserDecks] = useState([]);
  const [slotArrayRed, setSlotArrayRed] = useState([]);
  const [slotArrayBlue, setSlotArrayBlue] = useState([]);

  const [dialogOpenRed, setDialogOpenRed] = useState(false);
  const [dialogOpenBlue, setDialogOpenBlue] = useState(false);

  const [slotIndexRed, setSlotIndexRed] = useState(0);
  const [slotIndexBlue, setSlotIndexBlue] = useState(0);


  const { userDetails, userSignedIn } = useContext(UserContext);

  useEffect(() => {
    if (userDetails && userDetails.decks) {
      setUserDecks(userDetails.decks);
    }
  }, [userDetails]);


  return (
    <Paper elevation={0} sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'space-evenly', pb: 20, pt: 2, borderRadius: '0%' }}>
      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
        <Typography variant='h4' align='center' sx={{ py: 2, typography: { lg: 'h5', xl: 'h4' } }}>You</Typography>
        <GameDecks slotArray={slotArrayRed} setSlotArray={setSlotArrayRed} slotIndex={slotIndexRed} setSlotIndex={setSlotIndexRed} setDialogOpen={setDialogOpenRed}
        />
      </Box>
      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h4' align='center' sx={{ py: 2, typography: { lg: 'h5', xl: 'h4' } }}>Available Cards</Typography>
        <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex',}}>
          <Box sx={{ width: '50%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AvailableCards slotArray={slotArrayRed} />
          </Box>
          <Box sx={{ width: '50%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AvailableCards slotArray={slotArrayBlue} align={'right'} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h4' align='center' sx={{ py: 2, typography: { lg: 'h5', xl: 'h4' } }}>Opponent</Typography>
        <GameDecks slotArray={slotArrayBlue} setSlotArray={setSlotArrayBlue} slotIndex={slotIndexBlue} setSlotIndex={setSlotIndexBlue} setDialogOpen={setDialogOpenBlue} align={'right'}
        />
      </Box>


      {dialogOpenRed &&
        <DeckBuilder slotArray={slotArrayRed} setSlotArray={setSlotArrayRed} slotIndex={slotIndexRed} dialogOpen={dialogOpenRed} setDialogOpen={setDialogOpenRed} decks={userDecks}
          setDecks={setUserDecks} loadDeck={userSignedIn && userDetails && userDetails.decks} userDetails={userDetails} />
      } {dialogOpenBlue &&
        <DeckBuilder slotArray={slotArrayBlue} setSlotArray={setSlotArrayBlue} slotIndex={slotIndexBlue} dialogOpen={dialogOpenBlue} setDialogOpen={setDialogOpenBlue} decks={userDecks}
          setDecks={setUserDecks} loadDeck={userSignedIn && userDetails && userDetails.decks} userDetails={userDetails} />
      }
    </Paper>
  );
}

export default Play;
