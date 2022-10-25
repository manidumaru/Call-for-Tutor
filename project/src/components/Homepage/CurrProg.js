import "./CurrProg.css";
import eventbanner from "../../assets/eventbanner.png";
import { motion as m } from "framer-motion";

function CurrProg() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "circIn" }}
      class="currProg-main"
    >
      <div class="currprog-title">Current Programme</div>
      <div class="event-banner">
        <div class="picture">
          <img src={eventbanner} alt=""></img>
        </div>
        <div className="event-detail-parent">
          <div class="event-details">
            <div class="event-title">Awareness Campaign</div>
            <p>Address: Dolpa-5, Dolpa</p>
            <p>District: Dolpa</p>
            <p>Maxmimum Participants: 150</p>
            <p>Remaining: 101</p>
            <p>Date: 19-11:2022</p>
          </div>
          <div class="event-button">
            <m.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              Participate
            </m.button>
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default CurrProg;
