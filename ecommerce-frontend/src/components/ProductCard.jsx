import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from '@mui/material'
import { ShoppingCart, Visibility } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          transform: 'translateY(-8px)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
        }}
      >
        <CardMedia
          component="img"
          image={product.image_url || `http://127.0.0.1:8000/storage/default-product.jpg`}
          alt={product.name}
          onError={(e) => {
            e.target.src = `http://127.0.0.1:8000/storage/default-product.jpg`
          }}
          sx={{
            height: 200,
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        />
        {product.stock === 0 && (
          <Chip
            label="Out of Stock"
            color="error"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
          />
        )}
        {product.stock > 0 && product.stock < 5 && (
          <Chip
            label={`Only ${product.stock} Left`}
            color="warning"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        {product.category && (
          <Typography
            variant="caption"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {product.category.name}
          </Typography>
        )}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: 56,
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            ${product.price}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ gap: 1 }}>
        <Link to={`/products/${product.id}`} style={{ flex: 1, textDecoration: 'none' }}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<Visibility />}
          >
            View
          </Button>
        </Link>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock === 0}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  )
}
