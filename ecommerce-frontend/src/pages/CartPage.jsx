import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductImageUrl } from '../utils/productImage'
import { formatPrice } from '../utils/formatPrice'
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
import LoadingSpinner from '../components/Loading'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { TRANSLATIONS as T } from '../constants/translations'

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
    if (window.confirm('Êtes-vous sûr de vouloir vider votre panier?')) {
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
            Veuillez vous <Button onClick={() => navigate('/login')}>connecter</Button> pour voir votre panier
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
            title="Votre panier est vide"
            message="Commencez vos achats pour ajouter des articles à votre panier"
            icon={<ShoppingCart sx={{ fontSize: 64 }} />}
          />
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/products')}
            >
              Continuer vos achats
            </Button>
          </Box>
        </Container>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #111827 0%, #2563EB 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              }}
            >
              Panier
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {cart.items.length} article{cart.items.length > 1 ? 's' : ''} dans votre panier
            </Typography>
          </Box>

        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 24px rgba(15, 23, 42, 0.06)',
                overflow: 'hidden',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produit</TableCell>
                    <TableCell align="right">Prix</TableCell>
                    <TableCell align="center">Quantité</TableCell>
                    <TableCell align="right">Sous-total</TableCell>
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
                            src={getProductImageUrl(item.product)}
                            alt={item.product.name}
                            loading="lazy"
                            sx={{
                              width: 80,
                              height: 80,
                              objectFit: 'cover',
                              borderRadius: '12px',
                              backgroundColor: '#F1F5F9',
                              border: '1px solid #E2E8F0',
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
                          {formatPrice(item.product.price)}
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
                          {formatPrice(item.subtotal)}
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
                Vider le panier
              </Button>
            </Box>
          </Grid>

          {/* Cart Summary */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                position: { md: 'sticky' },
                top: { md: 88 },
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 8px 32px rgba(37, 99, 235, 0.08)',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontFamily: 'Poppins' }}>
                Résumé de commande
              </Typography>

              <Box sx={{ borderTop: '1px solid #E5E7EB', pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Sous-total</Typography>
                  <Typography>{formatPrice(getCartTotal())}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Livraison</Typography>
                  <Typography color="text.secondary">GRATUITE</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Taxe</Typography>
                  <Typography>{formatPrice(getCartTotal() * 0.1)}</Typography>
                </Box>

                <Box
                  sx={{
                    borderTop: '2px solid #E5E7EB',
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
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {formatPrice(getCartTotal() * 1.1)}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="medium"
                  onClick={handleCheckout}
                  sx={{ py: 1.25, fontWeight: 700 }}
                >
                  Commander
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1.5 }}
                  onClick={() => navigate('/products')}
                >
                  Continuer vos achats
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
        </Container>
      </Box>
    </MainLayout>
  )
}


