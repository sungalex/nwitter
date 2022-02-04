import React from "react";
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<Auth />} />
        </Routes>
      )}
    </Router>
  );
};

export default AppRouter;
