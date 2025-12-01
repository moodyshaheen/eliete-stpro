import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { profileAPI } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaHeart, FaSignOutAlt, FaBox } from 'react-icons/fa'
import toast from 'react-hot-toast'
import LoginForm from './LoginForm'
import Orders from './Orders'
import './profile.css'

function Profile() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      country: '',
      zipCode: ''
    }
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      loadProfile()
      loadFavorites()
    }
  }, [isAuthenticated])

  const loadProfile = async () => {
    try {
      const data = await profileAPI.getProfile()
      setProfileData({
        name: data.user.name || '',
        email: data.user.email || '',
        phone: data.user.phone || '',
        address: data.user.address || {
          street: '',
          city: '',
          country: '',
          zipCode: ''
        }
      })
    } catch (error) {
      toast.error('Failed to load profile')
    }
  }

  const loadFavorites = async () => {
    try {
      const data = await profileAPI.getFavorites()
      setFavorites(data.favorites || [])
    } catch (error) {
      console.error('Failed to load favorites')
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await profileAPI.updateProfile(profileData)
      toast.success('Profile updated successfully!')
      // تحديث البيانات المحلية
      if (data.user) {
        setProfileData({
          name: data.user.name || profileData.name,
          email: data.user.email || profileData.email,
          phone: data.user.phone || profileData.phone,
          address: data.user.address || profileData.address
        })
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to update profile'
      toast.error(errorMessage)
      console.error('Profile update error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await profileAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      toast.success('Password changed successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      const errorMessage = error.message || 'Failed to change password'
      toast.error(errorMessage)
      console.error('Password change error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    // Stay on profile page to show login form
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div className='profile-page'>
      <div className='profile-header'>
        <div className='profile-avatar'>
          <FaUser />
        </div>
        <h1>{user?.name || 'User Profile'}</h1>
        <p>{user?.email}</p>
      </div>

      <div className='profile-container'>
        <div className='profile-sidebar'>
          <button 
            className={`sidebar-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            <FaLock /> Change Password
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <FaHeart /> Favorites
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaBox /> My Orders
          </button>
          <button 
            className='sidebar-btn logout-btn'
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className='profile-content'>
          {activeTab === 'profile' && (
            <div className='profile-section'>
              <h2>Profile Information</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className='form-group'>
                  <label><FaUser /> Full Name</label>
                  <input
                    type='text'
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label><FaEnvelope /> Email</label>
                  <input
                    type='email'
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label><FaPhone /> Phone</label>
                  <input
                    type='tel'
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>

                <div className='form-group'>
                  <label><FaMapMarkerAlt /> Address</label>
                  <input
                    type='text'
                    placeholder='Street'
                    value={profileData.address.street}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      address: {...profileData.address, street: e.target.value}
                    })}
                  />
                  <div className='address-row'>
                    <input
                      type='text'
                      placeholder='City'
                      value={profileData.address.city}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        address: {...profileData.address, city: e.target.value}
                      })}
                    />
                    <input
                      type='text'
                      placeholder='Country'
                      value={profileData.address.country}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        address: {...profileData.address, country: e.target.value}
                      })}
                    />
                    <input
                      type='text'
                      placeholder='Zip Code'
                      value={profileData.address.zipCode}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        address: {...profileData.address, zipCode: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <button type='submit' className='save-btn' disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className='profile-section'>
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordChange}>
                <div className='form-group'>
                  <label><FaLock /> Current Password</label>
                  <input
                    type='password'
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label><FaLock /> New Password</label>
                  <input
                    type='password'
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                    minLength={6}
                  />
                </div>

                <div className='form-group'>
                  <label><FaLock /> Confirm New Password</label>
                  <input
                    type='password'
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                    minLength={6}
                  />
                </div>

                <button type='submit' className='save-btn' disabled={loading}>
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className='profile-section'>
              <h2>My Favorites</h2>
              {favorites.length === 0 ? (
                <div className='empty-favorites'>
                  <FaHeart />
                  <p>No favorites yet</p>
                </div>
              ) : (
                <div className='favorites-grid'>
                  {favorites.map((product) => (
                    <div key={product._id || product.id} className='favorite-item'>
                      <img src={product.images?.[0] || product.image} alt={product.title} />
                      <h3>{product.title}</h3>
                      <p>${product.price?.toFixed(2) || product.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className='profile-section'>
              <Orders />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

