import { createTheme } from '@mui/material/styles'
import { colors, gradients } from './constants/designTokens'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
    },
    secondary: {
      main: colors.secondary,
      light: '#1E293B',
      dark: '#020617',
    },
    accent: {
      main: colors.accent,
      light: '#FBBF24',
      dark: '#D97706',
    },
    background: {
      default: colors.background,
      paper: colors.card,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
    },
    success: {
      main: colors.success,
      light: '#86EFAC',
      dark: '#15803D',
    },
    error: {
      main: colors.danger,
      light: '#FCA5A5',
      dark: '#B91C1C',
    },
    warning: {
      main: colors.accent,
      light: '#FCD34D',
      dark: '#D97706',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '3rem',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
      color: colors.text,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.35,
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.65,
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.55,
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '10px',
          padding: '8px 18px',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '0.875rem',
          position: 'relative',
          overflow: 'hidden',
        },
        contained: {
          background: gradients.primary,
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
            transform: 'translateY(-1px)',
            background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
          },
          '&:active': { transform: 'translateY(0)' },
          '&.Mui-disabled': { opacity: 0.55, boxShadow: 'none', transform: 'none' },
        },
        outlined: {
          borderWidth: '1.5px',
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)',
          },
        },
        text: {
          color: colors.primary,
          '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.06)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(15, 23, 42, 0.06)',
          border: `1px solid ${colors.border}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: colors.card,
          backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: '16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#FAFBFC',
            transition: 'all 0.25s ease',
            fontSize: '0.875rem',
            '&:hover': { backgroundColor: '#FFFFFF' },
            '&.Mui-focused': { backgroundColor: '#FFFFFF' },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.75rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
          border: `1px solid ${colors.border}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 700,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: colors.textMuted,
            backgroundColor: '#F8FAFC',
            borderBottom: `1px solid ${colors.border}`,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
})

export default theme
