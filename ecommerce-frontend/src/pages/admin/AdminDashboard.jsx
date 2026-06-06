import { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import {
  People,
  ShoppingCart,
  Inventory2,
  WarningAmber,
} from '@mui/icons-material'
import AdminLayout from '../../layouts/AdminLayout'
import { adminService } from '../../services/adminService'

const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
              {value}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 50, color: `${color}.light`, opacity: 0.8 }} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={People}
            label="Total Users"
            value={stats?.totalUsers || 0}
            color="primary"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={Inventory2}
            label="Total Products"
            value={stats?.totalProducts || 0}
            color="secondary"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={ShoppingCart}
            label="Total Orders"
            value={stats?.totalOrders || 0}
            color="success"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={WarningAmber}
            label="Low Stock Products"
            value={stats?.lowStockProducts || 0}
            color="warning"
          />
        </Grid>
      </Grid>

      <Card sx={{ mt: 4, p: 3, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Quick Actions
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Use the sidebar menu to manage products, categories, orders, and users.
        </Typography>
      </Card>
    </AdminLayout>
  )
}
