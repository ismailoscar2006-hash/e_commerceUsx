import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  TextField,
  Chip,
  Alert,
} from '@mui/material'
import { Add, Remove, ArrowBack, ShoppingCart } from '@mui/icons-material'
import MainLayout from '../layouts/MainLayout'
import LoadingSpinner from '../components/LoadingSpinner'
import { productService } from '../services/productService'
import { useCart } from '../hooks/useCart'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id)
        setProduct(response.data)
      } catch (error) {
        setError('Product not found')
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    const result = await addToCart(product.id, quantity)
    if (result.success) {
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    )
  }

  if (!product || error) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="error">{error || 'Product not found'}</Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Back to Products
          </Button>
        </Container>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400,
              }}
            >
              <CardMedia
                component="img"
                image={product.image_url || `http://127.0.0.1:8000/storage/default-product.jpg`}
                alt={product.name}
                onError={(e) => {
                  e.target.src = `http://127.0.0.1:8000/storage/default-product.jpg`
                }}
                sx={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            </Card>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            {product.category && (
              <Chip
                label={product.category.name}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}

            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ${product.price}
              </Typography>
              {product.stock === 0 ? (
                <Chip label="Out of Stock" color="error" />
              ) : product.stock < 5 ? (
                <Chip label={`Only ${product.stock} Left`} color="warning" />
              ) : (
                <Chip label="In Stock" color="success" />
              )}
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {product.description}
              </Typography>
            </Box>

            {addedToCart && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Product added to cart!
              </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                  borderRadius: 1,
                }}
              >
                <Button
                  size="small"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  <Remove />
                </Button>
                <TextField
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  type="number"
                  inputProps={{ min: 1, max: product.stock, style: { textAlign: 'center' } }}
                  sx={{
                    width: 60,
                    '& .MuiOutlinedInput-root': {
                      border: 'none',
                    },
                    '& input': {
                      textAlign: 'center',
                    },
                  }}
                />
                <Button
                  size="small"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity === product.stock}
                >
                  <Add />
                </Button>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </Box>

            <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Stock:</strong> {product.stock} units available
              </Typography>
              <Typography variant="body2">
                <strong>Category:</strong> {product.category?.name || 'Uncategorized'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}
