import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // blue-500 from your button color
    },
    background: {
      default: '#f3f1ea', // Your main background color
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#4b5563', // gray-600
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        outlined: {
          borderWidth: '2px',
          borderStyle: 'dashed',
          borderRadius: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevents uppercase text
          borderRadius: '6px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      },
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
}); 