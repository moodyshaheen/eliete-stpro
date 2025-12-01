import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
  FaTruck,
  FaHeadphones,
} from "react-icons/fa";

import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* Top Footer */}
      <div className="footer-top">
        
        {/* Column 1 */}
        <div className="footer-col">
          <h2 className="logo">EliteShop</h2>
          <p>
            Your trusted partner for premium quality products. We bring you the latest
            trends and timeless classics with exceptional service.
          </p>

          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Special Offers</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h3>Customer Service</h3>
          <ul>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping Info</li>
            <li>Returns</li>
            <li>Size Guide</li>
            <li>Track Order</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h3>Get in Touch</h3>
          <p><FaMapMarkerAlt /> 123 Fashion Street, New York, NY 10001, United States</p>
          <p><FaPhoneAlt /> +1 (555) 123-4567  
            <span className="small">Mon–Fri 9AM–6PM</span>
          </p>
          <p><FaEnvelope /> hello@modernstore.com  
            <span className="small">24/7 Support</span>
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        
        <div className="bottom-left">
          © 2024 EliteShop. All rights reserved. Designed with ❤️ for premium shopping experience.
        </div>

        <div className="bottom-icons">
          <span><FaShieldAlt /> Secure Shopping</span>
          <span><FaTruck /> Free Shipping</span>
          <span><FaHeadphones /> 24/7 Support</span>
        </div>

        <div className="bottom-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Powered by Readdy</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
