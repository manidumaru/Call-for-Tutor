import React from "react";
import "./VacancyDetails.css";
import school from "../../assets/school.png";
import { motion as m } from "framer-motion";

const VacancyDetails = () => {
  const vacancyInfo = {
    poster: "Kathmandu University",
    name: "Kathmandu University",
    district: "kathmandu",
    Deadline: "2022-12-25",
    subject: "Maths",
    field: "wth is this",
    salary: "Negotiable",
    position: "HOD",
    venue: "Balwatar-2",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
  };
  return (
    <div className="vacancy-details">
      <div className="vacancy-details-title">
        <h1>{vacancyInfo.poster}</h1>
      </div>
      <div className="vacancy-details-info">
        <div className="vacancy-details-top">
          <div className="vacancy-details-top-img">
            <img src={school} alt="School"></img>
          </div>
          <div className="vacancy-details-top-details">
            <div className="vacancy-details-top-details-list">
              <h4>Name : {vacancyInfo.name}</h4>
              <h4>District : {vacancyInfo.district}</h4>
              <h4>Deadline : {vacancyInfo.Deadline}</h4>
              <h4>Subject : {vacancyInfo.subject}</h4>
              <h4>Field : {vacancyInfo.field}</h4>
              <h4>Salary : {vacancyInfo.salary}</h4>
              <h4>Position : {vacancyInfo.position}</h4>
              <h4>Venue : {vacancyInfo.venue}</h4>
            </div>
          </div>
        </div>
        <div className="horizontal-line"></div>
        <div className="vacancy-details-middle">
          {/* <div className="vacancy-details-middle-left">
            <div className="vacancy-details-middle-left-list">
              <h1>Requirements</h1>
              <ul>
                <li>Bachelors in Arts and Communication</li>
                <li>2 plus experience in teaching</li>
                <li>volunteered in similar projects</li>
              </ul>
            </div>
          </div> */}
          {/* <div className="vacancy-details-middle-right"> */}
          <div className="vacancy-details-middle-right-list">
            <h1>Description</h1>
            <p>{vacancyInfo.description}</p>
            {/* </div> */}
          </div>
        </div>
        <div className="button-apply">
          <m.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className=""
          >
            Apply Now
          </m.button>
        </div>
      </div>
    </div>
  );
};

export default VacancyDetails;
