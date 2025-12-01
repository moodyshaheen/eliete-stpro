import React, { useState } from "react";
import "./register.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <div className="register-page">

      <div className="register-box">
        <h2 className="register-title">Create Account</h2>
        <p className="register-sub">Join us and start shopping</p>

        {/* NAME */}
        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" placeholder="Full Name" />
        </div>

        {/* EMAIL */}
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="email" placeholder="Email Address" />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          <span className="show-btn" onClick={() => setShowPass(!showPass)}>
            {showPass ? "Hide" : "Show"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type={showPass2 ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <span className="show-btn" onClick={() => setShowPass2(!showPass2)}>
            {showPass2 ? "Hide" : "Show"}
          </span>
        </div>

        {/* BUTTON */}
        <button className="register-btn">Create Account</button>

        {/* LOGIN LINK */}
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

    </div>
  );
}

export default Register;
