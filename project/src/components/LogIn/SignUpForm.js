import React, { useState } from "react";
import Modal from "../UI/Modal";
// import "./LogIn.css";
import loginImage from "../../assets/loginImage.png";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = (props) => {
  const Navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(userDetails);
    Navigate("/profile");
  };

  return (
    <Modal onClick={props.onClose}>
      <div className="login_parent">
        <div className="login_child1">
          <img src={loginImage} alt="login "></img>
        </div>
        <div className="login_child2">
          <form onSubmit={submitHandler}>
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
              <button type="submit">Sign Up</button>
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
      </div>
    </Modal>
  );
};

export default SignUpForm;
