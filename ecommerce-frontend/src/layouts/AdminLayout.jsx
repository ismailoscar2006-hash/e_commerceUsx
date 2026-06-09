import { Box, Container } from '@mui/material'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/AdminSidebar'
import { colors } from '../constants/designTokens'

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', backgroundColor: colors.background }}>
      <Navbar />
      <AdminSidebar>
        <Box sx={{ flex: 1, overflow: 'auto', py: { xs: 3, md: 4 } }}>
          <Container maxWidth="lg">
            {children}
          </Container>
        </Box>
      </AdminSidebar>
    </Box>
  )
}
