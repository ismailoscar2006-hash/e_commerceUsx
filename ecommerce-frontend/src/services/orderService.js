import api from '../api/axios'

export const orderService = {
  // User Orders
  getOrders: async (page = 1) => {
    const response = await api.get(`/orders?page=${page}`)
    return response.data
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },

  placeOrder: async (deliveryAddress) => {
    const response = await api.post('/orders', { delivery_address: deliveryAddress })
    return response.data
  },

  // Admin Orders
  getAllOrders: async (page = 1, status = '') => {
    let url = `/admin/orders?page=${page}`
    if (status) url += `&status=${status}`
    const response = await api.get(url)
    return response.data
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/admin/orders/${orderId}/status`, { status })
    return response.data
  },

  // Admin Users
  getUsers: async (page = 1) => {
    const response = await api.get(`/admin/users?page=${page}`)
    return response.data
  },

  // Admin Dashboard Stats
  getDashboardStats: async () => {
    try {
      const [users, orders, products, stock] = await Promise.all([
        api.get('/admin/users?page=1'),
        api.get('/admin/orders?page=1'),
        api.get('/products?page=1'),
        api.get('/admin/stock?page=1'),
      ])

      const lowStockProducts = stock.data.data.filter((p) => !p.in_stock).length

      return {
        totalUsers: users.data.meta?.total || 0,
        totalOrders: orders.data.meta?.total || 0,
        totalProducts: products.data.meta?.total || 0,
        lowStockProducts,
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        lowStockProducts: 0,
      }
    }
  },

  // Admin Stock
  getStockStatus: async (page = 1) => {
    const response = await api.get(`/admin/stock?page=${page}`)
    return response.data
  },
}
