import { Button, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'

export default function PremiumButton({ loading, children, ...props }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button {...props} disabled={loading || props.disabled}>
        {loading ? <CircularProgress size={20} color="inherit" /> : children}
      </Button>
    </motion.div>
  )
}
