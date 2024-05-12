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
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
});
