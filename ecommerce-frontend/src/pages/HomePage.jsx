import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material'
import { motion } from 'framer-motion'
import {
  Search as SearchIcon,
  ArrowForward,
  LocalShipping,
  Security,
  SupportAgent,
  Replay,
  Smartphone,
  Laptop,
  DesktopMac,
  SportsEsports,
  Watch,
  Headphones,
  Print,
  CameraAlt,
  Monitor,
  Keyboard,
  Mouse,
  Wifi,
  Storage,
  Toys,
  ChargingStation,
  Tablet,
  Speaker,
} from '@mui/icons-material'
import MainLayout from '../layouts/MainLayout'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/Loading'
import EmptyState from '../components/EmptyState'
import PremiumButton from '../components/PremiumButton'
import { productService } from '../services/productService'
import { categoryService } from '../services/categoryService'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { TRANSLATIONS as T } from '../constants/translations'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const CATEGORY_COLORS = ['#EFF6FF', '#F0FDF4', '#FFF7ED', '#FDF4FF', '#ECFEFF', '#FEF2F2']

const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'smartphones': Smartphone,
    'laptops': Laptop,
    'desktop': DesktopMac,
    'gaming': SportsEsports,
    'tablets': Tablet,
    'watches': Watch,
    'smartwatches': Watch,
    'headphones': Headphones,
    'speakers': Speaker,
    'earbuds': Headphones,
    'monitors': Monitor,
    'keyboards': Keyboard,
    'mice': Mouse,
    'mouse': Mouse,
    'printers': Print,
    'cameras': CameraAlt,
    'networking': Wifi,
    'storage': Storage,
    'chargers': ChargingStation,
    'powerbanks': Toys,
    'accessories': Toys,
  }

  const name = categoryName.toLowerCase()
  for (const [key, icon] of Object.entries(iconMap)) {
    if (name.includes(key)) {
      return icon
    }
  }
  return Smartphone // default
}

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
          message: 'Produit ajouté au panier!',
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

  const featuredProducts = products.slice(0, 3)
  const bestSellers = products.slice(3, 6)

  const benefits = [
    { icon: <LocalShipping />, title: 'Livraison Rapide', desc: 'Gratuite dès 50 € d\'achat' },
    { icon: <Security />, title: 'Paiement Sécurisé', desc: 'Transactions 100% protégées' },
    { icon: <SupportAgent />, title: 'Support 7j/7', desc: 'Une équipe à votre écoute' },
    { icon: <Replay />, title: 'Retours Faciles', desc: '30 jours pour changer d\'avis' },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #0EA5E9 100%)',
          color: '#FFFFFF',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.12)',
            filter: 'blur(50px)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    fontWeight: 700,
                    letterSpacing: 2,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  ELECTRO_USX · MARKETPLACE PREMIUM
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    color: '#FFFFFF',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
                    lineHeight: 1.15,
                  }}
                >
                  {T.HOME_PAGE.HERO_TITLE}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Inter, sans-serif',
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.7,
                    maxWidth: 540,
                  }}
                >
                  {T.HOME_PAGE.HERO_SUBTITLE}
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSearch}
                  sx={{
                    maxWidth: 520,
                    display: 'flex',
                    gap: 1.5,
                    mb: 3,
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder={T.FORMS.SEARCH_PLACEHOLDER}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        borderRadius: '14px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon sx={{ color: '#2563EB' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <PremiumButton
                    type="submit"
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#0F172A',
                      px: 4,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      },
                    }}
                  >
                    {T.BUTTONS.SEARCH}
                  </PremiumButton>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <PremiumButton
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/products')}
                    sx={{
                      background: '#FFFFFF',
                      color: '#2563EB',
                      px: 4,
                      '&:hover': {
                        background: '#F8FAFC',
                        boxShadow: '0 12px 32px rgba(255,255,255,0.3)',
                      },
                    }}
                  >
                    {T.HOME_PAGE.VIEW_PRODUCTS}
                  </PremiumButton>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: 380,
                      mx: 'auto',
                      aspectRatio: '1',
                      borderRadius: '24px',
                      background: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src="http://127.0.0.1:8000/storage/products/hero/electronics-hero.jpg"
                      alt="Electronics Hero"
                      loading="lazy"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                    />
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits */}
      <Box sx={{ py: { xs: 4, md: 5 }, backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {benefits.map((benefit, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box
                      sx={{
                        p: 1.25,
                        borderRadius: '12px',
                        backgroundColor: 'rgba(15, 76, 255, 0.08)',
                        color: '#2563EB',
                        display: 'flex',
                      }}
                    >
                      {benefit.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
                        {benefit.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        {benefit.desc}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, mb: 1, textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}
          >
            {T.HOME_PAGE.SHOP_BY_CATEGORY}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#64748B', textAlign: 'center', mb: 5, maxWidth: 480, mx: 'auto' }}
          >
            Explorez notre sélection par univers technologique
          </Typography>
        </motion.div>

        <Grid container spacing={3} sx={{ mb: 2 }}>
          {categories.map((category, idx) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card
                  onClick={() => navigate(`/products?category_id=${category.id}`)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                    transition: 'all 0.3s ease',
                    backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
                    '&:hover': {
                      boxShadow: '0 16px 40px rgba(15, 76, 255, 0.12)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 180,
                      gap: 2,
                    }}
                  >
                    {(() => {
                      const IconComponent = getCategoryIcon(category.name)
                      return <IconComponent sx={{ fontSize: 48, color: '#2563EB', opacity: 0.8 }} />
                    })()}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: 'Poppins, sans-serif',
                        color: '#1F2937',
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#F8FAFC' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'Poppins, sans-serif' }}>
                {T.HOME_PAGE.FEATURED_PRODUCTS}
              </Typography>
            </motion.div>
            <PremiumButton
              variant="text"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/products')}
            >
              Voir tout
            </PremiumButton>
          </Box>

          {loading ? (
            <ProductGridSkeleton count={3} />
          ) : featuredProducts.length > 0 ? (
            <Grid container spacing={3}>
              {featuredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} onAddToCart={handleAddToCart} index={index} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState
              title="Aucun produit disponible"
              message="Revenez bientôt pour de nouveaux produits"
            />
          )}
        </Container>
      </Box>

      {/* Best Sellers */}
      {!loading && bestSellers.length > 0 && (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 4, fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}
            >
              {T.HOME_PAGE.BEST_SELLERS}
            </Typography>
            <Grid container spacing={3}>
              {bestSellers.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} onAddToCart={handleAddToCart} index={index} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      )}

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

