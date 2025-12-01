import { FiShield, FiTruck, FiHeadphones, FiTag } from "react-icons/fi";
import './secion2.css';

function Secion2() {
  return (
    <div className="why-choose-section">
      <h2>Why Choose Us</h2>
      <p className="sub-text">
        We're committed to providing you with the best shopping experience
      </p>

      <div className="features-container">
        
        <div className="feature-box">
          <div className="icon36"><FiShield /></div>
          <h3>Premium Quality</h3>
          <p>All products undergo rigorous quality checks</p>
        </div>

        <div className="feature-box">
          <div className="icon36"><FiTruck /></div>
          <h3>Fast Delivery</h3>
          <p>Free shipping on orders over $99</p>
        </div>

        <div className="feature-box">
          <div className="icon36"><FiHeadphones /></div>
          <h3>24/7 Support</h3>
          <p>Round-the-clock customer assistance</p>
        </div>

        <div className="feature-box">
          <div className="icon36"><FiTag /></div>
          <h3>Best Prices</h3>
          <p>Competitive pricing with great deals</p>
        </div>

      </div>
    </div>
  );
}

export default Secion2;
