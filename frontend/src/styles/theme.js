import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#41475f',
      dark: '#484f6a',
    },
    secondary: {
      main: '#ff8334',
      dark: '#f96a10',
      contrastText: '#ffffff',
      light: '#FF8334',
    },
  },
});
