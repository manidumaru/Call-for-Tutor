import React, { useState } from "react";
import { NavLink, Link, Route, Routes } from "react-router-dom";
import MainHome from "./components/Homepage/MainHome";
import About from "./components/About/About";
import Explore from "./components/Explore/Explore";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import Donate from "./components/Donate/Donate";
import logo from "./assets/aboutus.png";
import profileImage from "./assets/profile.png";
import SignUp from "./components/LogIn/SignUp";
import { motion as m } from "framer-motion";
import UserProfile from "./components/UserProfile/UserProfile";
import VacancyDetails from "./components/Explore/VacancyDetails";
import Apply from "./components/Apply/Apply";
import UserContext from "./userContext";
import CreateVaccancy from "./components/Explore/CreateVacancy";

function App() {
  // const [token, setToken] = useState(null);
  // const value = { token, setToken };

  const setInfo = (token, role, id) => {
    setState({ ...state, token: token, role: role, id: id });
  };

  const initState = {
    token: null,
    role: null,
    id: null,
    setInfo: setInfo,
  };

  const [state, setState] = useState(initState);

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
              <NavLink to="/apply-info">Apply</NavLink>
            </li>
            <div className="loginState">
              {state.token === null ? (
                <li>
                  <Link to="/log-in">
                    <m.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      Log In
                    </m.button>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/profile">
                    <div className="profile-image">
                      <img src={profileImage} alt=""></img>
                    </div>
                  </Link>
                </li>
              )}
            </div>
            <li>
              <Link to="/donate">
                <m.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  Donate
                </m.button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <UserContext.Provider value={state}>
        <Routes>
          <Route path="/" element={<MainHome />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/about-us" element={<About />}></Route>
          <Route path="/log-in" element={<LogIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/donate" element={<Donate />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/vacancy-details" element={<VacancyDetails />}></Route>
          <Route path="/apply-info" element={<Apply />}></Route>
          <Route path="/create-vaccancy" element={<CreateVaccancy />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
