import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import BackgroundC from "./components/background";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(false);

  return (
    <Router>
      <Navbar setLoggedStatus={setLoggedStatus} loggedStatus={loggedStatus} setCurrentAccount={setCurrentAccount} />
      <Routes>
        {loggedStatus ? (
          <Route
            exact
            path="/"
            element={<Home></Home>}
          />
        ) : (
          <>
            <Route exact path="/" element={<BackgroundC />} />
            <Route path="*" element={<BackgroundC />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
