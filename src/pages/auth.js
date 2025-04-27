import React, { useState } from "react";
import "./auth.css";

function auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="body">
      <div className="login-container">
        <h2 id="form-title">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <form>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="input-field"
              required
            />
          )}
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            required
          />
          {isLogin && (
            <a href="#" className="forgot-password" id="forgot-password">
              Forgot Password?
            </a>
          )}
          <button type="submit" className="login-button" id="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <p className="toggle-link">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span className="toggle-text" onClick={toggleForm}>
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="toggle-text" onClick={toggleForm}>
                  Log In
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default auth;