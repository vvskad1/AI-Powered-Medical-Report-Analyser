import React from "react";
import "./Navbar.css";

function Navbar({ isAuthenticated, onLogout, setPage }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-title" onClick={() => setPage("home")}>MedScope.AI</h1>
      {isAuthenticated && (
        <div className="navbar-links">
          <a href="#" onClick={() => {
  setPage("home");
  window.dispatchEvent(new Event("resetResults")); // Custom event
}}>
  Upload
</a>

<a href="#" onClick={() => {
  setPage("about");
  window.dispatchEvent(new Event("resetResults")); // Custom event
}}>About</a>
          <a href="#" onClick={() => {
  setPage("contact");
  window.dispatchEvent(new Event("resetResults")); // Custom event
}}>Contact</a>
          <button className="logout-btn" onClick={onLogout}>Sign Out</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
