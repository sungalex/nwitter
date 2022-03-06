import Nweet from "components/Nweet";
import { authService, dbService } from "fbService";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ setUserName, userObj }) => {
  const [nweets, setNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
      setUserName(userObj.displayName);
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
          required
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span onClick={onLogoutClick} className="formBtn cancelBtn logOut">
        Log Out
      </span>
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweetObj) => (
          <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={false} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
