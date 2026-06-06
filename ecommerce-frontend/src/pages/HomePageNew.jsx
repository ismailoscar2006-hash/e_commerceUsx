import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Rating,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material'
import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import ProductCard from '../components/ProductCard'
import { productService } from '../services/productService'
import { categoryService } from '../services/categoryService'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function HomePage() {
  const navigate = useNavigate()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [categories, setCategories] = useState([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(1),
          categoryService.getAllCategories(),
        ])

        setFeaturedProducts(productsData.data.slice(0, 3))
        setBestSellers(productsData.data.slice(3, 7))
        setNewArrivals(productsData.data.slice(7, 11))
        setCategories(categoriesData.slice(0, 6))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
          color: '#FFFFFF',
          py: { xs: 8, md: 14 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 400,
            height: 400,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 300,
            height: 300,
            background: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: '#FFFFFF',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2rem', md: '3.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Découvrez les meilleures innovations technologiques
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Inter, sans-serif',
                    mb: 4,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    fontWeight: 400,
                  }}
                >
                  Smartphones, ordinateurs, accessoires et équipements électroniques aux meilleurs prix.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/products')}
                      sx={{
                        backgroundColor: '#F59E0B',
                        color: '#0F172A',
                        fontWeight: 600,
                        fontSize: '1rem',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#D97706',
                          transform: 'translateY(-2px)',
                        },
                        endIcon: <ArrowRight size={20} />,
                      }}
                    >
                      Voir les Produits
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/products?filter=promo')}
                      sx={{
                        borderColor: '#FFFFFF',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '1rem',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: '#FFFFFF',
                        },
                        endIcon: <Zap size={20} />,
                      }}
                    >
                      Découvrir les Promotions
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Box
                      sx={{
                        width: 300,
                        height: 300,
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        fontSize: '120px',
                      }}
                    >
                      📱
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 6, backgroundColor: '#F8FAFC' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { icon: '⚡', title: 'Livraison Rapide', desc: 'Livraison gratuite à partir de 50€' },
              { icon: '🛡️', title: 'Sécurisé', desc: 'Paiement 100% sécurisé' },
              { icon: '🚚', title: 'Suivi', desc: 'Suivez votre commande en temps réel' },
              { icon: '↩️', title: 'Retours', desc: '30 jours pour retourner votre produit' },
            ].map((benefit, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <Box sx={{ fontSize: '3rem', mb: 1 }}>{benefit.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#475569' }}>
                      {benefit.desc}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Parcourir par Catégorie
          </Typography>

          <Grid container spacing={3}>
            {categories.map((category, idx) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    onClick={() => navigate(`/products?category_id=${category.id}`)}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 200,
                      backgroundColor: `hsl(${idx * 60}, 70%, 95%)`,
                      border: 'none',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center' }}>
                      {category.name}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Featured Products */}
      <Box sx={{ py: 8, backgroundColor: '#F8FAFC' }}>
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Produits en Vedette
            </Typography>

            <Grid container spacing={3}>
              {featuredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <motion.div variants={itemVariants}>
                    <ProductCard product={product} onAddToCart={() => {}} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          color: '#FFFFFF',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>
                Abonnez-vous à notre Newsletter
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
                Recevez les dernières offres et nouveaux produits directement dans votre boîte email.
              </Typography>

              <Box
                component="form"
                onSubmit={handleNewsletterSubmit}
                sx={{
                  display: 'flex',
                  gap: 2,
                  maxWidth: 500,
                  mx: 'auto',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#FFFFFF',
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: '#F59E0B',
                    color: '#0F172A',
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#D97706',
                    },
                  }}
                >
                  S'abonner
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </MainLayout>
  )
}
