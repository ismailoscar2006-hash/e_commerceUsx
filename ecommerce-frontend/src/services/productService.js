import api from '../api/axios'

export const productService = {
  getProducts: async (page = 1, search = '', categoryId = '') => {
    const params = new URLSearchParams()
    params.append('page', page)
    if (search) params.append('search', search)
    if (categoryId) params.append('category_id', categoryId)

    const response = await api.get(`/products?${params.toString()}`)
    return response.data
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  createProduct: async (data) => {
    const response = await api.post('/products', data)
    return response.data
  },

  updateProduct: async (id, data) => {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },
}
