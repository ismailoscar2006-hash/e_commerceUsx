import { useEffect, useState } from 'react'
import { Box, FormControlLabel, Checkbox, Typography } from '@mui/material'
import { categoryService } from '../services/categoryService'

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const CategoryItem = ({ checked, onChange, label }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.25,
        borderRadius: '10px',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        border: '1px solid rgba(226, 232, 240, 0.5)',
        '&:hover': {
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          borderColor: 'rgba(37, 99, 235, 0.2)',
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
        },
      }}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        sx={{
          p: 0.5,
          mr: 1,
          '& .MuiSvgIcon-root': {
            fontSize: '1.2rem',
          },
        }}
      />
      <Typography
        sx={{
          fontSize: '0.85rem',
          fontWeight: 500,
          color: '#374151',
          flex: 1,
          userSelect: 'none',
        }}
      >
        {label}
      </Typography>
    </Box>
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 2.5,
          fontSize: '0.9rem',
          color: '#111827',
          letterSpacing: '0.02em',
        }}
      >
        Catégories
      </Typography>

      {/* Grid de catégories */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 1.25,
          width: '100%',
        }}
      >
        {/* Toutes les catégories */}
        <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
          <CategoryItem
            checked={!selectedCategory}
            onChange={() => onCategoryChange('')}
            label="Toutes les catégories"
          />
        </Box>

        {/* Catégories individuelles */}
        {categories.map((cat) => (
          <CategoryItem
            key={cat.id}
            checked={selectedCategory === cat.id.toString()}
            onChange={() => onCategoryChange(cat.id.toString())}
            label={cat.name}
          />
        ))}
      </Box>
    </Box>
  )
}
