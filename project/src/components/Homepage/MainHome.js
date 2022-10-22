import "./MainHome.css";
import Features from "./Features";
import CurrProg from "./CurrProg";
import bahini from "../../assets/bahini.png";
import { useNavigate } from "react-router-dom";

function MainHome() {
  const Navigate = useNavigate();
  const ShowSignUp = () => {
    Navigate("/sign-up");
  };
  return (
    <div className="MainHome">
      <div className="flyer">
        <div className="image-holder">
          <img src={bahini} alt=""></img>
        </div>
        <div className="quote">
          <div>Invest on Future of the </div>
          <div>Nation</div>
          <div class="gap"></div>

          <button class="Sign-up" onClick={ShowSignUp}>
            Sign Up
          </button>
        </div>
      </div>
      <div className="bottomHalf">
        <Features></Features>
        <CurrProg></CurrProg>
      </div>
      <div class="gap-below">.</div>
    </div>
  );
}

export default MainHome;
