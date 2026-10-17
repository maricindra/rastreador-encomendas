'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,

  palette: {
    mode: 'dark',

    primary: {
      main: '#2C75FF',
      dark: '#1d4ed8',
      contrastText: '#000080',
    },

    background: {
      default: '#1A1929',
      paper: '#2C75FF',
    },

    text: {
      primary: '#f8fafc',
      secondary: '#89CFF0',
    },

    success: {
      main: '#22c55e',
    },

    warning: {
      main: '#f59e0b',
    },

    error: {
      main: '#f87171',
    },

    divider: '#1A1929',
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',

    h1: {
      fontWeight: 800,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 10,
          minHeight: 48,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #000080',
          backgroundImage: 'none',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

export default theme;