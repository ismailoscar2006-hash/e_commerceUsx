import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from '@mui/material'
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const { getCartItemsCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const cartCount = getCartItemsCount()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const handleUserMenu = (event) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null)
  }

  const handleLogout = () => {
    logout()
    handleCloseUserMenu()
    navigate('/login')
  }

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Produits', path: '/products' },
    { label: 'Promotions', path: '/products?filter=promo' },
    { label: 'Nouveautés', path: '/products?filter=new' },
  ]

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF',
        backdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid #E2E8F0' : 'none',
        boxShadow: scrolled ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: { xs: '60px', md: '70px' },
            padding: { xs: '8px 0', md: '12px 0' },
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                }}
              >
                ELECTRO_USX
              </Box>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              ml: 6,
            }}
          >
            {navItems.map((item) => (
              <motion.div key={item.path} whileHover={{ y: -2 }}>
                <Button
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#0F172A',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: 0,
                      height: '2px',
                      backgroundColor: '#2563EB',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </Box>

          {/* Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: 4,
              mr: 2,
              flex: 1,
              maxWidth: '400px',
            }}
          >
            <TextField
              size="small"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#F8FAFC',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      size="small"
                      sx={{ color: '#2563EB' }}
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Right Actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
            }}
          >
            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  color: '#0F172A',
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  },
                }}
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCart fontSize="small" />
                </Badge>
              </IconButton>
            </motion.div>

            {/* Auth Buttons or User Menu */}
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    onClick={handleUserMenu}
                    sx={{
                      color: '#0F172A',
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      },
                    }}
                  >
                    <Person fontSize="small" />
                  </IconButton>
                </motion.div>

                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                      borderRadius: '8px',
                    },
                  }}
                >
                  <MenuItem disabled sx={{ color: '#0F172A', fontWeight: 600 }}>
                    {user?.name}
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      navigate('/profile')
                      handleCloseUserMenu()
                    }}
                    sx={{ color: '#0F172A' }}
                  >
                    Mon Profil
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate('/orders')
                      handleCloseUserMenu()
                    }}
                    sx={{ color: '#0F172A' }}
                  >
                    Mes Commandes
                  </MenuItem>
                  {isAdmin() && (
                    <>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          navigate('/admin')
                          handleCloseUserMenu()
                        }}
                        sx={{ color: '#2563EB', fontWeight: 600 }}
                      >
                        Tableau de Bord Admin
                      </MenuItem>
                    </>
                  )}
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: '#EF4444' }}>
                    Déconnexion
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{
                    color: '#2563EB',
                    borderColor: '#2563EB',
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    },
                  }}
                >
                  Connexion
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: '#2563EB',
                    '&:hover': {
                      backgroundColor: '#1E40AF',
                    },
                  }}
                >
                  Inscription
                </Button>
              </Box>
            )}

            {/* Mobile Menu Toggle */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: '#0F172A',
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563EB' }}>
              ELECTRO_USX
            </Box>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.path}
                button
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: '8px',
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {!isAuthenticated && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  navigate('/login')
                  setMobileOpen(false)
                }}
              >
                Connexion
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  navigate('/register')
                  setMobileOpen(false)
                }}
              >
                Inscription
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </AppBar>
  )
}
