import { Box, CircularProgress, Typography } from '@mui/material'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {message}
      </Typography>
    </Box>
  )
}
