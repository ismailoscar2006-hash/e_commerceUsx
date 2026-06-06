import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Paper,
  Alert,
} from '@mui/material'
import { Delete as DeleteIcon, ShoppingCart } from '@mui/icons-material'
import MainLayout from '../layouts/MainLayout'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

export default function CartPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { cart, loading, fetchCart, updateQuantity, removeItem, clearCart, getCartTotal } = useCart()
  const [updating, setUpdating] = useState({})
  const [removing, setRemoving] = useState({})

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    }
  }, [isAuthenticated])

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    setUpdating((prev) => ({ ...prev, [itemId]: true }))
    await updateQuantity(itemId, newQuantity)
    setUpdating((prev) => ({ ...prev, [itemId]: false }))
  }

  const handleRemoveItem = async (itemId) => {
    setRemoving((prev) => ({ ...prev, [itemId]: true }))
    await removeItem(itemId)
    setRemoving((prev) => ({ ...prev, [itemId]: false }))
  }

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart()
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="info">
            Please <Button onClick={() => navigate('/login')}>login</Button> to view your cart
          </Alert>
        </Container>
      </MainLayout>
    )
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
          <EmptyState
            title="Your Cart is Empty"
            message="Start shopping to add items to your cart"
            icon={ShoppingCart}
            action={{ label: 'Continue Shopping', path: '/products' }}
          />
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          Shopping Cart
        </Typography>

        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box
                            component="img"
                            src={item.product.image || 'https://via.placeholder.com/80?text=No+Image'}
                            alt={item.product.name}
                            sx={{
                              width: 80,
                              height: 80,
                              objectFit: 'cover',
                              borderRadius: 1,
                              backgroundColor: '#f5f5f5',
                            }}
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.product.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              SKU: {item.product.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ fontWeight: 600 }}>
                          ${item.product.price}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          inputProps={{ min: 1, max: 999, style: { textAlign: 'center' } }}
                          size="small"
                          sx={{ width: 70 }}
                          disabled={updating[item.id]}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ fontWeight: 600 }}>
                          ${item.subtotal.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removing[item.id]}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button
                color="error"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </Box>
          </Grid>

          {/* Cart Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, position: { md: 'sticky' }, top: { md: 20 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Order Summary
              </Typography>

              <Box sx={{ borderTop: '1px solid #eee', pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>${getCartTotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography color="text.secondary">FREE</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Tax</Typography>
                  <Typography>${(getCartTotal() * 0.1).toFixed(2)}</Typography>
                </Box>

                <Box
                  sx={{
                    borderTop: '2px solid #eee',
                    pt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ${(getCartTotal() * 1.1).toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}
