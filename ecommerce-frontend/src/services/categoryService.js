import api from '../api/axios'

export const categoryService = {
  getCategories: async (page = 1) => {
    const response = await api.get(`/categories?page=${page}`)
    return response.data
  },

  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },

  createCategory: async (data) => {
    const response = await api.post('/categories', data)
    return response.data
  },

  updateCategory: async (id, data) => {
    const response = await api.put(`/categories/${id}`, data)
    return response.data
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  },

  getAllCategories: async () => {
    try {
      const response = await api.get('/categories?per_page=100')
      return response.data.data || []
    } catch {
      return []
    }
  },
}
