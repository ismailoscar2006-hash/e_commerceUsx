import { Box, Typography, Button } from '@mui/material'
import { ShoppingCart, Search } from '@mui/icons-material'

export default function EmptyState({ title, message, icon: Icon = ShoppingCart, action }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        gap: 2,
        py: 8,
      }}
    >
      <Icon sx={{ fontSize: 80, color: 'text.disabled' }} />
      <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.secondary' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.disabled', maxWidth: 400, textAlign: 'center' }}>
        {message}
      </Typography>
      {action && (
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          {action.label}
        </Button>
      )}
    </Box>
  )
}
