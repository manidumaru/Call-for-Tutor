import Website from "./Website";
import Developers from "./Developers";
import Contacts from "./Contacts";
import "./About.css";

function About() {
    return (
        <div className="main-about">
            <Website></Website>
            <div className="gap"></div>
            <Developers></Developers>
            <div className="gap"></div>
            <Contacts></Contacts>
            <div className="gap"></div>
        </div>
    );
}

export default About;