import { authService, dbService } from "fbService";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  const navigate = useNavigate();

  const onLogoutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const getMyNweets = useCallback(async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ": ", doc.data());
      const nweetObj = {
        id: doc.id,
        ...doc.data(),
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  }, [userObj.uid]);

  useEffect(() => {
    getMyNweets();
  }, [getMyNweets]);

  return (
    <>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};

export default Profile;
