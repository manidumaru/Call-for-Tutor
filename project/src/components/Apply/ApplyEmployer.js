import React from "react";
import "./ApplyEmployer.css";

const ApplyEmployer = (props) => {
  return (
    <div className="applyEmployer">
      <div className="vacancy-name">
        <h1>{props.details.name}</h1>
      </div>
      <div className="vacancy-poster">
        <h3>{props.details.poster}</h3>
      </div>
      <div className="employee-status-part">
        <div className="employee-name-date">
          <div className="employee-name">
            <h3>{props.details.employee[0].employeeName}</h3>
          </div>
          <div className="employee-date">
            <h3>{props.details.employee[0].date}</h3>
          </div>
        </div>
        <div className="employee-status">
          <div className="employee-status-state">
            <h3>{props.details.employee[0].status}</h3>
          </div>
          <div className="employee-status-button">
            <button>Accept</button>
            <button className="employee-status-reject">Reject</button>
          </div>
        </div>
      </div>
      <div className="employee-status-part">
        <div className="employee-name-date">
          <div className="employee-name">
            <h3>{props.details.employee[1].employeeName}</h3>
          </div>
          <div className="employee-date">
            <h3>{props.details.employee[1].date}</h3>
          </div>
        </div>
        <div className="employee-status">
          <div className="employee-status-state">
            <h3>{props.details.employee[1].status}</h3>
          </div>
          <div className="employee-status-button">
            <button>Accept</button>
            <button className="employee-status-reject">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyEmployer;
