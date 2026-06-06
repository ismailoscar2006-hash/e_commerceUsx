import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material'
import { Search as SearchIcon, ArrowForward } from '@mui/icons-material'
import MainLayout from '../layouts/MainLayout'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import { productService } from '../services/productService'
import { categoryService } from '../services/categoryService'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

export default function HomePage() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(1),
          categoryService.getAllCategories(),
        ])
        setProducts(productsData.data.slice(0, 6))
        setCategories(categoriesData.slice(0, 4))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Please login to add items to cart',
        type: 'warning',
      })
      setTimeout(() => navigate('/login'), 1500)
      return
    }

    try {
      const result = await addToCart(productId, 1)
      if (result.success) {
        setSnackbar({
          open: true,
          message: 'Product added to cart!',
          type: 'success',
        })
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Failed to add to cart',
          type: 'error',
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error adding to cart',
        type: 'error',
      })
    }
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: '#fff',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Welcome to TechStore
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Discover the Latest Electronics and Gadgets
          </Typography>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              maxWidth: 500,
              mx: 'auto',
              display: 'flex',
              gap: 2,
              mb: 4,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  color: '#000',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#ff9800',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#f57c00',
                },
                px: 4,
              }}
            >
              Search
            </Button>
          </Box>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: '#ff9800',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
          }}
        >
          Shop by Category
        </Typography>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => navigate(`/products?category_id=${category.id}`)}
              >
                <CardMedia
                  sx={{
                    height: 200,
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    {category.name}
                  </Typography>
                </CardMedia>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Products */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
              }}
            >
              Featured Products
            </Typography>
            <Button
              color="primary"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/products')}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <LoadingSpinner />
          ) : products.length > 0 ? (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState
              title="No Products Available"
              message="Check back soon for new products"
            />
          )}
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  )
}
