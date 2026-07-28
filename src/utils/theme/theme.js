import { green } from "@mui/material/colors";
import SofiaSans from '../../static/fonts/Sofia_Sans/SofiaSans-VariableFont_wght.ttf'


const theme = {
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'SofiaSans';
          font-style: normal;
          font-display: swap;
          src: local('SofiaSans'), local('SofiaSans-Regular'), url(${SofiaSans}) format('woff2');
        }
      `,
    },
  },
  "typography": {
    "fontWeightLight": 200,
    "fontWeightMedium": 400,
    "fontWeightBold": 600,
    "fontWeightRegular": 400,
    "fontSize": 15,
    fontFamily: 'SofiaSans',

    h3: {
      fontSize: 40,
      fontWeight: 800,
    },
  },
  "palette": {
    "primary": {
      "main": "#9e740b"
    },
    "background": {
      "default": "#faf9f4",
      "paper": "#ffffff",
      "dark":"#1e1e1e",
    },
    "secondary": {
      "main": "#3792ff"
    },
    "error": {
      "main": "#aa1212"
    },
    "text": {
      "secondary": "#00000099",
      "gray":"#b8b8b899",
    }
  },
  "shape": {
    "borderRadius": 12.5
  },
  "spacing": 7
}

export default theme;

