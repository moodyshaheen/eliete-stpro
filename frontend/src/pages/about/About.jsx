import React from 'react'
import { FaShoppingBag, FaUsers, FaAward, FaHeadset, FaTruck, FaShieldAlt } from 'react-icons/fa'
import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import './about.css'

function About() {
  const features = [
    {
      icon: <FaShoppingBag />,
      title: 'Wide Selection',
      description: 'Thousands of products from top brands'
    },
    {
      icon: <FaTruck />,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $99'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Payment',
      description: '100% secure and encrypted transactions'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Our team is always here to help you'
    },
    {
      icon: <MdOutlineLocalFireDepartment />,
      title: 'Hot Deals',
      description: 'Exclusive discounts and special offers'
    },
    {
      icon: <FaAward />,
      title: 'Quality Guaranteed',
      description: 'Premium products with quality assurance'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '5K+', label: 'Products' },
    { number: '50+', label: 'Brands' },
    { number: '99%', label: 'Satisfaction Rate' }
  ]

  return (
    <div className='about-page'>
      <div className='about-header'>
        <h1>About EliteStore</h1>
        <p>Your trusted destination for premium shopping</p>
      </div>

      <div className='about-content'>
        <section className='about-intro'>
          <div className='intro-content'>
            <h2>Welcome to EliteStore</h2>
            <p>
              EliteStore is a premier online shopping destination that brings you the best 
              products from around the world. We are committed to providing our customers with 
              exceptional quality, unbeatable prices, and outstanding customer service.
            </p>
            <p>
              Since our founding, we have been dedicated to curating a diverse selection of 
              products that meet the highest standards of quality. From fashion and electronics 
              to home decor and jewelry, we offer something for everyone.
            </p>
            <p>
              Our mission is to make premium shopping accessible to everyone, with fast delivery, 
              secure payments, and a seamless shopping experience that you can trust.
            </p>
          </div>
        </section>

        <section className='about-features'>
          <h2 className='section-title'>Why Choose Us?</h2>
          <div className='features-grid'>
            {features.map((feature, index) => (
              <div className='feature-card' key={index}>
                <div className='feature-icon'>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='about-stats'>
          <h2 className='section-title'>Our Numbers</h2>
          <div className='stats-grid'>
            {stats.map((stat, index) => (
              <div className='stat-card' key={index}>
                <div className='stat-number'>{stat.number}</div>
                <div className='stat-label'>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className='about-values'>
          <h2 className='section-title'>Our Values</h2>
          <div className='values-content'>
            <div className='value-item'>
              <FaUsers className='value-icon' />
              <div>
                <h3>Customer First</h3>
                <p>Your satisfaction is our top priority. We go above and beyond to ensure you have the best shopping experience.</p>
              </div>
            </div>
            <div className='value-item'>
              <FaAward className='value-icon' />
              <div>
                <h3>Quality Excellence</h3>
                <p>We carefully select every product to ensure it meets our high standards of quality and durability.</p>
              </div>
            </div>
            <div className='value-item'>
              <MdOutlineLocalFireDepartment className='value-icon' />
              <div>
                <h3>Innovation</h3>
                <p>We continuously improve our platform and services to provide you with the latest features and technologies.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About

