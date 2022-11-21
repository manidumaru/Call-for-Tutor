import React, { useContext, useState } from "react";
import "./ApplyEmployer.css";
import axios from "axios";
import UserContext from "../../userContext";
import Modal from "../UI/Modal";
import profileImage from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

const ApplyEmployer = (props) => {
  const state = useContext(UserContext);
  const token = state.token;
  const [isShown, setIsShown] = useState(false);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  const modalViewer = () => {
    setIsShown(true);
  };

  const hideDetails = () => {
    navigate("/apply-info");
    setIsShown(false);
  };

  const authAxios = axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  authAxios
    .get(`http://127.0.0.1:8000/api/employee/${props.details.employee_id}`)
    .then(function (response) {
      setEmployee(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data.error);
    });

  const acceptor = () => {
    authAxios
      .put(`http://127.0.0.1:8000/api/vaccancy/apply/${props.details.id}`, {
        status: "ACCEPTED",
      })
      .then(function (response) {
        console.log(response.data);
      });
  };

  const rejector = () => {
    authAxios
      .put(`http://127.0.0.1:8000/api/vaccancy/apply/${props.details.id}`, {
        status: "REJECTED",
      })
      .then(function (response) {
        console.log(response.data);
      });
  };

  return (
    <div className="applyEmployer">
      <div className="title-holder">
        <h2>{props.details.vaccancy}</h2>
      </div>
      <div className="applier-holder">
        <p>Applied by: {props.details.employee}</p>
      </div>
      <div className="status-holder">
        <h5>Status: {props.details.status}</h5>
      </div>
      <div className="employee-status-button">
        {props.details.status === "PENDING" ? (
          <div className="button-group">
            <button className="employee-status-accept" onClick={acceptor}>
              Accept
            </button>
            <button className="employee-status-reject" onClick={rejector}>
              Reject
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="listViewhr">
        <hr></hr>
      </div>
      <div className="profileViewer">
        <button onClick={modalViewer}>View User Details</button>
      </div>
      {isShown ? (
        <Modal onClick={hideDetails}>
          <div className="ModalHolder">
            <div className="photoHolder">
              <img src={profileImage} alt=""></img>
            </div>
            <div className="UserDetailsHolder">
              <div className="nameContact">
                <div className="employeeName">Name: {employee.user}</div>
                <div className="employeeContact">
                  Contact: {employee.contact}
                </div>
              </div>
              <div className="nameContact">
                <div className="employeeName">Address: {employee.address}</div>
                <div className="employeeContact">Gender: {employee.gender}</div>
              </div>
              <div className="userViewhr">
                <hr></hr>
              </div>
              <div className="qualification-header">Qualifications </div>
              <div className="qualification">{employee.qualifications}</div>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ApplyEmployer;
