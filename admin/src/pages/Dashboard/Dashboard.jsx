import React, { useState, useEffect } from 'react'
import { FaShoppingBag, FaDollarSign, FaUsers, FaChartLine } from 'react-icons/fa'
import { orderAPI, productAPI, userAPI } from '../../utils/api'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState([
    { title: 'Total Sales', value: '$0', change: '+0%', icon: <FaDollarSign />, color: '#10b981' },
    { title: 'Orders', value: '0', change: '+0%', icon: <FaShoppingBag />, color: '#3b82f6' },
    { title: 'Customers', value: '0', change: '+0%', icon: <FaUsers />, color: '#f59e0b' },
    { title: 'Products', value: '0', change: '+0%', icon: <FaChartLine />, color: '#ef4444' }
  ])
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [ordersData, productsData, usersData] = await Promise.all([
        orderAPI.getOrders({ limit: 5 }),
        productAPI.getProducts({ limit: 1 }),
        userAPI.getUsers()
      ])

      const orders = ordersData.orders || []
      const products = productsData.products || []
      const users = usersData.users || []

      // Calculate total sales
      const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0)
      
      // Update stats
      setStats([
        {
          title: 'Total Sales',
          value: `$${totalSales.toLocaleString()}`,
          change: '+12.5%',
          icon: <FaDollarSign />,
          color: '#10b981'
        },
        {
          title: 'Orders',
          value: ordersData.total?.toLocaleString() || '0',
          change: '+8.2%',
          icon: <FaShoppingBag />,
          color: '#3b82f6'
        },
        {
          title: 'Customers',
          value: users.length.toLocaleString(),
          change: '+15.3%',
          icon: <FaUsers />,
          color: '#f59e0b'
        },
        {
          title: 'Products',
          value: productsData.total?.toLocaleString() || '0',
          change: '+4.1%',
          icon: <FaChartLine />,
          color: '#ef4444'
        }
      ])

      // Format recent orders
      const formattedOrders = orders.slice(0, 5).map(order => ({
        id: order._id || order.id,
        customer: order.user?.name || 'Unknown',
        product: order.items?.[0]?.product?.title || 'Multiple items',
        amount: `$${order.total?.toFixed(2) || '0'}`,
        status: order.status || 'Pending'
      }))
      setRecentOrders(formattedOrders)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your store today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <span className="stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="recent-orders">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      Loading...
                    </td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id?.slice(-6) || order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <FaShoppingBag />
              <span>Add Product</span>
            </button>
            <button className="action-btn">
              <FaUsers />
              <span>View Customers</span>
            </button>
            <button className="action-btn">
              <FaChartLine />
              <span>View Analytics</span>
            </button>
            <button className="action-btn">
              <FaDollarSign />
              <span>View Sales</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

