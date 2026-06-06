import { Box, FormControlLabel, Checkbox, Typography, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { categoryService } from '../services/categoryService'

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await categoryService.getAllCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <CircularProgress size={24} />
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Categories
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategory === ''}
              onChange={() => onCategoryChange('')}
            />
          }
          label="All Categories"
        />
        {categories.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <Checkbox
                checked={selectedCategory === category.id.toString()}
                onChange={() => onCategoryChange(category.id.toString())}
              />
            }
            label={category.name}
          />
        ))}
      </Box>
    </Box>
  )
}
