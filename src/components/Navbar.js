import React, { useState } from "react";
import cookie from "js-cookie";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  // logout function
  const handleLogout = (e) => {
    if (e.target.textContent === "logout") {
      e.preventDefault();
      cookie.remove("jwt");
      localStorage.removeItem("user");
      localStorage.removeItem("myBlogs");

      setLoggedOut(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  /* styles */
  const [bars, setBars] = useState(false);

  const mobileMenu = (e) => {
    setBars(!bars);
  };

  return (
    <nav className="nav">
      {loggedOut && (
        <div className="model">
          <div className="model-content">
            successfully logged out.
            <div
              style={{
                color: "green",
                fontSize: ".8em",
                textAlign: "center",
                margin: "1em auto",
              }}
            >
              redirecting to home page
            </div>
          </div>
        </div>
      )}
      <div className="nav-center">
        <Link to="/" className="logo">
          <h1>anishSite</h1>
        </Link>
        <div className="header">
          <div className="bars" onClick={mobileMenu}>
            {!bars ? <FaBars /> : <FaTimes />}
          </div>
          <ul className={`nav-links ${bars && "mobile-links"}`}>
            {/* conditional rendering */}
            <NavbarLinks setBars={setBars} handleLogout={handleLogout} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
