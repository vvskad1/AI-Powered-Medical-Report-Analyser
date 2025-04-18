import React, { useState } from "react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import Navbar from "./Navbar";
import "./Auth.css";

export default function Auth({ isAuthenticated, onAuthSuccess }) {
  const [type, setType] = useState("signIn");
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    if (type === "signUp") {
      setType("signIn"); // Redirect to sign-in after successful signup
    } else {
      onAuthSuccess(userData);
    }
  };

  if (isAuthenticated) {
    return (
      <>
        <Welcome user={user} onLogout={() => onAuthSuccess(null)} />
      </>
    );
  }

  return (
    <div className="Auth">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className={`container ${type === "signUp" ? "right-panel-active" : ""}`}>
        <SignUpForm onAuthSuccess={handleAuthSuccess} />
        <SignInForm onAuthSuccess={handleAuthSuccess} />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setType("signIn")}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setType("signUp")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
