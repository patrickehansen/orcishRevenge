import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#003b5e',//'#556cd6',
    },
    secondary: {
      main: '#0c300c',
    },
    common: {
      blueGray: '#5A6E78',
      white: '#d8d8d8',
    },
    tertiary: {
      main: '#003b5e',
    },
    error: {
      main: '#440e0e',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
