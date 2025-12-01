import React, { useState } from 'react'
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

function Header({ toggleSidebar, sidebarOpen }) {
  const [notifications] = useState(5)
  const { user } = useAuth()

  return (
    <header className="admin-header">
      <div className="header-left">
        <button 
          className="menu-toggle" 
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <FaBars />
        </button>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          <FaBell />
          {notifications > 0 && <span className="notification-badge">{notifications}</span>}
        </button>
        <div className="user-profile">
          <FaUserCircle className="user-icon" />
          <div className="user-info">
            <span className="user-name">{user?.name || 'Admin User'}</span>
            <span className="user-role">{user?.role === 'admin' ? 'Administrator' : user?.role || 'Administrator'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

