import "./Explore.css";

function Explore() {
  return <div className="Explore">Explore</div>;
}

export default Explore;
// import React, { useState } from "react";
// import Modal from "../UI/Modal";
// // import "./LogIn.css";
// import loginImage from "../../assets/loginImage.png";

// const Explore = (props) => {
//   const [userDetails, setUserDetails] = useState({
//     userEmail: "",
//     userPassword: "",
//     userName: "",
//   });

//   const submitHandler = (event) => {
//     event.preventDefault();
//     console.log(userDetails);
//   };

//   return (
//     <Modal onClick>
//       <div className="login_parent">
//         <div className="login_child1">
//           <img src={loginImage} alt="login "></img>
//         </div>
//         <div className="login_child2">
//           <form onSubmit={submitHandler}>
//             <div className="form-inner">
//               <div className="login_topic">
//                 <h2>Call For Tutor</h2>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={userDetails.userEmail}
//                   onChange={(e) =>
//                     setUserDetails({
//                       ...userDetails,
//                       userEmail: e.target.value,
//                     })
//                   }
//                 ></input>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="username">Email:</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   value={userDetails.userName}
//                   onChange={(e) =>
//                     setUserDetails({
//                       ...userDetails,
//                       userName: e.target.value,
//                     })
//                   }
//                 ></input>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={userDetails.userPassword}
//                   onChange={(e) =>
//                     setUserDetails({
//                       ...userDetails,
//                       userPassword: e.target.value,
//                     })
//                   }
//                 ></input>
//               </div>
//               <button type="submit">Sign Up</button>
//             </div>
//           </form>
//           <div className="login_noacc">
//             <h5>Already have an account?</h5>
//             <div className="logintosign">
//               <h5> Log In</h5>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default Explore;
