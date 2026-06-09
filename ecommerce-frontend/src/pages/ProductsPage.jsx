import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Pagination,
  TextField,
  InputAdornment,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import MainLayout from '../layouts/MainLayout'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/Loading'
import EmptyState from '../components/EmptyState'
import { productService } from '../services/productService'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { TRANSLATIONS as T } from '../constants/translations'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category_id') || '')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await productService.getProducts(
          currentPage,
          searchQuery,
          selectedCategory
        )
        setProducts(response.data)
        setTotalPages(response.meta.last_page)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, searchQuery, selectedCategory])

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    setSearchParams({
      search: searchQuery,
      category_id: selectedCategory,
      page: 1,
    })
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Veuillez vous connecter pour ajouter des articles au panier',
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
          message: T.SUCCESS.ADDED_TO_CART,
          type: 'success',
        })
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Erreur lors de l\'ajout au panier',
          type: 'error',
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de l\'ajout au panier',
        type: 'error',
      })
    }
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ width: '100%' }}>
            {/* Search Bar */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                mb: 4,
                display: 'flex',
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                placeholder={T.FORMS.SEARCH_PLACEHOLDER}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Products Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : products.length > 0 ? (
              <>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        index={index}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            ) : (
              <EmptyState
                title="Aucun produit trouvé"
                message="Essayez d'ajuster vos filtres de recherche ou recherchez d'autres produits"
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


