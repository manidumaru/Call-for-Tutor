import "./MainHome.css";
import Features from "./Features";
import CurrProg from "./CurrProg";
import bahini from "../../assets/home.png";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { useContext } from "react";
import UserContext from "../../userContext";

function MainHome() {
  const Navigate = useNavigate();

  const Navigator = () => {
    Navigate("/explore");
  };

  const ShowSignUp = () => {
    Navigate("/sign-up");
  };
  const state = useContext(UserContext);
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="MainHome"
    >
      <div className="flyer">
        <div className="image-holder">
          <img src={bahini} alt=""></img>
        </div>
        <div className="quote">
          <div>Invest on Future of the </div>
          <div>Nation</div>
          <div class="gap"></div>
          {state.token === null ? (
            <m.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              class="Sign-up"
              onClick={ShowSignUp}
            >
              Sign Up
            </m.button>
          ) : (
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              class="Sign-up"
              onClick={Navigator}
            >
              Explore
            </m.button>
          )}
        </div>
      </div>
      <div className="bottomHalf">
        <Features></Features>
        <CurrProg></CurrProg>
      </div>
      <div class="gap-below">.</div>
    </m.div>
  );
}

export default MainHome;
