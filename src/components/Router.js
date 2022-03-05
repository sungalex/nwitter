import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      {isLoggedIn ? (
        <Routes>
          <Route exact path="/" element={<Home userObj={userObj} />} />
          <Route
            exact
            path="/profile"
            element={<Profile userObj={userObj} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Auth />} />
        </Routes>
      )}
    </Router>
  );
};

export default AppRouter;
