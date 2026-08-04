import '../../index.css'

const theme = {
  components: {
    MuiCssBaseline: {
      // styleOverrides: `
      //   @font-face {
      //     font-family: 'SofiaSans';
      //     font-style: normal;
      //     font-display: swap;
      //     src: local('SofiaSans'), local('SofiaSans-Regular'), url(${SofiaSans}) format('woff2');
      //   },
      //  @font-face {
      //     font-family: 'SofiaSansItalic';
      //     font-style: normal;
      //     font-display: swap;
      //     src: local('SofiaSansItalic'), local('SofiaSans-BoldItalic'), url(${SofiaSansItalic}) format('woff2');
      //   }
      // `,
    },
  },
  "typography": {
    "fontWeightLight": 200,
    "fontWeightMedium": 400,
    "fontWeightBold": 600,
    "fontWeightRegular": 600,
    "fontSize": 15,
    fontFamily: 'Sofia Sans',

    h3: {
      fontSize: 40,
      fontWeight: 800,
      fontFamily: 'Sofia Sans',
    },

    h1:{
      fontSize: 90,
      fontWeight: 1000,
      fontStyle: 'italic',
      fontFamily: 'Sofia Sans',
    }
  },
  "palette": {
    "primary": {
      "main": "#836311" // need to update in index.css amplify too whenever changing
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
    },
    "border":{
      "main":"#b0b0b099",
    },
  },
  "shape": {
    "borderRadius": 12.5
  },
  "spacing": 7
}

export default theme;

