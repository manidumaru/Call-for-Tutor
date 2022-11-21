import React, { useState, useEffect, useContext } from "react";
import "./VacancyDetails.css";
import school from "../../assets/school.png";
import { motion as m } from "framer-motion";
import axios from "axios";
import UserContext from "../../userContext";

const VacancyDetails = () => {
  const state = useContext(UserContext);
  const token = state.token;
  const role = state.role;
  const vacencyId = window.location.href.split("=")[1];
  const [vacancyInfo, setVacancyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/vaccancy/${vacencyId}`)
      .then(function (response) {
        setVacancyInfo(response.data);
        setIsLoading(false);
      });
  });

  const vaccancyApplier = () => {
    if (token === null) {
      alert("You're not logged in, Login to apply");
    }
    else if (role === "Employer") {
      alert("Employer cannot apply");
    }
    else if (role === "Employee") {

    }

  }

  // return (
  //   <div className="vacancy-details">
  //     <div className="vacancy-details-title">
  //       <h1>{vacancyInfo.poster}</h1>
  //     </div>
  //     <div className="vacancy-details-info">
  //       <div className="vacancy-details-top">
  //         <div className="vacancy-details-top-img">
  //           <img src={school} alt="School"></img>
  //         </div>
  //         <div className="vacancy-details-top-details">
  //           <div className="vacancy-details-top-details-list">
  //             <h4>Name : {vacancyInfo.name}</h4>
  //             <h4>District : {vacancyInfo.district}</h4>
  //             <h4>Deadline : {vacancyInfo.Deadline}</h4>
  //             <h4>Subject : {vacancyInfo.subject}</h4>
  //             <h4>Field : {vacancyInfo.field}</h4>
  //             <h4>Salary : {vacancyInfo.salary}</h4>
  //             <h4>Position : {vacancyInfo.position}</h4>
  //             <h4>Venue : {vacancyInfo.venue}</h4>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="horizontal-line"></div>
  //       <div className="vacancy-details-middle">
  //         {/* <div className="vacancy-details-middle-left">
  //           <div className="vacancy-details-middle-left-list">
  //             <h1>Requirements</h1>
  //             <ul>
  //               <li>Bachelors in Arts and Communication</li>
  //               <li>2 plus experience in teaching</li>
  //               <li>volunteered in similar projects</li>
  //             </ul>
  //           </div>
  //         </div> */}
  //         {/* <div className="vacancy-details-middle-right"> */}
  //         <div className="vacancy-details-middle-right-list">
  //           <h1>Description</h1>
  //           <p>{vacancyInfo.description}</p>
  //           {/* </div> */}
  //         </div>
  //       </div>
  //       <div className="button-apply">
  //         <m.button
  //           whileHover={{ scale: 1.2 }}
  //           whileTap={{ scale: 0.9 }}
  //           transition={{ duration: 0.2 }}
  //           className=""
  //         >
  //           Apply Now
  //         </m.button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      {!isLoading ? (
        <div className="vacancy-details">
          <div className="vacancy-details-title">
            <h1>{vacancyInfo.poster}</h1>
          </div>
          <div className="vacancy-details-info">
            <div className="vacancy-details-top">
              <div className="vacancy-details-top-img">
                {vacancyInfo.vaccancy_image === null ? (
                  <img src={school} alt="School"></img>
                ) : (
                  <img src={vacancyInfo.vaccancy_image} alt="School"></img>
                )}
              </div>
              <div className="vacancy-details-top-details">
                <div className="vacancy-details-top-details-list">
                  <h4>Name : {vacancyInfo.name}</h4>
                  <h4>District : {vacancyInfo.district}</h4>
                  <h4>Deadline : {vacancyInfo.deadline}</h4>
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
                onClick={vaccancyApplier}
              >
                Apply Now
              </m.button>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
};

export default VacancyDetails;
