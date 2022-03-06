import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ userName, setUserName, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userName={userName} userObj={userObj} />}
      {isLoggedIn ? (
        <div className="routerContainer">
          <Routes>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route
              exact
              path="/profile"
              element={<Profile setUserName={setUserName} userObj={userObj} />}
            />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Auth />} />
        </Routes>
      )}
    </Router>
  );
};

export default AppRouter;
