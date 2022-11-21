import React, { useContext, useState } from "react";
import "./UserDetails.css";
import { motion as m } from "framer-motion";
import axios from "axios";
import UserContext from "../../userContext";
import { useNavigate } from "react-router-dom";

const UserDetails = (props) => {
  const navigator = useNavigate();
  const state = useContext(UserContext);
  const role = state.role;
  const token = state.token;
  const id = state.id;
  const [error, setError] = useState("");
  const [profileDetails, setProfileDetails] = useState({
    username: "",
    contact: "",
    address: "",
    qualification: "",
    dob: "",
    gender: "",
  });

  const [employerProfileDetails, setEmployerProfileDetails] = useState({
    username: "",
  });

  const authAxios = axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const addEmployee = async () => {
    console.log(profileDetails);
    await authAxios
      .post("http://127.0.0.1:8000/api/employee", {
        username: profileDetails.username,
        contact: profileDetails.contact,
        address: profileDetails.address,
        qualifications: profileDetails.qualification,
        date_of_birth: profileDetails.dob,
        gender: profileDetails.gender,
      })
      .then(function (response) {
        console.log(response);
        state.setInfo(token, role, response.data.id);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      });
  };

  const addEmployer = async () => {
    console.log(employerProfileDetails);
    await authAxios
      .post("http://127.0.0.1:8000/api/employer", {
        username: employerProfileDetails.username,
      })
      .then(function (response) {
        console.log(response);
        state.setInfo(token, role, response.data.id);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      });
  };

  const updateProfile = (event) => {
    event.preventDefault();
    if (role === "Employee") {
      addEmployee();
    } else {
      addEmployer();
    }
  };

  const logout = () => {
    state.setInfo(null, null, null);
    navigator("/");
  }

  var profileUpdater;

  if (id === null && role === "Employee") {
    profileUpdater = (
      <div className="profile-form">
        <div className="form-area">
          <form onSubmit={updateProfile}>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="text"
                className="effect"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    username: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>Contact: </label>
              <input
                type="text"
                className="effect"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    contact: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>Address: </label>
              <input
                type="text"
                className="effect"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    address: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>Date of Birth: </label>
              <input
                type="date"
                className="effect"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    dob: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="form-group">
              <div
                className="gender-radio"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    gender: e.target.value,
                  })
                }
              >
                <label className="empLabel">Gender: </label>
                <label>
                  <input type="radio" name="userOption" value="MALE"></input>
                  Male
                </label>
                <label>
                  <input type="radio" name="userOption" value="FEMALE"></input>
                  Female
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Qualification: </label>
              <textarea
                rows="4"
                cols="50"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    qualification: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div>
              <button type="submit">Update Profile</button>
              <p>{error}</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
  //////////////////////////////////////////////////////////////
  else if (id === null && role === "Employer") {
    profileUpdater = (
      <div>
        <div className="form-area">
          <form onSubmit={updateProfile}>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="text"
                className="effect"
                onChange={(e) =>
                  setEmployerProfileDetails({
                    ...employerProfileDetails,
                    username: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <button type="submit">Update Profile</button>
              <p>{error}</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  //////////////////////////////////////////////////////////////
  else if (id !== null && role === "Employee") {
    profileUpdater = (
      <div className="user-details">
        <div className="profile-title">
          <h1>User Profile</h1>
        </div>
        <div className="user-details-top">
          <div className="user-details-top-img">
            <img src={props.details.employee_image} alt="Manoj"></img>
          </div>
          <div className="user-details-info">
            <div className="user-details-info-left">
              <h4>Name : {props.details.user}</h4>
              <h4>Gender : {props.details.gender}</h4>
              <h4>DOB : {props.details.date_of_birth}</h4>
            </div>
            <div className="user-details-info-right">
              <h4>Username : {props.details.username}</h4>
              <h4>Address : {props.details.address}</h4>
              <h4>Contact : {props.details.contact}</h4>
            </div>
          </div>
        </div>
        <div className="underline"></div>
        <div className="user-details-qualification">
          <h1>Qualifications :</h1>
          <p>{props.details.qualifications}</p>
        </div>
        <div className="logout-button">
          <m.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick= {logout}
          >
            LogOut
          </m.button>
        </div>
      </div>
    );
  } else if (id !== null && role === "Employer") {
    profileUpdater = (
      <div>
        <p className="employer-info">Employer Information</p>
      </div>
    );
  }
  else {
    <div className="not-loggedin">
      <h2>You're not logged in, Please login to create your profile</h2>
    </div>
  }

  return <div>{profileUpdater}</div>;
};

export default UserDetails;
