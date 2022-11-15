import school from "../../assets/school.png";
import "./vacancycard.css";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React from "react";

function VacancyCard(props) {
  const Navigation = useNavigate();

  const viewDetails = (id) => {
    Navigation(`/vacancy-details?q=${id}`);
  };

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      className="vacancy-Card"
    >
      <div className="vacancy-image">
        {props.vacancy.vaccancy_image === null ? 
        <img src={school} alt=""></img>
        :
        <img src={`http://127.0.0.1:8000${props.vacancy.vaccancy_image}`} alt=""></img>
      }
      </div>
      <div className="vacancy-description">
        <p>Name: {props.vacancy.name}</p>
        <p>District: {props.vacancy.district}</p>
        <p>Subject: {props.vacancy.subject}</p>
      </div>
      <div className="view-details-btn">
        <m.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={()=>{
            viewDetails(props.vacancy.id);
          }}
        >
          View Details
        </m.button>
      </div>
    </m.div>
  );
}

export default VacancyCard;
