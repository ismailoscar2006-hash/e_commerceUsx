import api from '../api/axiosConfig'

export const authService = {
  register: async (data) => {
    const response = await api.post('/auth/register', data)
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  logout: async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    return response.data
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },
}
