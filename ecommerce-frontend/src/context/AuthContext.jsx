import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('authToken')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password)
      setUser(data.user)
      setToken(data.token)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      }
    }
  }

  const register = async (formData) => {
    try {
      const data = await authService.register(formData)
      setUser(data.user)
      setToken(data.token)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || {},
      }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      setToken(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateProfile = async (data) => {
    try {
      const response = await authService.updateProfile(data)
      setUser(response.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed',
      }
    }
  }

  const isAdmin = () => user?.role === 'admin'

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAdmin,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
