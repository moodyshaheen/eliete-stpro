const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    credentials: 'include',
    ...options
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body)
  } else if (options.body) {
    config.body = options.body
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config)
    
    // Check if response is ok before parsing JSON
    if (!response.ok) {
      // Try to parse error response
      let errorData
      try {
        errorData = await response.json()
      } catch (parseError) {
        // If JSON parsing fails, use status text
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // عرض رسالة الخطأ من الـ backend
      const errorMessage = errorData.message || errorData.error || 'Something went wrong'
      throw new Error(errorMessage)
    }

    // Parse successful response
    const data = await response.json()
    return data
  } catch (error) {
    // إذا كان الخطأ من الـ network أو parsing
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection.')
    }
    // إذا كان الخطأ من الـ backend
    throw error
  }
}

// Auth APIs
export const authAPI = {
  register: (userData) => apiCall('/auth/register', { method: 'POST', body: userData }),
  login: (credentials) => apiCall('/auth/login', { method: 'POST', body: credentials }),
  logout: () => apiCall('/auth/logout', { method: 'POST' }),
  getMe: () => apiCall('/auth/me')
}

// Profile APIs
export const profileAPI = {
  getProfile: () => apiCall('/profile'),
  updateProfile: (data) => apiCall('/profile', { method: 'PUT', body: data }),
  changePassword: (data) => apiCall('/profile/password', { method: 'PUT', body: data }),
  getFavorites: () => apiCall('/profile/favorites'),
  addToFavorites: (productId) => apiCall(`/profile/favorites/${productId}`, { method: 'POST' }),
  removeFromFavorites: (productId) => apiCall(`/profile/favorites/${productId}`, { method: 'DELETE' })
}

// Product APIs
export const productAPI = {
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`)
  },
  getProduct: (id) => apiCall(`/products/${id}`)
}

// Order APIs
export const orderAPI = {
  createOrder: (orderData) => apiCall('/orders', { method: 'POST', body: orderData }),
  getMyOrders: () => apiCall('/orders/myorders'),
  getOrder: (id) => apiCall(`/orders/${id}`)
}

// Category APIs
export const categoryAPI = {
  getCategories: () => apiCall('/categories')
}

export default apiCall

