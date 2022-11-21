import "./Explore.css";
import VacancyCard from "./VacancyCard";
import { motion as m } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../userContext";

function Explore() {
  const state = useContext(UserContext);
  const role = state.role;
  const id = state.id;
  const navigator = useNavigate();
  const [vacancies, setVacancies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seatchItem, setSearchItem] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/vaccancy").then(function (response) {
      setVacancies(response.data);
      console.log(response.data);
      setIsLoading(false);
    });
  }, []);

  const createVacancy = () => {
    navigator("/create-vaccancy")
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      class="explore-main"
    >
      <div className="heading">
        <div className="opportunities">Vacancies</div>
        <div className="search-bar">
          <div className="input-holder">
            <input
              type="text"
              onChange={(event) => {
                setSearchItem(event.target.value);
              }}
              placeholder="Search by Subject Name"
            ></input>
          </div>
          <div className="search-btn-holder">
            <button className="search-btn">Search</button>
          </div>
          {role === "Employer" && id !== null ? (
            <div className="search-btn-holder">
              <button className="create-vacancy-btn" onClick={createVacancy}>
                Create Vacancy
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* vacancy card space */}
      <div className="vacancy-enclosure">
        {!isLoading &&
          vacancies.map((value) => {
            return (
              <div>
                <VacancyCard vacancy={value}></VacancyCard>
              </div>
            );
          })}
      </div>
    </m.div>
  );
}

export default Explore;
