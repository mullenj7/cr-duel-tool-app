import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Card, Button, Divider } from '@mui/material';


import { UserContext } from '../../context/UserContext';


function Home() {

  const navigate = useNavigate();
  const { checkUserDetails } = useContext(UserContext);

  const theme = useTheme();

  useEffect(() => {
    checkUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bulletPoint = (
    <Box sx={{ transform: 'scale(2)', color: theme.palette.background.dark }}>
      •
    </Box>
  );

  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%'
      }}>
        <Card elevation={0} sx={{
          width: '100%', alignItems: 'flex-start', justifyContent: 'space-evenly',
          display: 'flex', flexDirection: 'column', mx: 5, px: 4, py: 2,
        }}>
          <Typography variant='h4' textalign='left' sx={{typography:{lg:'h5', xl:'h4'}}}>
            {`What is Clash Royale Duel Tool?`}
          </Typography>
          <Typography variant='subtitle1' textalign='left' sx={{typography:{lg:'subtitle2', xl:'subtitle1'}}}>
            <br /><b style={{ fontWeight: 800 }}>Clash Royale Duel Tool</b> is a tool designed to help Clash Royale players pick and counter-pick their decks in <b style={{ fontWeight: 800 }}>Duel Format</b> matches.
          </Typography>
          <Typography variant='subtitle1' textalign='left' sx={{typography:{lg:'subtitle2', xl:'subtitle1'}}}>
            <br/>With this tool, players can visualize what cards have been played so far and what
            cards are still available, both for the player and their opponent. And use this information to build decks with the remaining cards available.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', py: 8 }}>
            <img src='icon_menu_battle.png' alt='icon_menu_battle.png' style={{ height: 50 }}></img>
            {bulletPoint}
            <img src='icon_menu_clan_wars.png' alt='icon_menu_clan_wars.png' style={{ height: 50 }}></img>
            {bulletPoint}
            <img src='icon_menu_cards.png' alt='icon_menu_cards.png' style={{ height: 50 }}></img>
          </Box>
          <Typography variant='h5' textalign='left' sx={{}}>
            {`Deck Saving`}
          </Typography>
          <Typography variant='subtitle1' textalign='left' sx={{typography:{lg:'subtitle2', xl:'subtitle1'}}}>
            <br />On top of this users can also create and save decks to quickly load planned deck picks, or even to use as templates.{"\n"}
          </Typography>
          <Typography variant='subtitle1' textalign='left' sx={{typography:{lg:'subtitle2', xl:'subtitle1'}}}>
            Click on <b style={{ fontWeight: 800 }}>'Play Match'</b> and try it out!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', }}>
            <img src='Blue Crown Animated 2.gif' alt='Blue Crown Animated 2.gif' style={{ height: 120 }}></img>
          </Box>
        </Card>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Divider orientation="vertical" sx={{ height: 600, }} />
      </Box>
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <Card sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, borderRadius: '1%', border: 1, borderColor: theme.palette.border.main,
            '&:hover': {
              opacity: "60%",
            },
          }}>
            <Button onClick={() => { navigate('/play',); }} sx={{ py: 7, px: 5, }}>
              <Typography  sx={{ border: 2, p: 3,typography:{lg:'h2',xl:'h1'}  }}>Play Match</Typography>
            </Button>
          </Card>
          <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, borderRadius: '1%', border: 1, borderColor: theme.palette.border.main }}>
            <Button onClick={() => { navigate('/decks',); }} sx={{ py: 2, px: 3, borderRadius: '1%' }}>
              <Typography sx={{ fontWeight: 600,}}>My Decks</Typography>
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>

  );
}

export default Home;
