import React from "react";
import UserDetails from "./UserDetails";

const UserProfile = () => {
  const Details = {
    photo:
      "https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp",
    name: "Manoj Shrestha",
    sex: "Male",
    address: "Space-X, US",
    dob: "10/10/1996",
    username: "chiDori",
    contact: "+977-9841121314",
    qualifications:
      "if you die only once then i want to die with you. ypu got something i nedd in the world full of people. i know that we are not the same. you fot something i need. in the world full of people there is one killing me.",
  };

  return <UserDetails details={Details}></UserDetails>;
};

export default UserProfile;
