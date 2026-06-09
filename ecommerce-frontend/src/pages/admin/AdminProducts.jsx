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
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Pagination,
  Typography,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'
import AdminLayout from '../../layouts/AdminLayout'
import { formatPrice } from '../../utils/formatPrice'
import { productService } from '../../services/productService'
import { categoryService } from '../../services/categoryService'
import { getProductImageUrl } from '../../utils/productImage'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
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
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image: '',
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [currentPage])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts(currentPage)
      setProducts(response.data)
      setTotalPages(response.meta.last_page)
    } catch (error) {
      setError('Error loading products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleOpenDialog = (product = null) => {
    if (product) {
      // Extract relative path from full URL if needed
      let imagePath = product.image || ''
      if (imagePath.startsWith('http')) {
        // Extract path after /storage/
        const parts = imagePath.split('/storage/')
        imagePath = parts.length > 1 ? parts[1] : ''
      }

      setEditingId(product.id)
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image: imagePath,
      })
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image: '',
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    try {
      if (editingId) {
        await productService.updateProduct(editingId, formData)
        setSuccess('Product updated successfully')
      } else {
        await productService.createProduct(formData)
        setSuccess('Product created successfully')
      }
      handleCloseDialog()
      fetchProducts()
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving product')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await productService.deleteProduct(id)
      setSuccess('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      setError('Error deleting product')
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
        <h1>Products Management</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="80">Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box
                    component="img"
                    src={getProductImageUrl(product)}
                    alt={product.name}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: '8px',
                      backgroundColor: '#F1F5F9',
                    }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category?.name || 'N/A'}</TableCell>
                <TableCell align="right">{formatPrice(product.price)}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(product.id)}
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
        <DialogTitle>{editingId ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Category"
            name="category_id"
            select
            value={formData.category_id}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Image Path (relative path from storage)"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="products/smartphones/iphone15promax.jpg"
            helperText="Example: products/category/image.jpg"
          />
          {formData.image && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                Aperçu de l'image:
              </Typography>
              <Box
                component="img"
                src={`http://127.0.0.1:8000/storage/${formData.image}`}
                alt="Image preview"
                sx={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  objectFit: 'cover',
                }}
                onError={() => console.log('Image preview failed to load')}
              />
            </Box>
          )}
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
