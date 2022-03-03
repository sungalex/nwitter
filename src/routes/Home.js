import Nweet from "components/Nweet";
import { dbService, storageService } from "fbService";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const nweetObj = {
      text: nweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "nweets"), nweetObj);
    setNweet("");
    setAttachment(null);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  useEffect(() => {
    // a listener for DocumentSnapshot events
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, [attachment]);

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    // EventListener for FileReader
    reader.onloadend = (progressEvent) => {
      const {
        currentTarget: { result },
      } = progressEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onAttachmentClear = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          required
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="" />
            <button onClick={onAttachmentClear}>Clear Photo</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweetObj) => (
          <Nweet
            key={nweetObj.id}
            nweetObj={nweetObj}
            isOwner={nweetObj.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
