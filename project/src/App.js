import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import MainHome from "./components/Homepage/MainHome";
import About from "./components/About/About";
import Explore from "./components/Explore/Explore";
import "./App.css";
import Login from "./components/LogIn/LogIn";

function App() {
  const [isTrue, setIsTure] = useState(false);

  const showLogIn = () => {
    setIsTure(true);
  };

  const hideLogin = () => {
    setIsTure(false);
  };
  return (
    <div>
      {isTrue && <Login onClose={hideLogin}></Login>}
      <div className="navbar">
        <div className="image">
          <div className="navbar-image">Image</div>
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
              <button onClick={showLogIn}>Log In</button>
            </li>
            <li>
              <button>Donate</button>
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<MainHome />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/about-us" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
