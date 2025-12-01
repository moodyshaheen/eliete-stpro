import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'
import toast from 'react-hot-toast'
import './loginForm.css'

function LoginForm({ onSwitch }) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!loginData.email || !loginData.password) {
      toast.error('Please fill in all fields')
      return
    }
    
    setLoading(true)
    try {
      const result = await login(loginData.email, loginData.password)
      if (result.success) {
        toast.success('Login successful!')
        navigate('/profile')
      } else {
        toast.error(result.error || 'Login failed')
      }
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!registerData.name || !registerData.email || !registerData.password) {
      toast.error('Please fill in all required fields')
      return
    }
    
    if (registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    
    setLoading(true)
    try {
      const result = await register(registerData)
      if (result.success) {
        toast.success('Account created successfully!')
        navigate('/profile')
      } else {
        toast.error(result.error || 'Registration failed')
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <div className='auth-tabs'>
          <button 
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className='auth-form'>
            <h2>Welcome Back</h2>
            <div className='input-group'>
              <FaEnvelope className='input-icon' />
              <input
                type='email'
                placeholder='Email'
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
            </div>
            <div className='input-group'>
              <FaLock className='input-icon' />
              <input
                type='password'
                placeholder='Password'
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            <button type='submit' className='auth-btn' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className='auth-form'>
            <h2>Create Account</h2>
            <div className='input-group'>
              <FaUser className='input-icon' />
              <input
                type='text'
                placeholder='Full Name'
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                required
              />
            </div>
            <div className='input-group'>
              <FaEnvelope className='input-icon' />
              <input
                type='email'
                placeholder='Email'
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                required
              />
            </div>
            <div className='input-group'>
              <FaLock className='input-icon' />
              <input
                type='text'
                placeholder='Phone (Optional)'
                value={registerData.phone}
                onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
              />
            </div>
            <div className='input-group'>
              <FaLock className='input-icon' />
              <input
                type='password'
                placeholder='Password'
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                required
                minLength={6}
              />
            </div>
            <button type='submit' className='auth-btn' disabled={loading}>
              {loading ? 'Creating...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginForm

