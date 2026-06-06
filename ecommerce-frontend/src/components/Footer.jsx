import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#212121',
        color: '#fff',
        py: 5,
        mt: 8,
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              TechStore
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Your trusted online store for the latest electronics and gadgets.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: '#fff' },
                  }}
                >
                  Home
                </Typography>
              </Link>
              <Link to="/products" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: '#fff' },
                  }}
                >
                  Products
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Email: support@techstore.com
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Phone: 1-800-TECH-STORE
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Business Hours
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Monday - Friday: 9 AM - 9 PM
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Saturday - Sunday: 10 AM - 8 PM
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            © 2026 TechStore. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
