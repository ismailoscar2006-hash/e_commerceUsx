import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  Category as CategoriesIcon,
  Receipt as OrdersIcon,
  People as UsersIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const ADMIN_MENU_ITEMS = [
  { label: 'Tableau de bord', path: '/admin', icon: DashboardIcon },
  { label: 'Produits', path: '/admin/products', icon: ProductsIcon },
  { label: 'Catégories', path: '/admin/categories', icon: CategoriesIcon },
  { label: 'Commandes', path: '/admin/orders', icon: OrdersIcon },
  { label: 'Utilisateurs', path: '/admin/users', icon: UsersIcon },
]

const DRAWER_WIDTH = 280

export default function AdminSidebar({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  const handleNavigate = (path) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Header */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #E2E8F0' }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 1,
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
          }}
        >
          <Typography sx={{ color: '#FFF', fontWeight: 800, fontSize: '1.25rem' }}>E</Typography>
        </Box>
        <Typography sx={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>
          ADMIN
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        {ADMIN_MENU_ITEMS.map((item) => {
          const active = isActive(item.path)
          const Icon = item.icon

          return (
            <motion.div
              key={item.path}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  mb: 1,
                  borderRadius: '12px',
                  transition: 'all 0.25s ease',
                  backgroundColor: active ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                  color: active ? '#2563EB' : '#64748B',
                  borderLeft: active ? '4px solid #2563EB' : '4px solid transparent',
                  pl: active ? '16px' : '20px',
                  '&:hover': {
                    backgroundColor: active ? 'rgba(37, 99, 235, 0.12)' : 'rgba(15, 23, 42, 0.04)',
                    color: active ? '#2563EB' : '#0F172A',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 40,
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 500,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </motion.div>
          )
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: '#94A3B8' }}>
          ELECTRO_USX v1.0
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: '#FFFFFF',
              borderRight: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          <IconButton
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 1200,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              '&:hover': {
                backgroundColor: '#F1F5F9',
              },
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      )}

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F8FAFC',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
