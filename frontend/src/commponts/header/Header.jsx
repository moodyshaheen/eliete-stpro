import React from 'react'
import './header.css'
import { FaShippingFast, FaLock, FaHeadset } from "react-icons/fa";

function Header() {
  return (
    <div className='header'>
      <div className="overlay"></div>

      <div className="header-content">
        <div className="header-left">
          <h1>
            Discover Your <br />
            <span className="highlight">Perfect Style</span>
          </h1>
          <p>
            Explore our curated collection of premium fashion, electronics, and lifestyle products.
            Quality meets affordability in every piece we offer.
          </p>
          <div className="header-buttons">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">View Deals</button>
          </div>

          <div className="header-icons">
            <div className="icon-box">
              <FaShippingFast className='icon' />
              <span>Free Shipping</span>
            </div>
            <div className="icon-box">
              <FaLock className='icon' />
              <span>Secure Payment</span>
            </div>
            <div className="icon-box">
              <FaHeadset className='icon' />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-box">
            <h2>50K+</h2>
            <p>Happy Customers</p>
          </div>
          <div className="stat-box">
            <h2>10K+</h2>
            <p>Products</p>
          </div>
          <div className="stat-box">
            <h2>99%</h2>
            <p>Satisfaction Rate</p>
          </div>
          <div className="stat-box">
            <h2>24/7</h2>
            <p>Support</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
