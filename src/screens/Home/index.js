import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Markdown from 'react-markdown'

import GameDecks from '../../components/Dialogs/GameDecks';
import AvailableCards from '../../components/Lists/AvailableCards';
import { UserContext } from '../../context/UserContext';
import DeckBuilder from '../../components/Dialogs/DeckBuilder';
import { markdown } from '../../static';
import im from '../../static/Capture.PNG'

function Home() {

  const navigate = useNavigate();
  const { checkUserDetails } = useContext(UserContext);



  useEffect(() => {
    checkUserDetails();
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card elevation={0} sx={{
        width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-start',
        display: 'flex', flexDirection: 'column', textAlign: 'left', mx: 5, px: 4, py: 2, minHeight: 700
      }}>
        <Typography variant='subtitle2' textAlign='left'>
          <Markdown>{markdown}</Markdown>
        </Typography>
        <img src={'Blue Crown 1.png'} alt='hi' style={{ height: 50 }}></img>
      </Card>
      <Divider orientation="vertical" variant="middle" sx={{ height: 600, }} />
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Card sx={{ height: 300, width: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, borderLeftWidth: '500px', borderTopWidth: '30px', border: '0 solid red' }}>
          <Button onClick={() => { navigate('/play',); }} sx={{ height: '100%', width: '100%' }}>
            <Typography variant='h2'>  Play Match</Typography>
          </Button>
        </Card>
        <Card sx={{ height: 100, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <Button onClick={() => { navigate('/decks',); }} sx={{ height: '100%', width: '100%' }}>
            My Decks
          </Button>
        </Card>
      </Box>
    </Box>
    // <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //   <Card sx={{ height: 200, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 2,borderLeftWidth:'500px', borderTopWidth:'30px',border: '0 solid red' }}>
    //     <Button onClick={() => { navigate('/play',); }} sx={{ height: '100%', width: '100%' }}>
    //       Play Match
    //     </Button>
    //   </Card>
    //   <Card sx={{ height: 200, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 2 }}>
    //     <Button onClick={() => { navigate('/decks',); }} sx={{ height: '100%', width: '100%' }}>
    //       My Decks
    //     </Button>
    //   </Card>
    // </Box>
  );
}

export default Home;
