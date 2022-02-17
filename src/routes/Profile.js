import { authService } from "fbService";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return <button onClick={onLogoutClick}>Log Out</button>;
};

export default Profile;
