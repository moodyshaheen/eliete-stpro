const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken')
  const isFormData = options.body instanceof FormData
  
  const config = {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    },
    credentials: 'include',
    ...options
  }

  // Only set Content-Type for non-FormData requests
  if (!isFormData && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }

  // Handle body
  if (options.body) {
    if (isFormData) {
      config.body = options.body
    } else if (typeof options.body === 'object') {
      config.body = JSON.stringify(options.body)
    } else {
      config.body = options.body
    }
  }

  try {
    console.log('Making API call:', endpoint, { method: config.method || 'GET' })
    const response = await fetch(`${API_URL}${endpoint}`, config)
    
    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
      console.error('API error response:', errorData)
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`)
      error.response = { data: errorData, status: response.status }
      throw error
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    // Re-throw with more context
    if (error.message) {
      throw error
    }
    throw new Error(`Network error: ${error.message || 'Failed to fetch'}`)
  }
}

// Auth APIs
export const authAPI = {
  register: (userData) => apiCall('/auth/register', { method: 'POST', body: userData }),
  login: (credentials) => apiCall('/auth/login', { method: 'POST', body: credentials }),
  logout: () => apiCall('/auth/logout', { method: 'POST' }),
  getMe: () => apiCall('/auth/me')
}

// Product APIs
export const productAPI = {
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`)
  },
  getProduct: (id) => apiCall(`/products/${id}`),
  createProduct: (data) => apiCall('/products', { method: 'POST', body: data }),
  updateProduct: (id, data) => apiCall(`/products/${id}`, { method: 'PUT', body: data }),
  deleteProduct: (id) => apiCall(`/products/${id}`, { method: 'DELETE' })
}

// Order APIs
export const orderAPI = {
  getOrders: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/orders${queryString ? `?${queryString}` : ''}`)
  },
  getOrder: (id) => apiCall(`/orders/${id}`),
  updateOrderStatus: (id, status) => apiCall(`/orders/${id}/status`, { method: 'PUT', body: { status } }),
  deleteOrder: (id) => apiCall(`/orders/${id}`, { method: 'DELETE' })
}

// User APIs
export const userAPI = {
  getUsers: () => apiCall('/users'),
  getUser: (id) => apiCall(`/users/${id}`),
  updateUser: (id, data) => apiCall(`/users/${id}`, { method: 'PUT', body: data }),
  deleteUser: (id) => apiCall(`/users/${id}`, { method: 'DELETE' }),
  toggleUserStatus: (id) => apiCall(`/users/${id}/toggle`, { method: 'PATCH' })
}

// Category APIs
export const categoryAPI = {
  getCategories: () => apiCall('/categories'),
  getCategory: (id) => apiCall(`/categories/${id}`),
  createCategory: (data) => apiCall('/categories', { method: 'POST', body: data }),
  updateCategory: (id, data) => apiCall(`/categories/${id}`, { method: 'PUT', body: data }),
  deleteCategory: (id) => apiCall(`/categories/${id}`, { method: 'DELETE' })
}

export default apiCall

