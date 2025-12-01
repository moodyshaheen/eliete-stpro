import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'
import './ErrorPage.css'

function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="error-page">
      <div className="error-content">
        <FaExclamationTriangle className="error-icon" />
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="home-btn">
          <FaHome />
          <span>Go to Dashboard</span>
        </button>
      </div>
    </div>
  )
}

export default ErrorPage

