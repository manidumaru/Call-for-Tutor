import React from "react";
import "./UserDetails.css";

const UserDetails = (props) => {
  return (
    <div className="user-details">
      <div className="profile-title">
        <h1>User Profile</h1>
      </div>
      <div className="user-details-top">
        <div className="user-details-top-img">
          <img src={props.details.photo} alt="Manoj"></img>
        </div>
        <div className="user-details-info">
          <div className="user-details-info-left">
            <h4>Name : {props.details.name}</h4>
            <h4>Sex : {props.details.sex}</h4>
            <h4>DOB : {props.details.dob}</h4>
          </div>
          <div className="user-details-info-right">
            <h4>Username : @{props.details.username}</h4>
            <h4>Address : {props.details.address}</h4>
            <h4>Contact : {props.details.dob}</h4>
          </div>
        </div>
      </div>
      <div className="underline"></div>
      <div className="user-details-qualification">
        <h1>Qualification :</h1>
        <p>{props.details.qualifications}</p>
      </div>
    </div>
  );
};

export default UserDetails;
