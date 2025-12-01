import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from 'react-icons/fa'
import { productAPI, categoryAPI } from '../../utils/api'
import toast from 'react-hot-toast'
import './Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discount: '0',
    category: '',
    stock: '',
    status: 'active',
    featured: false,
    images: []
  })
  const [imageFiles, setImageFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  // Reload categories when modal opens
  useEffect(() => {
    if (showModal && categories.length === 0) {
      loadCategories()
    }
  }, [showModal])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productAPI.getProducts()
      setProducts(data.products || [])
    } catch (error) {
      toast.error('Failed to load products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      console.log('Loading categories...')
      const data = await categoryAPI.getCategories()
      console.log('Categories API response:', data)
      
      // Handle different response formats
      let categoriesList = []
      if (data && data.categories && Array.isArray(data.categories)) {
        categoriesList = data.categories
      } else if (data && Array.isArray(data)) {
        categoriesList = data
      } else if (data && data.success && data.categories) {
        categoriesList = data.categories
      }
      
      console.log('Parsed categories:', categoriesList)
      
      if (categoriesList.length > 0) {
        setCategories(categoriesList)
        console.log(`✅ Loaded ${categoriesList.length} categories`)
      } else {
        setCategories([])
        console.warn('⚠️ No categories found in response')
        toast.error('No categories found. Please create categories first.')
      }
    } catch (error) {
      console.error('❌ Failed to load categories:', error)
      toast.error(`Failed to load categories: ${error.message || 'Unknown error'}`)
      setCategories([])
    }
  }

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        discount: product.discount || '0',
        category: product.category?._id || product.category || '',
        stock: product.stock || '',
        status: product.status || 'active',
        featured: product.featured || false,
        images: product.images || []
      })
    } else {
      setEditingProduct(null)
      setFormData({
        title: '',
        description: '',
        price: '',
        discount: '0',
        category: '',
        stock: '',
        status: 'active',
        featured: false,
        images: []
      })
    }
    setImageFiles([])
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData({
      title: '',
      description: '',
      price: '',
      discount: '0',
      category: '',
      stock: '',
      status: 'active',
      featured: false,
      images: []
    })
    setImageFiles([])
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title || !formData.description || !formData.price || !formData.category || formData.stock === '') {
      toast.error('Please fill in all required fields')
      return
    }

    // Images are optional now, but warn if no images
    if (imageFiles.length === 0 && !editingProduct) {
      const confirm = window.confirm('No images selected. Continue without images?')
      if (!confirm) return
    }
    
    setSubmitting(true)
    try {
      const submitData = new FormData()
      submitData.append('title', formData.title.trim())
      submitData.append('description', formData.description.trim())
      submitData.append('price', parseFloat(formData.price) || 0)
      submitData.append('discount', parseFloat(formData.discount) || 0)
      submitData.append('category', formData.category)
      submitData.append('stock', parseInt(formData.stock) || 0)
      submitData.append('status', formData.status)
      submitData.append('featured', formData.featured ? 'true' : 'false')
      
      imageFiles.forEach((file) => {
        submitData.append('images', file)
      })

      console.log('Submitting product data:', {
        title: formData.title,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        imagesCount: imageFiles.length
      })

      // Log FormData contents
      console.log('FormData entries:')
      for (let [key, value] of submitData.entries()) {
        console.log(`  ${key}:`, value instanceof File ? `File: ${value.name}` : value)
      }

      if (editingProduct) {
        const response = await productAPI.updateProduct(editingProduct._id, submitData)
        console.log('Product updated:', response)
        toast.success('Product updated successfully')
      } else {
        console.log('Calling createProduct API...')
        const response = await productAPI.createProduct(submitData)
        console.log('Product created response:', response)
        toast.success('Product created successfully')
      }
      
      handleCloseModal()
      await loadProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      })
      const errorMessage = error.message || error.response?.data?.message || 'Failed to save product'
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
                         product.status === statusFilter.toLowerCase() ||
                         (statusFilter === 'out_of_stock' && product.stock === 0)
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product inventory</p>
        </div>
        <button className="add-product-btn" onClick={() => handleOpenModal()}>
          <FaPlus />
          <span>Add Product</span>
        </button>
      </div>

      <div className="products-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'out_of_stock' ? 'active' : ''}`}
            onClick={() => setStatusFilter('out_of_stock')}
          >
            Out of Stock
          </button>
        </div>
      </div>

      <div className="products-table-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>No products found</p>
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const productImage = product.images?.[0] || product.image || ''
                const imageUrl = productImage.startsWith('http') 
                  ? productImage 
                  : productImage.startsWith('/upload') 
                    ? `http://localhost:4000${productImage}`
                    : productImage
                
                return (
                  <tr key={product._id || product.id}>
                    <td>
                      <div className="product-image-cell">
                        {productImage ? (
                          <img 
                            src={imageUrl} 
                            alt={product.title || product.name}
                            className="product-thumbnail"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50x50?text=No+Image'
                            }}
                          />
                        ) : (
                          <div className="product-thumbnail-placeholder">
                            <span>No Image</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>#{product._id?.slice(-6) || product.id}</td>
                    <td className="product-name">{product.title || product.name}</td>
                    <td>{product.category?.name || product.category || 'N/A'}</td>
                    <td className="price">${product.price?.toFixed(2) || product.price}</td>
                    <td>
                      <span className={`stock ${product.stock === 0 ? 'out' : ''}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${(product.status || 'active').toLowerCase().replace(' ', '-')}`}>
                        {product.status === 'out_of_stock' ? 'Out of Stock' : product.status || 'Active'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit" 
                          title="Edit"
                          onClick={() => handleOpenModal(product)}
                        >
                          <FaEdit />

                        </button>
                        <button 
                          className="action-btn delete" 
                          title="Delete"
                          disabled={deletingId === (product._id || product.id)}
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this product?')) {
                              const productId = product._id || product.id
                              setDeletingId(productId)
                              try {
                                await productAPI.deleteProduct(productId)
                                toast.success('Product deleted')
                                loadProducts()
                              } catch (error) {
                                toast.error('Failed to delete product')
                              } finally {
                                setDeletingId(null)
                              }
                            }
                          }}
                        >
                          {deletingId === (product._id || product.id) ? (
                            <span className="spinner-small"></span>
                          ) : (
                            <FaTrash />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product title"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Enter product description"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      disabled={categories.length === 0}
                      style={{ flex: 1 }}
                    >
                      <option value="">
                        {categories.length === 0 ? 'No categories available' : 'Select category'}
                      </option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={loadCategories}
                      style={{
                        padding: '8px 12px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      title="Reload categories"
                    >
                      🔄
                    </button>
                  </div>
                  {categories.length === 0 && (
                    <small style={{ color: '#ef4444', marginTop: '4px', display: 'block' }}>
                      No categories found. Click the refresh button or create categories first.
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                    />
                    Featured Product
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Product Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <small>You can select multiple images</small>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-white"></span>
                      <span>{editingProduct ? 'Updating...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <span>{editingProduct ? 'Update Product' : 'Create Product'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products

