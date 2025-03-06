import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
    }
  }, [isLoggedIn]); // Update username when isLoggedIn changes

  const handleLogout = () => {
    onLogout(); // Call the onLogout function from props
    localStorage.removeItem("username"); // Remove stored username
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navigation-wrap">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img id="brandlogo" src="logo.jpg" alt="brand icon" /> FOODIES
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {isLoggedIn ? (
                <div className="user-dropdown">
                  <button className="main-btn user-btn">
                    Welcome, {username}
                  </button>
                  <div className="dropdown-content">
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link className="main-btn" to="/login">
                  LOGIN/REGISTER
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
