import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../utils/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const data = await authAPI.getMe()
      if (data.user.role === 'admin') {
        setUser(data.user)
        setIsAuthenticated(true)
        localStorage.setItem('adminToken', data.token || token)
      } else {
        throw new Error('Not an admin')
      }
    } catch (error) {
      localStorage.removeItem('adminToken')
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const data = await authAPI.login({ email, password })
      if (data.user.role !== 'admin') {
        throw new Error('Access denied. Admin only.')
      }
      setUser(data.user)
      setIsAuthenticated(true)
      localStorage.setItem('adminToken', data.token)
      return { success: true }
    } catch (error) {
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
      localStorage.removeItem('adminToken')
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
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

