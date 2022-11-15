import React, { useState } from "react";
import Modal from "../UI/Modal";
// import "./LogIn.css";
import loginImage from "../../assets/loginImage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUpForm = (props) => {
  const Navigate = useNavigate();
  const [errorInfo, setErrorInfo] = useState(null);
  const [responseInfo, setResponseInfo] = useState(null);

  const signUP = async(event) => {
    event.preventDefault();
    await axios.post('http://127.0.0.1:8000/api/signup', {
    name: userDetails.userName,
    email: userDetails.userEmail,
    password: userDetails.userPassword,
    role: userDetails.role,
  })
  .then(function (response) {
    console.log(response);
    setResponseInfo(response);
  })
  .catch(function (error) {
    console.log(error.response.data.error);
    setErrorInfo(error.response.data.error);
  })
  }
  

  const [userDetails, setUserDetails] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
    role: "",
  });

  return (
    <Modal onClick={props.onClose}>
      {responseInfo === null ? 
      <div className="login_parent">
      <div className="login_child1">
        <img src={loginImage} alt="login "></img>
      </div>
      <div className="login_child2">
        <form onSubmit={signUP}>
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
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={userDetails.userName}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    userName: e.target.value,
                  })
                }
                required
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
            <div className="empOption" onChange={(e)=>
                  setUserDetails({
                    ...userDetails,
                    role: e.target.value,
                  })}>
              <label className="empLabel">Choose your role:</label>
              <label>
                <input 
                  type="radio" 
                  name="userOption" 
                  value="EMPLOYEE"
                >
              </input>
              Employee
              </label>
              <label>
              <input type="radio" name="userOption" value="EMPLOYER"></input>
              Employer
              </label>
              
              
            </div>
            <div className="errorDisplay">
              <div><button type="submit">Sign Up</button></div>
              <div className="errorMessage">{errorInfo === null ? <p></p> : <p>{errorInfo}</p> }  </div>
            </div>
          </div>
        </form>
        <div className="login_noacc">
          <h5>Already have an account?</h5>
          <div className="logintosign">
            <Link to="/log-in">
              <h5> Log In</h5>
            </Link>
          </div>
        </div>
      </div>
    </div> : <p>Signed Up, Please Login</p> }
      
    </Modal>
  );
};

export default SignUpForm;
