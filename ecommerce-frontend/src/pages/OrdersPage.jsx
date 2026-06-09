import { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material'
import { LocalShipping, Schedule, CheckCircle } from '@mui/icons-material'
import MainLayout from '../layouts/MainLayout'
import { formatPrice } from '../utils/formatPrice'
import LoadingSpinner from '../components/Loading'
import EmptyState from '../components/EmptyState'
import { orderService } from '../services/orderService'
import { useAuth } from '../context/AuthContext'

const statusConfig = {
  en_attente: {
    label: 'Pending',
    color: 'warning',
    icon: Schedule,
  },
  validee: {
    label: 'Confirmed',
    color: 'info',
    icon: LocalShipping,
  },
  livree: {
    label: 'Delivered',
    color: 'success',
    icon: CheckCircle,
  },
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await orderService.getOrders(currentPage)
        setOrders(response.data)
        setTotalPages(response.meta.last_page)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [currentPage, isAuthenticated])

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    )
  }

  if (orders.length === 0) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <EmptyState
            title="Aucune commande"
            message="Vous n'avez pas encore passé de commande. Commencez vos achats maintenant!"
          />
        </Container>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          My Orders
        </Typography>

        <Grid container spacing={3}>
          {orders.map((order) => {
            const config = statusConfig[order.status] || statusConfig.en_attente
            const StatusIcon = config.icon

            return (
              <Grid item xs={12} key={order.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: 4,
                    },
                  }}
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: 'text.secondary' }}
                        >
                          Order ID
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          #{order.id}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: 'text.secondary' }}
                        >
                          Order Date
                        </Typography>
                        <Typography variant="body2">
                          {new Date(order.created_at).toLocaleDateString()}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: 'text.secondary' }}
                        >
                          Total
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: 'primary.main' }}
                        >
                          {formatPrice(order.total)}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <StatusIcon
                            sx={{ color: `${config.color}.main` }}
                          />
                          <Chip
                            label={config.label}
                            color={config.color}
                            size="small"
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Expanded Details */}
                    {expandedOrder === order.id && (
                      <Box sx={{ mt: 3, borderTop: '1px solid #eee', pt: 3 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 2 }}
                        >
                          Delivery Address
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            mb: 2,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {order.delivery_address}
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 2 }}
                        >
                          Order Items
                        </Typography>

                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.product.name}</TableCell>
                                  <TableCell align="right">
                                    {item.quantity}
                                  </TableCell>
                                  <TableCell align="right">
                                    {formatPrice(item.price)}
                                  </TableCell>
                                  <TableCell align="right">
                                    {formatPrice(item.subtotal)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Box
                          sx={{
                            mt: 2,
                            textAlign: 'right',
                            borderTop: '1px solid #eee',
                            pt: 2,
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Subtotal: {formatPrice(order.total)}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Tax (10%): {formatPrice(order.total * 0.1)}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: 'primary.main' }}
                          >
                            Total: {formatPrice(order.total * 1.1)}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </MainLayout>
  )
}


