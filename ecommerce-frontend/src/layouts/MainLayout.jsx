import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
