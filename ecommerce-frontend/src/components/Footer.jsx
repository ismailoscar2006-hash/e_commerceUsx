import { Box, Container, Typography, Grid, Divider, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material'
import { TRANSLATIONS as T } from '../constants/translations'
import { colors, gradients } from '../constants/designTokens'

const quickLinks = [
  { label: T.NAV.HOME, path: '/' },
  { label: T.NAV.PRODUCTS, path: '/products' },
]

const categories = [
  { label: 'Smartphones', path: '/products?search=Smartphone' },
  { label: 'Ordinateurs', path: '/products?search=Laptop' },
  { label: 'Tablettes', path: '/products?search=Tablet' },
  { label: 'Casques & Audio', path: '/products?search=Headphone' },
  { label: 'Gaming', path: '/products?search=Gaming' },
  { label: 'Accessoires', path: '/products?search=Accessory' },
]

const supportLinks = [
  { label: 'Contact', path: '#' },
  { label: 'FAQ', path: '#' },
  { label: 'Livraison', path: '#' },
  { label: 'Retours', path: '#' },
  { label: 'Suivi commande', path: '/orders' },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: LinkedIn, label: 'LinkedIn', href: '#' },
]

function FooterColumn({ title, children }) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontFamily: 'Poppins, sans-serif',
          color: '#FFFFFF',
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}

function FooterLink({ to, children, external }) {
  const content = (
    <Typography
      variant="body2"
      sx={{
        color: '#94A3B8',
        transition: 'all 0.25s ease',
        '&:hover': { color: colors.accent, transform: 'translateX(4px)' },
      }}
    >
      {children}
    </Typography>
  )

  if (external || to === '#') {
    return (
      <motion.a href={to} whileHover={{ x: 2 }} style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.div whileHover={{ x: 2 }}>
      <Link to={to} style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
        {content}
      </Link>
    </motion.div>
  )
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: gradients.footer,
        color: '#FFFFFF',
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(245,158,11,0.5), transparent)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, position: 'relative' }}>
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: gradients.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
                }}
              >
                <Typography sx={{ color: '#FFF', fontWeight: 800 }}>E</Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontFamily: 'Poppins, sans-serif',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ELECTRO_USX
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.8, mb: 3, maxWidth: 320 }}>
              Marketplace premium d'électronique. Smartphones, ordinateurs, gaming et accessoires high-tech aux meilleurs prix au Maroc.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href}
                  aria-label={label}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#94A3B8',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: colors.accent,
                      borderColor: colors.accent,
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <FooterColumn title="Liens Rapides">
              {quickLinks.map((link) => (
                <FooterLink key={link.path} to={link.path}>{link.label}</FooterLink>
              ))}
            </FooterColumn>
          </Grid>

          {/* Categories */}
          <Grid item xs={6} sm={4} md={2}>
            <FooterColumn title="Catégories">
              {categories.map((cat) => (
                <FooterLink key={cat.label} to={cat.path}>{cat.label}</FooterLink>
              ))}
            </FooterColumn>
          </Grid>

          {/* Support */}
          <Grid item xs={6} sm={4} md={2}>
            <FooterColumn title="Support">
              {supportLinks.map((link) => (
                <FooterLink key={link.label} to={link.path} external={link.path === '#'}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </Grid>

          {/* Contact */}
          <Grid item xs={6} sm={8} md={2}>
            <FooterColumn title="Contact">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 16, color: colors.primaryLight }} />
                  <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                    contact@electrousx.ma
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 16, color: colors.primaryLight }} />
                  <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                    +212 5 22 00 00 00
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: colors.primaryLight, mt: 0.25 }} />
                  <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    Casablanca, Maroc
                  </Typography>
                </Box>
              </Box>
            </FooterColumn>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            {T.FOOTER.COPYRIGHT}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[T.FOOTER.PRIVACY_POLICY, T.FOOTER.TERMS_CONDITIONS].map((label) => (
              <Typography
                key={label}
                variant="caption"
                sx={{
                  color: '#64748B',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: colors.accent },
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
