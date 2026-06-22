import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, Dialog, DialogTitle, Button, ButtonBase, Divider } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



import CardList from '../../components/Lists/CardList';
import { CardDrag } from '../../components/Cards/Card';
import { CardSlot } from '../../components/Cards/CardSlot';

import DeckBuilder from '../../components/Dialogs/DeckBuilder';
import DeckComponent from '../../components/Cards/DeckComponent';

function Home() {

  const theme = useTheme();
  const [slotArray, setSlotArray] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [slotIndex, setSlotIndex] = useState(0);

  const [slots1, setSlots1] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  const [slots2, setSlots2] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  const [slots3, setSlots3] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);


  const ImageButton = styled(ButtonBase)(({ theme }) => ({ // courtesy material UI
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
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

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'red', flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>
      <Box sx={{ width: '100%', height: '100%', bgcolor: 'green', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* {slotArray.length > 0 && <Box onClick={() => { setDialogOpen(true) }}>
          <DeckComponent slots={slotArray[0]} isInteractive={false} />
        </Box>} */}
        {slotArray.map((slot, i) => {
          return <Box onClick={() => { setDialogOpen(true); setSlotIndex(i) }}>
            <DeckComponent slots={slot} isInteractive={false} />
          </Box>
        })}

        {slotArray.length > 0 && <Divider orientation="horizontal" variant="middle" sx={{ py: 2, width: '80%', }} />}
        <ImageButton focusRipple
          onClick={() => { setDialogOpen(true); setSlotIndex(slotArray.length) }}>
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
            Add deck
          </Typography>
        </ImageButton>
      </Box>
      <Box sx={{ width: '50%', height: '100%', bgcolor: 'blue', flexGrow: 1, display: 'flex', }}>
        <Button variant="outlined" onClick={() => { setDialogOpen(true) }}>
          Open simple dialog
        </Button>
      </Box>
      <Box sx={{ width: '50%', height: '100%', bgcolor: 'black', flexGrow: 1, display: 'flex', }}>d</Box>
      <Box sx={{ width: '100%', height: '100%', bgcolor: 'yellow', flexGrow: 1, display: 'flex', }}>a</Box>


      {dialogOpen &&
        <DeckBuilder slotArray={slotArray} setSlotArray={setSlotArray} slotIndex={slotIndex} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      }
    </Box>
  );
}

export default Home;
