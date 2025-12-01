import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../utils/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const data = await authAPI.getMe()
      setUser(data.user)
      setIsAuthenticated(true)
      localStorage.setItem('token', data.token || token)
    } catch (error) {
      localStorage.removeItem('token')
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const data = await authAPI.login({ email, password })
      setUser(data.user)
      setIsAuthenticated(true)
      localStorage.setItem('token', data.token)
      toast.success('Welcome back!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Login failed')
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData)
      setUser(data.user)
      setIsAuthenticated(true)
      localStorage.setItem('token', data.token)
      toast.success('Account created successfully!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem('token')
      toast.success('Logged out successfully')
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

