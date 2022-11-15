import "./Explore.css";
import VacancyCard from "./VacancyCard";
import { motion as m } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";


function Explore() {

  const [vacancies, setVacancies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      axios.get("http://127.0.0.1:8000/api/vaccancy")
      .then(function (response) {
        setVacancies(response.data);
        setIsLoading(false);
      });

    },[]);

  const [searchItem, setSearchItem] = useState("");

  // const vacancies = [
  //   {
  //     Name: "Kathmandu University",
  //     District: "Kavre",
  //     Subject: "Physics",
  //   },
  //   {
  //     Name: "Madhyamik Bidhyalaya",
  //     District: "Sindhupalchowk",
  //     Subject: "Social Studies",
  //   },
  //   {
  //     Name: "Alfa Secondary School",
  //     District: "Morang",
  //     Subject: "English",
  //   },
  //   {
  //     Name: "Meridian Higher ",
  //     District: "Morang",
  //     Subject: "English",
  //   },
  // ];

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      class="explore-main"
    >
      <div className="heading">
        <div className="opportunities">VACANCIES</div>
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
        </div>
      </div>
      {/* vacancy card space */}
      <div className="vacancy-enclosure">
        {/* {vacancies
          .filter((value) => {
            if (searchItem === "") {
              return value.map((item) => {
                return console.log(value);
              });
            } else if (
              value.Subject.toLocaleLowerCase().includes(
                searchItem.toLocaleLowerCase()
              )
            ) {
              return value.map((item) => {
                return (
                  <div>
                    <VacancyCard vancancy={item}></VacancyCard>
                  </div>
                );
              });
            }
            return <div></div>;
          })
          .map((value) => {
            return (
              <div>
                <VacancyCard vacancy={value}></VacancyCard>
              </div>
            );
          })} */}

        {!isLoading && vacancies.map((value) => {
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
