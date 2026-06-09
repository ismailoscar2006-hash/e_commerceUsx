import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { orderService } from '../../services/orderService'

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
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await orderService.getDashboardStats()
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
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, fontFamily: 'Poppins, sans-serif' }}>
        Tableau de bord
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={People}
            label="Utilisateurs totaux"
            value={stats?.totalUsers || 0}
            color="primary"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={Inventory2}
            label="Produits totaux"
            value={stats?.totalProducts || 0}
            color="secondary"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={ShoppingCart}
            label="Commandes totales"
            value={stats?.totalOrders || 0}
            color="success"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={WarningAmber}
            label="Produits en stock faible"
            value={stats?.lowStockProducts || 0}
            color="warning"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, fontFamily: 'Poppins, sans-serif' }}>
          Actions rapides
        </Typography>

        <Grid container spacing={3}>
          {/* Produits Card */}
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card
              onClick={() => navigate('/admin/products')}
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
                border: '1px solid #E2E8F0',
                '&:hover': {
                  boxShadow: '0 12px 32px rgba(37, 99, 235, 0.12)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                  }}
                >
                  <Inventory2 sx={{ color: '#FFFFFF', fontSize: 32 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Produits
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Gérer les produits
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Catégories Card */}
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card
              onClick={() => navigate('/admin/categories')}
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
                border: '1px solid #E2E8F0',
                '&:hover': {
                  boxShadow: '0 12px 32px rgba(139, 92, 246, 0.12)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)',
                  }}
                >
                  <Inventory2 sx={{ color: '#FFFFFF', fontSize: 32 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Catégories
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Gérer les catégories
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Commandes Card */}
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card
              onClick={() => navigate('/admin/orders')}
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
                border: '1px solid #E2E8F0',
                '&:hover': {
                  boxShadow: '0 12px 32px rgba(217, 70, 239, 0.12)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #D946EF 0%, #C026D3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 4px 14px rgba(217, 70, 239, 0.35)',
                  }}
                >
                  <ShoppingCart sx={{ color: '#FFFFFF', fontSize: 32 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Commandes
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Gérer les commandes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Utilisateurs Card */}
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card
              onClick={() => navigate('/admin/users')}
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
                border: '1px solid #E2E8F0',
                '&:hover': {
                  boxShadow: '0 12px 32px rgba(236, 72, 153, 0.12)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 4px 14px rgba(236, 72, 153, 0.35)',
                  }}
                >
                  <People sx={{ color: '#FFFFFF', fontSize: 32 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Utilisateurs
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Gérer les utilisateurs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}
