import React, { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import toast from 'react-hot-toast'
import './contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    toast.success('Message sent successfully! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className='contact-page'>
      <div className='contact-header'>
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className='contact-container'>
        <div className='contact-content'>
          {/* Contact Information */}
          <div className='contact-info'>
            <h2>Contact Information</h2>
            <p className='contact-desc'>
              Fill out the form or reach out to us directly. We're here to help!
            </p>

            <div className='info-items'>
              <div className='info-item'>
                <div className='info-icon'>
                  <FaPhone />
                </div>
                <div className='info-details'>
                  <h3>Phone</h3>
                  <p>+123 456 7890</p>
                </div>
              </div>

              <div className='info-item'>
                <div className='info-icon'>
                  <MdEmail />
                </div>
                <div className='info-details'>
                  <h3>Email</h3>
                  <p>hello@elitestore.com</p>
                </div>
              </div>

              <div className='info-item'>
                <div className='info-icon'>
                  <FaMapMarkerAlt />
                </div>
                <div className='info-details'>
                  <h3>Address</h3>
                  <p>123 Store Street, City, Country</p>
                </div>
              </div>
            </div>

            <div className='social-links'>
              <h3>Follow Us</h3>
              <div className='social-icons'>
                <a href='#' className='social-link'><FaFacebookSquare /></a>
                <a href='#' className='social-link'><FaTwitterSquare /></a>
                <a href='#' className='social-link'><FaInstagramSquare /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='contact-form-wrapper'>
            <form className='contact-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Full Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter your name'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='phone'>Phone Number</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Enter your phone number'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='subject'>Subject</label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder='What is this regarding?'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Enter your message'
                  rows='6'
                  required
                ></textarea>
              </div>

              <button type='submit' className='submit-btn'>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

