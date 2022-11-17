import React, { useState } from "react";
import Modal from "../UI/Modal";
import "./LogInForm.css";
import loginImage from "../../assets/loginImage.png";
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';

const LoginForm = (props) => {
  const navigate = useNavigate();

  const [errorInfo, setErrorInfo] = useState(null);

  const logIn = async(event) => {
    event.preventDefault();
    await axios.post('http://127.0.0.1:8000/api/login', {
    email: userDetails.userEmail,
    password: userDetails.userPassword,
  })
  .then(function (response) {
    console.log(response);
    navigate("/");

  })
  .catch(function (error) {
    console.log(error.response.data.error);
    setErrorInfo(error.response.data.error);
  })
  }

  const [userDetails, setUserDetails] = useState({
    userEmail: "",
    userPassword: "",
  });

  return (
    <Modal onClick={props.onClose}>
      <div className="login_parent">
        <div className="login_child1">
          <img src={loginImage} alt="login"></img>
        </div>
        <div className="login_child2">
          <form onSubmit={logIn}>
            <div className="form-inner">
              <div className="login_topic">
                <h2>Call For Tutor</h2>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userDetails.userEmail}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      userEmail: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={userDetails.userPassword}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      userPassword: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="loginAction">
              <button type="submit">Log In</button>
              
                {errorInfo === null ? <p></p> : <p className="loginError">{errorInfo}</p> }  
              </div>
            </div>
          </form>
          <div className="login_noacc">
            <h5>Dont have an account?</h5>
            <div className="logintosign">
              <Link to="/sign-up">
                <h5> Sign Up</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginForm;
