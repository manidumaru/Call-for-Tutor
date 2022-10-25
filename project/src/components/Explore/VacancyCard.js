import school from "../../assets/school.png";
import "./vacancycard.css";
import { motion as m } from "framer-motion";

function VacancyCard(props) {
  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      className="vacancy-Card"
    >
      <div className="vacancy-image">
        <img src={school} alt=""></img>
      </div>
      <div className="vacancy-description">
        <p>Name: {props.vacancy.Name}</p>
        <p>District: {props.vacancy.District}</p>
        <p>Subject: {props.vacancy.Subject}</p>
      </div>
      <div className="view-details-btn">
        <m.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          View Details
        </m.button>
      </div>
    </m.div>
  );
}

export default VacancyCard;
