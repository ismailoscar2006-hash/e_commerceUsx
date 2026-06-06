import api from '../api/axiosConfig'

export const orderService = {
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
}
