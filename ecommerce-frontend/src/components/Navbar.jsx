import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
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
  ListItemButton,
  ListItemText,
  Divider,
  Container,
  Avatar,
  Typography,
} from '@mui/material'
import {
  ShoppingBagOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  KeyboardArrowDown,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { TRANSLATIONS as T } from '../constants/translations'
import { colors, gradients, shadows } from '../constants/designTokens'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const { getCartItemsCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const cartCount = getCartItemsCount()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    setUserMenuAnchor(null)
    navigate('/login')
  }

  const navItems = [
    { label: T.NAV.HOME, path: '/' },
    { label: T.NAV.PRODUCTS, path: '/products' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname + location.search === path || location.pathname === path.split('?')[0]
  }

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(37, 99, 235, 0.1)' : 'rgba(226, 232, 240, 0.6)',
          boxShadow: scrolled ? shadows.nav : shadows.sm,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: gradients.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                    }}
                  >
                    <Typography sx={{ color: '#FFF', fontWeight: 800, fontSize: '0.9rem' }}>E</Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      background: gradients.primary,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    ELECTRO_USX
                  </Typography>
                </Box>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5, ml: 2 }}>
              {navItems.map((item) => {
                const active = isActive(item.path)
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: active ? colors.primary : colors.text,
                      fontSize: '0.875rem',
                      fontWeight: active ? 600 : 500,
                      px: 1.5,
                      py: 1,
                      borderRadius: '8px',
                      position: 'relative',
                      backgroundColor: active ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                      transition: 'all 0.25s ease',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: active ? '60%' : '0%',
                        height: '2px',
                        borderRadius: '2px',
                        background: gradients.primary,
                        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.06)',
                        '&::after': { width: '60%' },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Box>

            {/* Search */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: { xs: 'none', md: 'flex' },
                flex: 1,
                maxWidth: 420,
                mx: 'auto',
              }}
            >
              <TextField
                size="small"
                fullWidth
                placeholder={T.NAV.SEARCH}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '999px',
                    backgroundColor: searchFocused ? '#FFFFFF' : 'rgba(248, 250, 252, 0.9)',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    boxShadow: searchFocused
                      ? '0 0 0 3px rgba(37, 99, 235, 0.12), 0 4px 20px rgba(15, 23, 42, 0.06)'
                      : 'inset 0 1px 2px rgba(15, 23, 42, 0.04)',
                    '& fieldset': {
                      borderColor: searchFocused ? colors.primary : 'rgba(226, 232, 240, 0.8)',
                      borderWidth: searchFocused ? '1.5px' : '1px',
                    },
                    '&:hover fieldset': { borderColor: 'rgba(37, 99, 235, 0.3)' },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: colors.textMuted }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 }, ml: 'auto' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  component={Link}
                  to="/cart"
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: '12px',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: colors.primary,
                      backgroundColor: 'rgba(37, 99, 235, 0.06)',
                      boxShadow: '0 4px 16px rgba(37, 99, 235, 0.15)',
                    },
                  }}
                >
                  <Badge
                    badgeContent={cartCount}
                    invisible={cartCount === 0}
                    sx={{
                      '& .MuiBadge-badge': {
                        background: gradients.accent,
                        color: colors.secondary,
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        minWidth: 18,
                        height: 18,
                      },
                    }}
                  >
                    <ShoppingBagOutlined sx={{ fontSize: 20, color: colors.text }} />
                  </Badge>
                </IconButton>
              </motion.div>

              {isAuthenticated ? (
                <>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                      sx={{
                        display: { xs: 'none', sm: 'flex' },
                        gap: 1,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: '12px',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        color: colors.text,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        '&:hover': {
                          borderColor: colors.primary,
                          backgroundColor: 'rgba(37, 99, 235, 0.04)',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: gradients.primary,
                        }}
                      >
                        {userInitial}
                      </Avatar>
                      <Box sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user?.name?.split(' ')[0]}
                      </Box>
                      <KeyboardArrowDown sx={{ fontSize: 18, color: colors.textMuted }} />
                    </Button>
                  </motion.div>

                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={() => setUserMenuAnchor(null)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 220,
                        borderRadius: '16px',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
                        overflow: 'hidden',
                      },
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5, background: 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(245,158,11,0.04) 100%)' }}>
                      <Typography variant="caption" sx={{ color: colors.textMuted }}>Connecté en tant que</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.text }}>{user?.name}</Typography>
                    </Box>
                    <Divider />
                    {[
                      { label: T.NAV.PROFILE, path: '/profile' },
                      { label: T.NAV.MY_ORDERS, path: '/orders' },
                      ...(isAdmin() ? [{ label: T.NAV.ADMIN, path: '/admin', accent: true }] : []),
                    ].map((item) => (
                      <MenuItem
                        key={item.path}
                        onClick={() => { navigate(item.path); setUserMenuAnchor(null) }}
                        sx={{
                          py: 1.25,
                          fontSize: '0.875rem',
                          fontWeight: item.accent ? 600 : 500,
                          color: item.accent ? colors.primary : colors.text,
                          '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.06)' },
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ py: 1.25, color: colors.danger, fontSize: '0.875rem', fontWeight: 500 }}
                    >
                      {T.NAV.LOGOUT}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate('/login')}
                    sx={{ color: colors.text, fontWeight: 600, fontSize: '0.875rem' }}
                  >
                    {T.AUTH.SIGN_IN}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate('/register')}
                    sx={{
                      background: gradients.primary,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      px: 2,
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                      '&:hover': { background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' },
                    }}
                  >
                    {T.AUTH.SIGN_UP}
                  </Button>
                </Box>
              )}

              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: 'flex', lg: 'none' }, color: colors.text }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontWeight: 800, fontFamily: 'Poppins', background: gradients.primary, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ELECTRO_USX
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="form" onSubmit={(e) => { handleSearch(e); setMobileOpen(false) }} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={T.NAV.SEARCH}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Box>

          <List disablePadding>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: '10px',
                  mb: 0.5,
                  '&.Mui-selected': { backgroundColor: 'rgba(37, 99, 235, 0.1)' },
                }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {!isAuthenticated ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => { navigate('/login'); setMobileOpen(false) }}>
                {T.AUTH.SIGN_IN}
              </Button>
              <Button variant="contained" fullWidth onClick={() => { navigate('/register'); setMobileOpen(false) }} sx={{ background: gradients.primary }}>
                {T.AUTH.SIGN_UP}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => { navigate('/profile'); setMobileOpen(false) }}>{T.NAV.PROFILE}</Button>
              <Button variant="outlined" fullWidth onClick={() => { navigate('/orders'); setMobileOpen(false) }}>{T.NAV.MY_ORDERS}</Button>
              <Button variant="text" fullWidth color="error" onClick={() => { handleLogout(); setMobileOpen(false) }}>{T.NAV.LOGOUT}</Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  )
}
