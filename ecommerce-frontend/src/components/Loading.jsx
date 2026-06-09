import { Box, Typography, Skeleton } from '@mui/material'
import { motion } from 'framer-motion'
import { TRANSLATIONS as T } from '../constants/translations'

export default function LoadingSpinner({ message = T.LOADING.LOADING }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          gap: 3,
          py: 4,
        }}
      >
        <Box sx={{ position: 'relative', width: 56, height: 56 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '3px solid rgba(15, 76, 255, 0.15)',
              borderTopColor: '#2563EB',
            }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', fontFamily: 'Inter, sans-serif' }}
        >
          {message}
        </Typography>
      </Box>
    </motion.div>
  )
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <Box>
            <Skeleton variant="rounded" height={220} sx={{ borderRadius: '16px 16px 0 0', mb: 0 }} />
            <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: '0 0 16px 16px', border: '1px solid #E2E8F0' }}>
              <Skeleton width="40%" height={20} sx={{ mb: 1 }} />
              <Skeleton width="90%" height={24} sx={{ mb: 0.5 }} />
              <Skeleton width="70%" height={24} sx={{ mb: 2 }} />
              <Skeleton width="35%" height={32} sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rounded" height={40} sx={{ flex: 1, borderRadius: '12px' }} />
                <Skeleton variant="rounded" height={40} sx={{ flex: 1, borderRadius: '12px' }} />
              </Box>
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  )
}
