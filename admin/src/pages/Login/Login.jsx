import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      console.log('Attempting login with:', { email })
      const result = await login(email, password)
      
      console.log('Login result:', result)
      
      if (result.success) {
        toast.success('Login successful!')
        setTimeout(() => {
          navigate('/admin')
        }, 500)
      } else {
        toast.error(result.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      const errorMessage = error.message || error.response?.data?.message || 'Login failed'
      
      if (errorMessage.includes('Invalid credentials')) {
        toast.error('Invalid email or password')
      } else if (errorMessage.includes('inactive')) {
        toast.error('Your account is inactive. Please contact support.')
      } else if (errorMessage.includes('Admin only')) {
        toast.error('Access denied. Admin accounts only.')
      } else {
        toast.error(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <span className="logo-icon">🛍️</span>
            <h1>EliteStore Admin</h1>
          </div>
          <p>Sign in to your admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/admin/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

