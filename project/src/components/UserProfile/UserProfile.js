import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../userContext";
import UserDetails from "./UserDetails";
import axios from "axios";

const UserProfile = () => {
  const state = useContext(UserContext);
  const role = state.role;
  const token = state.token;
  const id = state.id;

  const [Details, setDetails] = useState("");

  const authAxios = axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  useEffect(() => {
    if (role === "Employee") {
      authAxios.get( "http://127.0.0.1:8000/api/employee/" + id ).then(function (response) {
        setDetails(response.data);
      });
    }
    else {
      authAxios.get( "http://127.0.0.1:8000/api/employer/" + id ).then(function (response) {
        setDetails(response.data);
      });
    }
  });

  return <UserDetails details={Details}></UserDetails>;
};

export default UserProfile;
