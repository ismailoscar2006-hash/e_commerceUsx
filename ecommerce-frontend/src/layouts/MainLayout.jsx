import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { colors } from '../constants/designTokens'

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: colors.background }}>
      <Navbar />
      <Box sx={{ flex: 1, width: '100%' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
