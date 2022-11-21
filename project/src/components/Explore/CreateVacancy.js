import React, { useContext, useState } from "react";
import "./createVacancy.css";
import axios from "axios";
import UserContext from "../../userContext";
import { useNavigate } from "react-router-dom";

function CreateVaccancy() {
    const navigator = useNavigate();
  const state = useContext(UserContext);
  const token = state.token;
  const [vaccancyDetails, setVaccancyDetails] = useState({
    name: "",
    district: "",
    subject: "",
    field: "",
    salary: "",
    position: "",
    description: "",
    deadline: "",
    venue: "",
  });

  const authAxios = axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const vacancyCreator = async (event) => {
    event.preventDefault();
    console.log(vaccancyDetails);
    await authAxios.post("http://127.0.0.1:8000/api/vaccancy",
    {
        name: vaccancyDetails.name,
        district: vaccancyDetails.district,
        subject: vaccancyDetails.subject,
        field: vaccancyDetails.field,
        salary: vaccancyDetails.salary,
        position: vaccancyDetails.position,
        description: vaccancyDetails.description,
        deadline: vaccancyDetails.deadline,
        venue: vaccancyDetails.venue,
    })
    .then(function(response) {
        console.log(response.data);
        navigator("/explore");
    })
    .catch(function (error){
        console.log(error.response.data.error);
    }); 
  };

  return (
    <div className="everything-holder">
      <div className="vaccancy-form-holder">
        <form onSubmit={vacancyCreator}>
          <div className="form-parts">
            <label>Vaccancy Name: </label>
            <input
              type="text"
              className="effect"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  name: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="form-parts">
            <label>District: </label>
            <input
              type="text"
              className="effect"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  district: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="form-parts">
            <label>Subject: </label>
            <input
              type="text"
              className="effect"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  subject: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="form-parts">
            <label>Field: </label>
            <input
              type="text"
              className="effect"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  field: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="form-parts">
            <label>Salary: </label>
            <input
              type="text"
              className="effect"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  salary: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="form-parts">
            <label>Position: </label>
            <input
              type="text"
              className="effect"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  position: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="form-parts">
            <label>Description: </label>
            <textarea
              rows="4"
              cols="50"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="form-parts">
            <label>Deadline: </label>
            <input
              type="date"
              className="effect"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  deadline: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="form-parts">
            <label>Venue: </label>
            <input
              type="text"
              className="effect"
              onChange={(e) =>
                setVaccancyDetails({
                  ...vaccancyDetails,
                  venue: e.target.value,
                })
              }
            ></input>
          </div>
          <button type="submit">Create Vacancy</button>
        </form>
      </div>
      <div className="blank-space"></div>
    </div>
  );
}

export default CreateVaccancy;
