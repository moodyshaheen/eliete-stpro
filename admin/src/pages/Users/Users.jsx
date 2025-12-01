import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { userAPI } from '../../utils/api'
import toast from 'react-hot-toast'
import './Users.css'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await userAPI.getUsers()
      setUsers(data.users || [])
    } catch (error) {
      toast.error('Failed to load users')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (userId) => {
    try {
      await userAPI.toggleUserStatus(userId)
      toast.success('User status updated')
      loadUsers()
    } catch (error) {
      toast.error('Failed to update user status')
    }
  }

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(userId)
        toast.success('User deleted')
        loadUsers()
      } catch (error) {
        toast.error('Failed to delete user')
      }
    }
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>Manage user accounts and permissions</p>
        </div>
      </div>

      <div className="users-table-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>No users found</p>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>#{user._id?.slice(-6) || user.id}</td>
                  <td className="user-name">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${(user.role || 'customer').toLowerCase()}`}>
                      {user.role === 'admin' ? 'Admin' : 'Customer'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${(user.isActive ? 'active' : 'inactive').toLowerCase()}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt || user.joinDate).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit User">
                        <FaEdit />
                      </button>
                      {user.isActive ? (
                        <button 
                          className="action-btn deactivate" 
                          title="Deactivate"
                          onClick={() => handleToggleStatus(user._id || user.id)}
                        >
                          <FaUserTimes />
                        </button>
                      ) : (
                        <button 
                          className="action-btn activate" 
                          title="Activate"
                          onClick={() => handleToggleStatus(user._id || user.id)}
                        >
                          <FaUserCheck />
                        </button>
                      )}
                      <button 
                        className="action-btn delete" 
                        title="Delete"
                        onClick={() => handleDelete(user._id || user.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Users

