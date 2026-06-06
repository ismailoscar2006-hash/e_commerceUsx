import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#0F172A', color: '#FFFFFF', mt: 12 }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#F59E0B' }}>
              ELECTRO_USX
            </Typography>
            <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 2 }}>
              La technologie de demain à portée de main. Découvrez les meilleures produits électroniques.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Liens Rapides
            </Typography>
            {['Accueil', 'Produits', 'Promotions', 'Nouveautés'].map((link) => (
              <Link
                key={link}
                href="#"
                sx={{
                  display: 'block',
                  color: '#CBD5E1',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': { color: '#F59E0B' },
                }}
              >
                {link}
              </Link>
            ))}
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Service Client
            </Typography>
            {['Contact', 'FAQ', 'Retours', 'Suivi'].map((link) => (
              <Link
                key={link}
                href="#"
                sx={{
                  display: 'block',
                  color: '#CBD5E1',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': { color: '#F59E0B' },
                }}
              >
                {link}
              </Link>
            ))}
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Nous Contacter
            </Typography>
            <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 1 }}>
              📞 +33 1 23 45 67 89
            </Typography>
            <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 1 }}>
              ✉️ contact@electrousx.fr
            </Typography>
            <Typography variant="body2" sx={{ color: '#CBD5E1' }}>
              📍 Paris, France
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#94A3B8' }}>
            © 2026 ELECTRO_USX - Tous droits réservés.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#F59E0B' } }}>
              Politique de confidentialité
            </Link>
            <Link href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#F59E0B' } }}>
              Conditions
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
