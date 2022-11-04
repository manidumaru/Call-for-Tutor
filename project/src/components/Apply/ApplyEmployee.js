import React from "react";
import "./ApplyEmployee.css";

const ApplyEmployee = (props) => {
  return (
    <div className="apply-employee">
      <div className="apply-employee-vacancy-name">
        <h1>{props.details.name}</h1>
      </div>
      <div className="apply-employee-vacancy-poster">
        <h3>Employer : {props.details.poster}</h3>
      </div>
      <div className="apply-employee-date">
        <h3>Applied Date: {props.details.date}</h3>
      </div>
      <div className="apply-employee-status">
        <h3>Status: {props.details.status}</h3>
      </div>
    </div>
  );
};

export default ApplyEmployee;
