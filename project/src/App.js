import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import MainHome from './components/Homepage/MainHome';
import About from './components/About/About';
import "./App.css";

function App() {
    return(
        <div>
            <div className="navbar">
                <div className="image">
                    <div className="navbar-image">Image</div>
                </div>
                <div className="links">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to={MainHome}>Explore</Link></li>
                        <li><Link to="/About-Us">About</Link></li>
                        <li><button>Log In</button></li>
                        <li><button>Donate</button></li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<MainHome/>}></Route>
                <Route path="/About-Us" element={<About/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
