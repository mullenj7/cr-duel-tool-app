import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, Dialog, CardActions, Button, Tab, Tabs, IconButton, Tooltip, ButtonBase } from '@mui/material';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/Delete';


import ConfirmationDialog from '../../components/Dialogs/ConfirmationDialog';
import DeckComponent from '../../components/Cards/DeckComponent';
import DeckBuilder from '../../components/Dialogs/DeckBuilder';


function Settings() {
  const EMPTY_DECK = [{}, {}, {}, {}, {}, {}, {}, {}];
  const tester = [{ id: 76, img: 'Images/goblins.png', hasHero: true, rarity: 0 },
  { id: 77, img: 'Images/goblinstein.png', winCon: true, rarity: 4 },
  { id: 78, img: 'Images/golden-knight.png', rarity: 4 },
  { id: 79, img: 'Images/golem.png', winCon: true, rarity: 2 },
  { id: 80, img: 'Images/graveyard.png', winCon: true, rarity: 3 },
  { id: 81, img: 'Images/guards.png', rarity: 2 },
  { id: 82, img: 'Images/heal-spirit.png', rarity: 0 },
  { id: 83, img: 'Images/hog-rider.png', winCon: true, rarity: 1 }];
  const [decks, setDecks] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(EMPTY_DECK);
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const ImageButton = styled(ButtonBase)(({ theme }) => ({ // courtesy material UI
    position: 'relative',
    width: '100%',
    height: 150,
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));


  const handleChange = (newValue) => {
    if (newValue >= decks.length) { // if adding new deck
      const arr = [...decks];
      arr.push(EMPTY_DECK); // insert blank deck
      setDecks(arr);
      //setDialogOpen(true);
    }
    else {
      setCurrentDeck(decks[newValue]);
    };
    setValue(newValue);

  };

  useEffect(()=>{console.log(currentDeck)},[currentDeck]);


  useEffect(() => {
    //console.log(decks, value);
    if (decks && decks.length >= 1) {
      setCurrentDeck(decks[value]);
    }
    else setValue(false);
  }, [decks]);

  const handleDeleteDeck = () => {
    const arr = [...decks];
    setDecks(
      decks.filter((d, index) => { return index !== value })
    );
    if (arr.length <= 1) { // no more decks
      setValue(false);
      setCurrentDeck(EMPTY_DECK);
    }
    else {
      setValue(0);
      setCurrentDeck(decks[0]);
    }
    setDeleteDialogOpen(false);
  }

  const DeckButtons = () => {
    return <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Tooltip title={'Edit Deck'}><IconButton size={'medium'} color='blue' sx={{ border: 2 }} onClick={() => { }}><CreateRoundedIcon /></IconButton></Tooltip>
    </Box>

  }

  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'space-evenly', p: 10 }}>
      <Card elevation={1} sx={{ width: '70%', height: '100%', display: 'flex', justifyContent: 'center', p: 4, minHeight: 400 }}>
        {decks.length > 0 ?
          <>
            <Box sx={{ display: 'flex', border: 1, borderBottom: 1, borderColor: 'divider', width: '10%', height: '100%', bgcolor: 'yellow', flexDirection: 'column', flexGrow: 1, justifyContent: 'flex-start' }}>
              <Tabs value={value} onChange={(event, val) => { handleChange(val) }} orientation="vertical" indicatorColor="secondary">
                {decks.map((d, i) => {
                  return <Tab label={'Deck ' + (i + 1)} key={`saved-deck-tab-${i}`}/>
                })}
                {
                  decks.length < 10 && // max 10 decks
                  <Tooltip title={'Add New Deck'}><Tab label={<AddRoundedIcon />}></Tab></Tooltip>
                }
              </Tabs>
            </Box>
            <Box sx={{ width: '90%', bgcolor: 'blue', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                {decks.map((d, i) => {
                  return <Box value={value} index={i} hidden={value !== i} key={`saved-deck-${i}`}>
                    <Button onClick={() => { setDialogOpen(true); }}>
                      <DeckComponent slots={currentDeck} setSlots={setCurrentDeck} isInteractive={false} DeckButtons={DeckButtons} isClickable={true} isLarge={true} />
                    </Button>
                  </Box>
                })}

              </Box>
              <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'end', bgcolor: 'green' }}>
                <Tooltip title={'Delete Deck'}>
                  <IconButton size='medium' sx={{ border: 2, color: 'red', }}
                    onClick={() => { setDeleteDialogOpen(true); }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Box>
          </>
          :
          <Box sx={{ p: 4, minHeight: 400, display: 'flex', justifyContent: 'center' }}>
            <ImageButton focusRipple
              onClick={() => { handleChange(0) }}>
              <Typography
                component="span"
                variant="subtitle1"
                sx={[
                  {
                    color: 'inherit',
                  },
                  (theme) => ({
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: `calc(${theme.spacing(1)} + 6px)`,
                  }),
                ]}
              >
                Add Deck
              </Typography>
            </ImageButton>
          </Box>
        }
      </Card>
      {dialogOpen &&
        <DeckBuilder slotArray={decks} setSlotArray={setDecks} slotIndex={value} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} decks={decks} setDecks={setDecks} loadDeck={false} filterUsedCards={false}/>
      }
      {
        deleteDialogOpen &&
        <ConfirmationDialog title={'Delete Deck'} body={'Are you sure you want to delete deck?'} onClose={() => { setDeleteDialogOpen(false) }} onSubmit={() => { handleDeleteDeck() }}
          closeText={'Cancel'} submitText={'Delete'} dialogOpen={deleteDialogOpen} />
      }
    </Box>

  );
}

export default Settings;
