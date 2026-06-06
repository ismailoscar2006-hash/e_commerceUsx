import { Box, Container } from '@mui/material'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <AdminSidebar />
        <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', overflow: 'auto' }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  )
}
