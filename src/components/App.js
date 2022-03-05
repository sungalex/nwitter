import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbService";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        if (user.displayName === null || user.displayName === "") {
          const name = user.email.split("@")[0];
          await updateProfile(user, {
            displayName: name,
          });
        }
        setUserName(user.displayName);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter
          userName={userName}
          setUserName={setUserName}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        <h1>Initializing...</h1>
      )}
    </>
  );
}

export default App;
