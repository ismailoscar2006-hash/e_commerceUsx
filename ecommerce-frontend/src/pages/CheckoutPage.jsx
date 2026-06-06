import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import MainLayout from '../layouts/MainLayout'
import LoadingSpinner from '../components/LoadingSpinner'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { orderService } from '../services/orderService'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { cart, getCartTotal, fetchCart } = useCart()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    delivery_address: user?.address || '',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const loadCart = async () => {
      await fetchCart()
      setLoading(false)
    }

    loadCart()
  }, [isAuthenticated])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      if (!formData.delivery_address.trim()) {
        setError('Please enter a delivery address')
        return
      }

      await orderService.placeOrder(formData.delivery_address)
      setSuccess(true)
      setTimeout(() => {
        navigate('/orders')
      }, 2000)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to place order. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="warning">
            Your cart is empty. <Button onClick={() => navigate('/cart')}>Go back to cart</Button>
          </Alert>
        </Container>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/cart')}
          sx={{ mb: 3 }}
        >
          Back to Cart
        </Button>

        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          Checkout
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Order placed successfully! Redirecting to your orders...
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Checkout Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Delivery Information
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Customer Name
                </Typography>
                <TextField
                  fullWidth
                  value={user?.name || ''}
                  disabled
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  value={user?.email || ''}
                  disabled
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Delivery Address *
                </Typography>
                <TextField
                  fullWidth
                  name="delivery_address"
                  value={formData.delivery_address}
                  onChange={handleChange}
                  placeholder="Enter your full delivery address"
                  multiline
                  rows={4}
                  required
                  sx={{ mb: 3 }}
                />

                <Box sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: 1, mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Shipping Method
                  </Typography>
                  <Typography variant="body2">
                    Standard Shipping - FREE (5-7 business days)
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    This is the only available shipping option
                  </Typography>
                </Box>

                <Box sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: 1, mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Payment Method
                  </Typography>
                  <Typography variant="body2">
                    Cash on Delivery (COD)
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Pay when you receive your order
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={submitting}
                  sx={{ py: 1.5 }}
                >
                  {submitting ? <CircularProgress size={24} /> : 'Place Order'}
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, position: { md: 'sticky' }, top: { md: 20 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Order Summary
              </Typography>

              <Box sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
                {cart.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      pb: 1,
                      mb: 1,
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">
                        {item.product.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        x {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      ${item.subtotal.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ borderTop: '2px solid #eee', pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>${getCartTotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography color="text.secondary">FREE</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Tax (10%)</Typography>
                  <Typography>${(getCartTotal() * 0.1).toFixed(2)}</Typography>
                </Box>

                <Box
                  sx={{
                    borderTop: '2px solid #eee',
                    pt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ${(getCartTotal() * 1.1).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}
