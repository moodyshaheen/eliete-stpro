import React, { useState, useEffect } from 'react'
import { orderAPI } from '../../utils/api'
import { FaBox, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'
import './orders.css'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await orderAPI.getMyOrders()
      setOrders(data.orders || [])
    } catch (error) {
      toast.error('Failed to load orders')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return <FaCheckCircle className="status-icon completed" />
      case 'processing':
      case 'shipped':
        return <FaClock className="status-icon processing" />
      case 'cancelled':
        return <FaTimesCircle className="status-icon cancelled" />
      default:
        return <FaBox className="status-icon pending" />
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return '#10b981'
      case 'processing':
      case 'shipped':
        return '#3b82f6'
      case 'cancelled':
        return '#ef4444'
      default:
        return '#f59e0b'
    }
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading">Loading orders...</div>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <FaBox className="empty-icon" />
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id || order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id?.slice(-6) || order.id}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt || order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                  {getStatusIcon(order.status)}
                  <span>{order.status || 'Pending'}</span>
                </div>
              </div>

              <div className="order-items">
                {order.items?.map((item, index) => (
                  <div key={index} className="order-item">
                    <img 
                      src={item.product?.images?.[0] || item.product?.image || '/placeholder.jpg'} 
                      alt={item.product?.title || 'Product'} 
                      className="order-item-img"
                    />
                    <div className="order-item-details">
                      <h4>{item.product?.title || 'Product'}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="order-item-price">${item.price?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total: </span>
                  <strong>${order.total?.toFixed(2) || '0.00'}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders

