import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FaHome, FaShoppingBag, FaBox, FaUsers, FaChartLine,
  FaCog, FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
    navigate('/admin')
  }

  const menuItems = [
    { path: '/admin', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/products', icon: <FaShoppingBag />, label: 'Products' },
    { path: '/admin/orders', icon: <FaBox />, label: 'Orders' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/analytics', icon: <FaChartLine />, label: 'Analytics' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ]

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <FaShoppingBag className="logo-icon" />
            <span className="logo-text">EliteStore Admin</span>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

