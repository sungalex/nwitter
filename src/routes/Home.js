import { dbService } from "fbService";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(dbService, "nweets"), {
      msg: nweet,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const getNweets = useCallback(async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  }, []);

  useEffect(() => {
    getNweets();
  }, [getNweets]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.msg}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
