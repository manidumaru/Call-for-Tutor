import React from "react";
import "./ApplyEmployee.css";

const ApplyEmployee = (props) => {
  return (
    <div className="apply-employee">
      <div className="apply-employee-vacancy-name">
        <h2>{props.details.vaccancy}</h2>
      </div>
      <div className="apply-employee-vacancy-poster">
        <h3>Employer : {props.details.employer}</h3>
      </div>
      <div className="apply-employee-status">
        <h3>Status: {props.details.status}</h3>
      </div>
    </div>
  );
};

export default ApplyEmployee;
