import { createContext, useState, useEffect, useContext } from 'react'
import { cartService } from '../services/cartService'
import { AuthContext } from './AuthContext'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await cartService.getCart()
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
      setCart({ items: [], items_count: 0, total: 0 })
    } finally {
      setLoading(false)
    }
  }

  // Load cart when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    } else {
      setCart(null)
    }
  }, [isAuthenticated])

  const addToCart = async (productId, quantity) => {
    try {
      setLoading(true)
      const response = await cartService.addToCart(productId, quantity)
      setCart(response.data)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add to cart',
      }
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await cartService.updateCartItem(itemId, quantity)
      setCart(response.data)
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Failed to update quantity' }
    }
  }

  const removeItem = async (itemId) => {
    try {
      const response = await cartService.removeCartItem(itemId)
      setCart(response.data)
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Failed to remove item' }
    }
  }

  const clearCart = async () => {
    try {
      const response = await cartService.clearCart()
      setCart(response.data)
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Failed to clear cart' }
    }
  }

  const getCartTotal = () => cart?.total || 0
  const getCartItemsCount = () => cart?.items_count || 0

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
