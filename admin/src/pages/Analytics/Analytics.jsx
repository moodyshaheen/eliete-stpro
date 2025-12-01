import React from 'react'
import { FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import './Analytics.css'

function Analytics() {
  const metrics = [
    { label: 'Total Revenue', value: '$125,430', change: '+12.5%', trend: 'up' },
    { label: 'Orders', value: '1,234', change: '+8.2%', trend: 'up' },
    { label: 'Customers', value: '8,452', change: '+15.3%', trend: 'up' },
    { label: 'Conversion Rate', value: '3.24%', change: '-2.1%', trend: 'down' }
  ]

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Track your store performance and insights</p>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-header">
              <h3>{metric.label}</h3>
              <FaChartLine className="metric-icon" />
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.trend}`}>
              {metric.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
              <span>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-content">
        <div className="chart-placeholder">
          <h2>Sales Overview</h2>
          <p>Chart visualization would go here</p>
        </div>
        <div className="chart-placeholder">
          <h2>Top Products</h2>
          <p>Product performance chart would go here</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics

