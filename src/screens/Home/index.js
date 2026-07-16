import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


import GameDecks from '../../components/Dialogs/GameDecks';
import AvailableCards from '../../components/Lists/AvailableCards';
import { UserContext } from '../../context/UserContext';
import DeckBuilder from '../../components/Dialogs/DeckBuilder';

function Home() {

  const navigate = useNavigate();
  const { checkUserDetails } = useContext(UserContext);


  useEffect(() => {
    checkUserDetails();
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ height: 200, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 2 }}>
        <Button onClick={() => { navigate('/play', { replace: true }); }} sx={{ height: '100%', width: '100%' }}>
          Play Match
        </Button>
      </Card>
      <Card sx={{ height: 200, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 2 }}>
        <Button onClick={() => { navigate('/decks', { replace: true }); }} sx={{ height: '100%', width: '100%' }}>
          My Decks
        </Button>
      </Card>
    </Box>
  );
}

export default Home;
