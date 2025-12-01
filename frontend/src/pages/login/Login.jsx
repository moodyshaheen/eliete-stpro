import React, { useState } from "react";
import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {

  const [showPass, setShowPass] = useState(false);

  return (
    <div className="login-page">

      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Login to your account</p>

        {/* EMAIL */}
        <div className="input-group">
          <FaUser className="icon" />
          <input type="email" placeholder="Email Address" />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          <span
            className="show-btn"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "Hide" : "Show"}
          </span>
        </div>

        {/* BUTTON */}
        <button className="login-btn">Login</button>

        {/* FORGOT */}
        <p className="forgot">Forgot your password?</p>

        {/* REGISTER */}
        <p className="register-link">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </div>

    </div>
  );
}

export default Login;
