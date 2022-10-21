import React, {useState} from 'react';
import MainHome from './components/Homepage/MainHome';
import About from './components/About/About';
import "./App.css";

function App() {
    const [render, setRender] = useState(MainHome);
    function RenderHomepage() {
        setRender(MainHome);
    }
    function RenderExplore() {

    }
    function RenderAbout() {
        setRender(About);
    }
    function RenderLogin() {

    }
    function RenderDonate() {

    }


    return(
        <div>
            <div className="navbar">
                <div className="image">
                    <div className="navbar-image">Image</div>
                </div>
                <div className="links">
                    <ul>
                        <li><a href="#" onClick={RenderHomepage}>Home</a></li>
                        <li><a href="#" onClick={RenderExplore}>Explore</a></li>
                        <li><a href="#" onClick={RenderAbout}>About Us</a></li>
                        <li><button onClick={RenderLogin}>Log In</button></li>
                        <li><button onClick={RenderDonate}>Donate</button></li>
                    </ul>
                </div>
            </div>
            <div>
                {render}
            </div>
        </div>
    );
}

export default App;
