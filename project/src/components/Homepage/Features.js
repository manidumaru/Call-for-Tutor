import "./features.css";
import apply from "../../assets/applyyy.png";
import donate from "../../assets/donate.png";
import volunteer from "../../assets/volunteer.png";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
function Features() {
  const Navigate = useNavigate();

  const ShowExplore = () => {
    Navigate("/explore");
  };

  function popDonate() {
    Navigate("/donate");
  }

  return (
    <m.div
      // whileInView={{ opacity: 1 }}
      // initial={{ opacity: 0 }}
      // // animate={{ y: "0%" }}
      // transition={{ delay: 0.5, duration: 0.5 }}
      className="feature-main"
    >
      <div class="feature-title">Features</div>
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "circIn" }}
        className="Features"
      >
        <div class="Card">
          <div className="card-top">
            <div className="card-top-image">
              <img src={apply} alt=""></img>
            </div>
            <div className="card-title">
              <p>Apply</p>
            </div>
          </div>
          <div className="card-description">
            <p>
              A user can apply to teach in any of the school vacancies through
              the website.{" "}
            </p>
            <p> Explore Vacancies </p>
          </div>
          <div class="card-button">
            <m.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={ShowExplore}
            >
              Explore
            </m.button>
          </div>
        </div>
        <div class="Card">
          <div className="card-top">
            <div className="card-top-image">
              <img src={donate} alt=""></img>
            </div>
            <div className="card-title">
              <p>Donate</p>
            </div>
          </div>
          <div className="card-description">
            <p>
              This is a non-profit organization for future of the Nation. Any
              amount you can donate will be much appreciated.{" "}
            </p>
          </div>
          <div class="card-button">
            <m.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={popDonate}
            >
              Donate
            </m.button>
          </div>
        </div>
        <div class="Card">
          <div className="card-top">
            <div className="card-top-image">
              <img src={volunteer} alt=""></img>
            </div>
            <div className="card-title">
              <p>Volunteer</p>
            </div>
          </div>
          <div className="card-description">
            <p>
              Our team organizes a campaign once in a while. Any eager user can
              apply to volunteer in the programme.{" "}
            </p>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}

export default Features;
