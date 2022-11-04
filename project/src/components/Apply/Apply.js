import React from "react";
import ApplyEmployer from "./ApplyEmployer";
import "./Apply.css";
import { motion as m } from "framer-motion";
import ApplyEmployee from "./ApplyEmployee";

const Apply = () => {
  const isShow = false;
  const forEmployer = [
    {
      poster: "Sasuke",
      name: "Kathmandu University",
      employee: [
        {
          employeeName: "Naruto",
          status: "Pending",
          date: "2022-10-12",
        },
        {
          employeeName: "Boruto",
          status: "Pending",
          date: "2022-10-22",
        },
      ],
      //   date: new Date().getFullYear().toLocaleString(),
    },
    {
      poster: "Lonely",
      name: "Wish University",
      employee: [
        {
          employeeName: "Naruto",
          status: "Pending",
          date: "2022-10-12",
        },
        {
          employeeName: "Boruto",
          status: "Pending",
          date: "2022-10-22",
        },
      ],
    },
  ];

  const forEmployee = [
    {
      name: "Kathmandu University",
      poster: "KP Oli",
      date: "2022-10-14",
      status: "Pending",
    },
    {
      name: "Konoha University",
      poster: "Hatake Kakashi",
      date: "2021-10-14",
      status: "Pending",
    },
  ];

  return (
    // <div>
    //   {forEmployer.map((data) => {
    //     return (
    //       <div>
    //         <div>{data.name}</div>
    //         <div>{data.date}</div>
    //         <div>
    //           {data.employee.map((info) => {
    //             return <div>{info}</div>;
    //           })}
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    // for employer
    <div>
      {isShow && (
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
      )}
      {!isShow && (
        <div>
          <h1 className="apply-title">Your Vacancies</h1>
          <m.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="apply-main-employee"
          >
            <ApplyEmployee details={forEmployee[0]}></ApplyEmployee>
            <ApplyEmployee details={forEmployee[0]}></ApplyEmployee>
            <ApplyEmployee details={forEmployee[0]}></ApplyEmployee>
            <ApplyEmployee details={forEmployee[0]}></ApplyEmployee>
          </m.div>
        </div>
      )}
    </div>
  );
};

export default Apply;
