import React, { useContext, useState, useEffect } from "react";
import ApplyEmployer from "./ApplyEmployer";
import "./Apply.css";
import { motion as m } from "framer-motion";
import ApplyEmployee from "./ApplyEmployee";
import UserContext from "../../userContext";
import axios from "axios";

const Apply = () => {
  const state = useContext(UserContext);
  const token = state.token;
  const role = state.role;
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authAxios = axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  useEffect(() => {
    authAxios
      .get("http://127.0.0.1:8000/api/vaccancy/apply")
      .then(function (response) {
        setIsLoading(false);
        setResult(response.data);
      });
  });

  return (
    <div>
      {/* {isShow && (
        <div>
          <h1 className="apply-title">Your Vacancies</h1>
          <m.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="apply-main-employer"
          >
            <ApplyEmployer details={forEmployer[0]}></ApplyEmployer>
            <ApplyEmployer details={forEmployer[1]}></ApplyEmployer>
          </m.div>
        </div>
      )} */}

      <div>
        <h1 className="apply-title">Your Vacancies</h1>
        <m.div
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="apply-main-employee"
        >
          <div className="vacancy-enclosure">
            {!isLoading &&
              role === "Employee" &&
              result.map((value) => {
                return (
                  <div>
                    <ApplyEmployee details={value}></ApplyEmployee>
                  </div>
                );
              })}
          </div>
          <div className="vacancy-enclosure">
            {!isLoading &&
              role === "Employer" &&
              result.map((value) => {
                return (
                  <div className="applicaton-holder">
                    <ApplyEmployer details={value}></ApplyEmployer>
                  </div>
                );
              })}
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default Apply;
