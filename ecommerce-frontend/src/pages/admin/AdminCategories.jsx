import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  IconButton,
  Pagination,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'
import AdminLayout from '../../layouts/AdminLayout'
import { categoryService } from '../../services/categoryService'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    name: '',
  })

  useEffect(() => {
    fetchCategories()
  }, [currentPage])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await categoryService.getCategories(currentPage)
      setCategories(response.data)
      setTotalPages(response.meta.last_page)
    } catch (error) {
      setError('Error loading categories')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingId(category.id)
      setFormData({ name: category.name })
    } else {
      setEditingId(null)
      setFormData({ name: '' })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingId(null)
  }

  const handleChange = (e) => {
    setFormData({ name: e.target.value })
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (!formData.name.trim()) {
      setError('Category name is required')
      return
    }

    try {
      if (editingId) {
        await categoryService.updateCategory(editingId, formData)
        setSuccess('Category updated successfully')
      } else {
        await categoryService.createCategory(formData)
        setSuccess('Category created successfully')
      }
      handleCloseDialog()
      fetchCategories()
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving category')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return

    try {
      await categoryService.deleteCategory(id)
      setSuccess('Category deleted successfully')
      fetchCategories()
    } catch (error) {
      setError('Error deleting category')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Categories Management</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Category
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(category.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
          />
        </Box>
      )}

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Category Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  )
}
