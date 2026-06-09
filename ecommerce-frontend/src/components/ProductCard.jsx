import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { getProductImageUrl } from '../utils/productImage'
import { TRANSLATIONS as T } from '../constants/translations'
import { formatPrice } from '../utils/formatPrice'

const compactBtnSx = {
  flex: 1,
  minWidth: 0,
  py: 0.65,
  px: 1,
  fontSize: '0.72rem',
  fontWeight: 600,
  lineHeight: 1.2,
  borderRadius: '8px',
  whiteSpace: 'nowrap',
  textTransform: 'none',
  boxShadow: 'none',
}

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const inStock = product.stock > 0
  const lowStock = product.stock > 0 && product.stock < 5

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      style={{ height: '100%' }}
    >
      <Card
        className="product-card-root"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid #E8EDF5',
          boxShadow: '0 2px 12px rgba(15, 23, 42, 0.05)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(15, 76, 255, 0.12)',
            borderColor: 'rgba(15, 76, 255, 0.15)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <ProductImage
            src={getProductImageUrl(product)}
            alt={product.name}
            height={280}
            sx={{ backgroundColor: '#F8FAFC' }}
          />

          <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
            {product.category && (
              <Chip
                label={product.category.name}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  background: 'rgba(15, 76, 255, 0.92)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(4px)',
                }}
              />
            )}
          </Box>

          <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
            {!inStock ? (
              <Chip
                label={T.PRODUCTS_SECTION.OUT_OF_STOCK}
                size="small"
                sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, bgcolor: '#EF4444', color: '#FFF' }}
              />
            ) : lowStock ? (
              <Chip
                label={`${product.stock} rest.`}
                size="small"
                sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, bgcolor: '#F59E0B', color: '#FFF' }}
              />
            ) : (
              <Chip
                label={T.PRODUCTS_SECTION.IN_STOCK}
                size="small"
                sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, bgcolor: '#22C55E', color: '#FFF' }}
              />
            )}
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, px: 1.75, pt: 1.5, pb: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.35,
              minHeight: '2.7em',
              color: '#0F172A',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.875rem',
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: '#64748B',
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.45,
              minHeight: '2.9em',
              fontSize: '0.75rem',
            }}
          >
            {product.description}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              fontFamily: 'Poppins, sans-serif',
              color: '#2563EB',
              fontSize: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            {formatPrice(product.price)}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            px: 1.75,
            pb: 1.75,
            pt: 0,
          }}
        >
          <Button
            component={Link}
            to={`/products/${product.id}`}
            variant="outlined"
            size="small"
            sx={{
              ...compactBtnSx,
              borderColor: '#CBD5E1',
              color: '#334155',
              '&:hover': {
                borderColor: '#2563EB',
                backgroundColor: 'rgba(15, 76, 255, 0.04)',
                boxShadow: 'none',
              },
            }}
          >
            {T.BUTTONS.VIEW_DETAILS}
          </Button>

          <Button
            variant="contained"
            size="small"
            disabled={!inStock}
            onClick={() => onAddToCart(product.id)}
            sx={{
              ...compactBtnSx,
              background: inStock ? 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)' : undefined,
              '&:hover:not(.Mui-disabled)': {
                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                boxShadow: '0 4px 12px rgba(15, 76, 255, 0.25)',
              },
            }}
          >
            {inStock ? T.BUTTONS.ADD_TO_CART : 'Rupture'}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  )
}
