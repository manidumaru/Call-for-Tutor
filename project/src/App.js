import React from "react";
import { NavLink, Link, Route, Routes } from "react-router-dom";
import MainHome from "./components/Homepage/MainHome";
import About from "./components/About/About";
import Explore from "./components/Explore/Explore";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import Donate from "./components/Donate/Donate";
import logo from "./assets/aboutus.png"
import SignUp from "./components/LogIn/SignUp";
function App() {
  return (
    <div className="main-page">
      <div className="navbar">
        <div className="image">
          <div className="navbar-image">
            <img src={logo} alt=""></img>
          </div>
        </div>
        <div className="links">
          <ul>
            <li>
              <NavLink end to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore">Explore</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About</NavLink>
            </li>
            <li>
              <Link to="/log-in">
                <button>Log In</button>
              </Link>
            </li>
            <li>
              <Link to="/donate">
                <button>Donate</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<MainHome />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/about-us" element={<About />}></Route>
        <Route path="/log-in" element={<LogIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/donate" element={<Donate/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
