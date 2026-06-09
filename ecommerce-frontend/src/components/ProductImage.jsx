import { Box, Skeleton } from '@mui/material'
import { useState } from 'react'
import { getProductImageUrl } from '../utils/productImage'
import noProduct from '../assets/no-product.svg'

export default function ProductImage({
  src,
  product,
  alt = 'Product',
  height = 400,
  borderRadius = '12px',
  objectFit = 'cover',
  sx = {},
}) {
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Support both src and product props
  const imageUrl = src || (product ? getProductImageUrl(product) : null) || noProduct

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#F1F5F9',
        borderRadius,
        overflow: 'hidden',
        height: typeof height === 'number' ? `${height}px` : height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      {loading && !hasError && <Skeleton variant="rectangular" width="100%" height="100%" />}
      <img
        src={imageUrl}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setHasError(true)
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: loading ? 'none' : 'block',
          borderRadius,
        }}
      />
    </Box>
  )
}
