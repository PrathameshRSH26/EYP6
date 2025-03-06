import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Responsivestyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const nav = document.querySelector(".navigation-wrap");
    window.onscroll = () => {
      if (document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
      } else {
        nav.classList.remove("scroll-on");
      }
    };

    const navBar = document.querySelectorAll('.nav-link');
    const navCollapse = document.querySelector('.navbar-collapse.collapse');
    navBar.forEach((link) => {
      link.addEventListener("click", () => {
        navCollapse.classList.remove("show");
      });
    });

    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const loginBtn = document.getElementById("loginBtn");

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      loginBtn.innerHTML = `Welcome, ${user.name} <i class="bi bi-box-arrow-right"></i>`;
      loginBtn.addEventListener("click", () => {
        sessionStorage.removeItem("loggedInUser");
        window.location.reload();
      });
    } else {
      loginBtn.addEventListener("click", () => {
        window.location.href = "/login";
      });
    }

    const counter = (id, start, end, duration) => {
      let obj = document.getElementById(id),
        current = start,
        range = end - start,
        increment = end > start ? 1 : -1,
        step = Math.abs(Math.floor(duration / range)),
        timer = setInterval(() => {
          current += increment;
          obj.textContent = current;
          if (current === end) {
            clearInterval(timer);
          }
        }, step);
    };

    counter("count1", 1, 1287, 4000);
    counter("count2", 1, 6570, 4000);
    counter("count3", 1, 7805, 4000);
  }, []);

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navigation-wrap">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img id="brandlogo" src="logo.jpg" alt="brand icon" /> FOODIES
            </a>
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
                  <a className="nav-link active" aria-current="page" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#explore-food">
                    Explore Recipe
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#testimonial">
                    Reviews
                  </a>
                </li>
                <li className="nav-item" id="navlogin">
                  <button id="loginBtn" className="main-btn">
                    LOGIN/REGISTER <i className="bi bi-person-circle"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section id="home">
        <div className="container-fluid px-0 top-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <h1>Welcome to Our Recipe Haven</h1>
                <p>
                  Cook, Share, and Discover Your Next Favorite Recipe! Unlock the secrets to delicious meals with our
                  collection of hand-crafted recipes, created using only the best ingredients. Join the Community Add
                  your favorite recipes and share your culinary adventures with fellow food lovers. From breakfast to
                  dinner, we’ve made it easy to explore, add, and share amazing dishes!
                  <i className="fa-regular fa-pot-food"></i>
                </p>
                <div className="mt-4">
                  <a href="/recipes">
                    <button className="main-btn" id="addRecipeBtn">
                      ADD YOUR OWN RECIPES <i className="fa-solid fa-bowl-rice"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="counter">
        <div className="counter-section">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-3 mb-lg-0 md-mb-0 mb-5">
                <h2>
                  <span id="count1"></span>
                  <p>Views per hour</p>
                </h2>
              </div>
              <div className="col-md-3 mb-lg-0 md-mb-0 mb-5">
                <h2>
                  <span id="count2"></span>
                  <p>Recipes</p>
                </h2>
              </div>
              <div className="col-md-3 mb-lg-0 md-mb-0 mb-5">
                <h2>
                  <span id="count3"></span>
                  <p>Customers</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="about-section wrapper">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-12 mb-lg-0 mb-5">
                <div className="card border-0">
                  <img src="aboutsec1.jpg" className="img-fluid" alt="about" />
                </div>
              </div>
              <div className="col-lg-5 col-md-12 text-sec">
                <h2>Discover a World of Flavor</h2>
                <p>
                  Browse through a collection of handpicked recipes made from the finest ingredients. Whether you're a
                  beginner or an experienced chef, there's something for everyone. Explore a wide range of cuisines, from
                  comforting classics to bold, new flavors.
                </p>
                <button className="main-btn mt-4">Learn more</button>
              </div>
            </div>
          </div>
          <div className="container food-type">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-12 text-sec mb-lg-0 mb-5">
                <h2>Get Inspired & Start Cooking</h2>
                <p>
                  Each recipe comes with easy-to-follow instructions, a list of ingredients, and helpful tips to make
                  your cooking experience enjoyable and stress-free. Start your culinary journey today and impress your
                  loved ones with your cooking skills!
                </p>
                <button className="main-btn mt-4">Learn more</button>
              </div>
              <div className="col-lg-7 col-md-12">
                <div className="card border-0">
                  <img src="bg-1.JPG" alt="img" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="explore-food">
        <div className="explore-food wrapper">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-12 text-sec mb-lg-0 mb-5">
                <h2>Explore Our Food</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing e</p>
                <button className="main-btn mt-auto">
                  <a href="/recipes" style={{ color: 'white' }}>
                    Explore More
                  </a>
                </button>
              </div>
              <div className="col-lg-7 col-md-12">
                <div className="row g-4">
                  <div className="col-lg-6 col-md-6 col-12 d-flex">
                    <div className="card text-center p-3 flex-fill">
                      <img src="rainbowdish.jpg" alt="img" className="img-fluid" />
                      <h4 className="mt-3">Rainbow Vegetable</h4>
                      <p>Time: 15-20 min</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 d-flex">
                    <div className="card text-center p-3 flex-fill">
                      <img src="vegiburger.jpg" alt="img" className="img-fluid" />
                      <h4 className="mt-3">Vegetarian Burger</h4>
                      <p>Time: 10-15 min</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 d-flex">
                    <div className="card text-center p-3 flex-fill">
                      <img src="pasta.jpg" alt="img" className="img-fluid" />
                      <h4 className="mt-3">Cheesy Pasta</h4>
                      <p>Time: 20-25 min</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 d-flex">
                    <div className="card text-center p-3 flex-fill">
                      <img src="fruitsalad.jpg" alt="img" className="img-fluid" />
                      <h4 className="mt-3">Fruit Salad</h4>
                      <p>Time: 10-15 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonial">
        <div className="wrapper testimonial-section">
          <div className="container text-center">
            <h2 className="pb-4">Testimonial</h2>
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="5000">
                      <div className="carousel-content">
                        <img src="test2.jpg" className="review-img" alt="review" />
                        <p>
                          "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                          live the blind texts."
                        </p>
                        <h5>Yuvi Doe - UX Designer</h5>
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000">
                      <div className="carousel-content">
                        <img src="test3.jpg" className="review-img" alt="review" />
                        <p>"Excellent service and amazing food. Highly recommend to anyone looking for quality!"</p>
                        <h5>Jane Smith - Food Critic</h5>
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000">
                      <div className="carousel-content">
                        <img src="cl1.jpg" className="review-img" alt="review" />
                        <p>
                          "A wonderful experience! The staff was incredibly friendly, and the atmosphere was great."
                        </p>
                        <h5>Michael Brown - Travel Blogger</h5>
                      </div>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="row">
          <div className="col-lg-6 left-section">
      <h5>Quick Links</h5>
          <div className="social-icons">
             <a href="#">
          <FontAwesomeIcon icon={faInstagram} size="1x" />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faFacebookF} size="1x" />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faTwitter} size="1x" />
        </a>
        <a href="mailto:example@email.com">
          <FontAwesomeIcon icon={faEnvelope} size="1x" />
        </a>
      </div>
    </div>
            <div className="col-lg-6 right-section">
              <h5>Contact Us</h5>
              <p>
                <i className="fas fa-phone"></i> +1234567890
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> 123 Street, City
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 FOODIES. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;