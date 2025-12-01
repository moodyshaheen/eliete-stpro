import React, { useState } from 'react'
import { FaSave } from 'react-icons/fa'
import './Settings.css'

function Settings() {
  const [settings, setSettings] = useState({
    storeName: 'EliteStore',
    email: 'admin@elitestore.com',
    phone: '+123 456 7890',
    address: '123 Store Street, City, Country',
    currency: 'USD',
    taxRate: '10',
    shippingCost: '20'
  })

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save settings logic here
    alert('Settings saved successfully!')
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your store settings and preferences</p>
        </div>
      </div>

      <div className="settings-container">
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-section">
            <h2>Store Information</h2>
            <div className="form-group">
              <label>Store Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="form-input"
                rows="3"
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Business Settings</h2>
            <div className="form-group">
              <label>Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="form-input"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tax Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Shipping Cost ($)</label>
              <input
                type="number"
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="save-btn">
            <FaSave />
            <span>Save Settings</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings

