import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Dashboard,
  ShoppingCart,
  Inventory2,
  Category,
  People,
  Close as CloseIcon,
} from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const menuItems = [
  { label: 'Dashboard', icon: Dashboard, path: '/admin' },
  { label: 'Products', icon: Inventory2, path: '/admin/products' },
  { label: 'Categories', icon: Category, path: '/admin/categories' },
  { label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { label: 'Users', icon: People, path: '/admin/users' },
]

export default function AdminSidebar() {
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          TechStore
        </Box>
        <Box sx={{ fontSize: '0.85rem', color: 'text.secondary', mt: 0.5 }}>
          Admin Panel
        </Box>
      </Box>
      <Divider />
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem
              disablePadding
              selected={location.pathname === item.path}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <ListItemButton
                sx={{
                  backgroundColor:
                    location.pathname === item.path ? 'primary.light' : 'transparent',
                  color:
                    location.pathname === item.path ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? 'primary.main'
                        : 'text.primary',
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  if (isMobile) {
    return (
      <>
        <IconButton
          color="primary"
          onClick={() => setMobileOpen(true)}
          sx={{ position: 'fixed', top: 80, left: 16, zIndex: 100 }}
        >
          Menu
        </IconButton>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        >
          <Box sx={{ width: 280 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <IconButton onClick={() => setMobileOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            {drawerContent}
          </Box>
        </Drawer>
      </>
    )
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: '#fafafa',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}
