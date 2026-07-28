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
import { markdown, markdown1, markdown2 } from '../../static';
import im from '../../static/Capture.PNG'

function Home() {

  const navigate = useNavigate();
  const { checkUserDetails } = useContext(UserContext);

  const theme = useTheme();

  useEffect(() => {
    checkUserDetails();
  }, []);

  const bulletPoint = (
    <Box sx={{ transform: 'scale(2)', color: theme.palette.background.dark }}>
      •
    </Box>
  );

  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card elevation={0} sx={{
        width: '100%', height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start',
        display: 'flex', flexDirection: 'column', mx: 5, px: 4, py: 2, minHeight: 700
      }}>
        <Typography variant='subtitle2' textAlign='left'>
          <Markdown>{markdown1}</Markdown>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', py: 5 }}>
          <img src='icon_menu_battle.png' alt='icon_menu_battle.png' style={{ height: 50 }}></img>
          {bulletPoint}
          <img src='icon_menu_clan_wars.png' alt='icon_menu_clan_wars.png' style={{ height: 50 }}></img>
          {bulletPoint}
          <img src='icon_menu_cards.png' alt='icon_menu_cards.png' style={{ height: 50 }}></img>
        </Box>
        <Typography variant='subtitle2' textAlign='left'>
          <Markdown>{markdown2}</Markdown>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', py: 5 }}>
          <img src='Blue Crown Animated 2.gif' alt='Blue Crown Animated 2.gif' style={{ height: 150 }}></img>
        </Box>
      </Card>
      <Divider orientation="vertical" variant="middle" sx={{ height: 600, }} />
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, py: 7, px: 5, borderRadius: '1%' }}>
          <Button onClick={() => { navigate('/play',); }} sx={{ height: '100%', width: '100%', }}>
            <Typography variant='h1' sx={{ border: 2, p: 3 }}>Play Match</Typography>
          </Button>
        </Card>
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, py:2,px:2 }}>
          <Button onClick={() => { navigate('/decks',); }} sx={{ height: '100%', width: '100%', }}>
            <Typography variant='h5' sx={{  }}>My Decks</Typography>
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
