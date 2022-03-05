import { updateProfile } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userName, userObj }) => {
  if (userObj.displayName === "") {
    const name = userObj.email.split("@")[0];
    updateProfile(userObj, {
      displayName: name,
    });
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userName}'s Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
