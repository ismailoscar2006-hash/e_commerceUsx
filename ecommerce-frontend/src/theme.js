import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1E40AF',
    },
    secondary: {
      main: '#1E293B',
      light: '#475569',
      dark: '#0F172A',
    },
    accent: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
    success: {
      main: '#22C55E',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Inter', 'sans-serif'].join(','),
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.5px',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.25px',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.5px',
    },
    caption: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '10px 24px',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#F1F5F9',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E2E8F0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CBD5E1',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme
