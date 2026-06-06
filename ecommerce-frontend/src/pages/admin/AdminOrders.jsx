import { useEffect, useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Pagination,
  TextField,
  InputAdornment,
} from '@mui/material'
import AdminLayout from '../../layouts/AdminLayout'
import { adminService } from '../../services/adminService'
import { orderService } from '../../services/orderService'

const statusOptions = [
  { value: 'en_attente', label: 'Pending' },
  { value: 'validee', label: 'Confirmed' },
  { value: 'livree', label: 'Delivered' },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [currentPage, status])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await adminService.getOrders(currentPage, status)
      setOrders(response.data)
      setTotalPages(response.meta.last_page)
    } catch (error) {
      setError('Error loading orders')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedOrder(null)
  }

  const handleUpdateStatus = async () => {
    if (newStatus === selectedOrder.status) {
      handleCloseDialog()
      return
    }

    setError('')
    setSuccess('')

    try {
      await adminService.updateOrderStatus(selectedOrder.id, newStatus)
      setSuccess('Order status updated successfully')
      handleCloseDialog()
      fetchOrders()
    } catch (error) {
      setError('Error updating order status')
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
      <Box sx={{ mb: 3 }}>
        <h1>Orders Management</h1>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Filter by Status"
          select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setCurrentPage(1)
          }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Orders</MenuItem>
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.user?.name}</TableCell>
                <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={statusOptions.find((s) => s.value === order.status)?.label}
                    color={
                      order.status === 'livree'
                        ? 'success'
                        : order.status === 'validee'
                        ? 'info'
                        : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleOpenDialog(order)}
                  >
                    Update Status
                  </Button>
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
      {selectedOrder && (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Box>
              <strong>Order ID:</strong> #{selectedOrder.id}
            </Box>
            <Box>
              <strong>Customer:</strong> {selectedOrder.user?.name}
            </Box>
            <Box>
              <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
            </Box>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                label="Status"
              >
                {statusOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AdminLayout>
  )
}
