import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Registration";
import RecipeDashboard from "./RecipeDashboard";
import Navbar from "./Component/Navbar";
import "./App.css";
import "./Responsivestyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const hideNavbarPages = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarPages.includes(location.pathname);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={isLoggedIn ? <RecipeDashboard isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />} />
        <Route
          path="/recipes"
          element={isLoggedIn ? <RecipeDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;