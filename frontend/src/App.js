import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
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
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<RecipeDashboard isLoggedIn={isLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;