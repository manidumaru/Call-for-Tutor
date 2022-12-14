import LoginForm from "./LogInForm";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const Navigate = useNavigate();

  const HideLogIn = () => {
    Navigate("/");
  };
  return (
    <div>
      <LoginForm onClose={HideLogIn} />
    </div>
  );
};

export default LogIn;
