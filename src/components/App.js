import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbService";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
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
