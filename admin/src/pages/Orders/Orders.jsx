import React, { useState, useEffect } from 'react'
import { FaEye, FaCheck, FaTimes, FaTimes as FaClose } from 'react-icons/fa'
import { orderAPI } from '../../utils/api'
import toast from 'react-hot-toast'
import './Orders.css'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await orderAPI.getOrders()
      setOrders(data.orders || [])
    } catch (error) {
      toast.error('Failed to load orders')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = async (order) => {
    try {
      setSelectedOrder(order)
      setShowModal(true)
      setLoadingDetails(true)
      
      // جلب تفاصيل الطلب الكاملة
      const data = await orderAPI.getOrder(order._id || order.id)
      setOrderDetails(data.order || order)
    } catch (error) {
      toast.error('Failed to load order details')
      console.error(error)
      // في حالة الخطأ، استخدم البيانات المتوفرة
      setOrderDetails(order)
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedOrder(null)
    setOrderDetails(null)
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus)
      toast.success('Order status updated')
      
      // إذا تم إلغاء الطلب، احذفه من القائمة
      if (newStatus === 'cancelled') {
        // خيار 1: حذف الطلب من قاعدة البيانات
        try {
          await orderAPI.deleteOrder(orderId)
          toast.success('Cancelled order deleted')
        } catch (error) {
          console.error('Error deleting order:', error)
        }
      }
      
      loadOrders()
      // إذا كان الطلب المحدد مفتوح، أغلقه
      if (selectedOrder && (selectedOrder._id === orderId || selectedOrder.id === orderId)) {
        handleCloseModal()
      }
    } catch (error) {
      toast.error('Failed to update order status')
    }
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage and track all customer orders</p>
        </div>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{orders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-value pending">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="stat-card">
          <h3>Processing</h3>
          <p className="stat-value processing">{orders.filter(o => o.status === 'processing').length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-value completed">{orders.filter(o => o.status === 'completed' || o.status === 'delivered').length}</p>
        </div>
      </div>

      <div className="orders-table-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>No orders found</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id || order.id}>
                  <td>#{order._id?.slice(-6) || order.id}</td>
                  <td className="customer-name">{order.user?.name || order.customer || 'N/A'}</td>
                  <td>{new Date(order.createdAt || order.date).toLocaleDateString()}</td>
                  <td>{order.items?.length || order.items || 0}</td>
                  <td className="amount">${order.total?.toFixed(2) || order.amount}</td>
                  <td>
                    <span className={`status-badge ${(order.status || 'pending').toLowerCase()}`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view" 
                        title="View Details"
                        onClick={() => handleViewDetails(order)}
                      >
                        <FaEye />
                      </button>
                      {order.status === 'pending' && (
                        <button 
                          className="action-btn approve" 
                          title="Approve"
                          onClick={() => handleStatusUpdate(order._id || order.id, 'processing')}
                        >
                          <FaCheck />
                        </button>
                      )}
                      {order.status !== 'completed' && order.status !== 'delivered' && (
                        <button 
                          className="action-btn cancel" 
                          title="Cancel"
                          onClick={() => handleStatusUpdate(order._id || order.id, 'cancelled')}
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && orderDetails && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content order-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details #{orderDetails._id?.slice(-6) || orderDetails.id}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <FaClose />
              </button>
            </div>

            {loadingDetails ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Loading order details...</p>
              </div>
            ) : (
              <div className="order-details-content">
                <div className="detail-section">
                  <h3>Customer Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{orderDetails.user?.name || orderDetails.customer || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{orderDetails.user?.email || orderDetails.email || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{orderDetails.shippingAddress?.phone || orderDetails.phone || 'N/A'}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Shipping Address</h3>
                  {orderDetails.shippingAddress ? (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">Street:</span>
                        <span className="detail-value">{orderDetails.shippingAddress.street || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">City:</span>
                        <span className="detail-value">{orderDetails.shippingAddress.city || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Country:</span>
                        <span className="detail-value">{orderDetails.shippingAddress.country || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Zip Code:</span>
                        <span className="detail-value">{orderDetails.shippingAddress.zipCode || 'N/A'}</span>
                      </div>
                    </>
                  ) : (
                    <p style={{ color: '#6b7280' }}>No shipping address provided</p>
                  )}
                </div>

                <div className="detail-section">
                  <h3>Order Items</h3>
                  <div className="order-items-list">
                    {orderDetails.items && orderDetails.items.length > 0 ? (
                      orderDetails.items.map((item, index) => {
                        const product = item.product || {}
                        const productImage = product.images?.[0] || product.image || ''
                        const imageUrl = productImage.startsWith('http') 
                          ? productImage 
                          : productImage.startsWith('/upload') 
                            ? `http://localhost:4000${productImage}`
                            : productImage
                        
                        return (
                          <div key={index} className="order-item-detail">
                            <img 
                              src={imageUrl || 'https://via.placeholder.com/60x60?text=No+Image'} 
                              alt={product.title || 'Product'} 
                              className="order-item-image"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'
                              }}
                            />
                            <div className="order-item-info">
                              <h4>{product.title || item.title || 'Product'}</h4>
                              <p>Quantity: {item.quantity}</p>
                              <p className="item-price">${(item.price || 0).toFixed(2)}</p>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <p style={{ color: '#6b7280' }}>No items found</p>
                    )}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Order Summary</h3>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${(orderDetails.status || 'pending').toLowerCase()}`}>
                      {orderDetails.status || 'Pending'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Payment Method:</span>
                    <span className="detail-value">{orderDetails.paymentMethod || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {new Date(orderDetails.createdAt || orderDetails.date).toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-row total-row">
                    <span className="detail-label">Total Amount:</span>
                    <span className="detail-value total-amount">
                      ${(orderDetails.total || orderDetails.amount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders

