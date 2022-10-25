import Website from "./Website";
import Developers from "./Developers";
import Contacts from "./Contacts";
import "./About.css";
import { motion as m } from "framer-motion";

function About() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="main-about"
    >
      <Website></Website>
      <div className="gap"></div>
      <Developers></Developers>
      <div className="gap"></div>
      <Contacts></Contacts>
      <div className="gap"></div>
    </m.div>
  );
}

export default About;
