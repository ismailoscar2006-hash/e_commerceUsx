import { Box, Typography, Button } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'

export default function EmptyState({ icon = <ShoppingCart />, title, message, actionLabel, onAction }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Box sx={{ fontSize: 64, mb: 2, color: '#CBD5E1' }}>
        {icon}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ color: '#64748B', mb: 3 }}>
        {message}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  )
}
