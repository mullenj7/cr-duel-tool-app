import { styled } from '@mui/material/styles';
import {  ButtonBase,  } from '@mui/material';



export const GeneralButton  = styled(ButtonBase)(({ theme }) => ({ // courtesy material UI
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