import { green } from "@mui/material/colors";
import TF2 from "../fonts/TF2Build.ttf";
import TF2secondary from "../fonts/TF2secondary.ttf";


const theme = {
  palette: {
    primary: {
      main: green[500],
      contrastText: '#ffffff',

    },
    secondary: {
      main: '#f50057',
      contrastText: '#ffffff',

    },
    text: {
      primary: 'rgba(201,17,17,0.87)',
      secondary: 'rgba(255,255,255,0.6)',
      disabled: 'rgba(29,222,215,0.38)',
      hint: '#2a00ff',

    },
  },
  typography: {
    "fontFamily": `"TF2secondary"`,
    h4: {
      "fontFamily": "TF2",
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'TF2';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('TF2'), local('TF2'), url(${TF2}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
         @font-face {
          font-family: 'TF2secondary';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('TF2secondary'), local('TF2secondary'), url(${TF2secondary}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
};

export default theme;