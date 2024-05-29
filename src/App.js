import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import BackgroundC from "./components/background";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Timetable from "./components/Timetable";
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loggedStatus, setLoggedStatus] = useState(true);
  const [currentAccount, setCurrentAccount] = useState(false);

  useEffect(() => {
    let cookieValue = Cookies.get('userstatus');
    if(cookieValue){
      setLoggedStatus(true)
    }else{
      setLoggedStatus(false)
    }
   
  });

  return (
    <Router>
      <Navbar setLoggedStatus={setLoggedStatus} loggedStatus={loggedStatus} setCurrentAccount={setCurrentAccount} />
      <Routes>
        {loggedStatus ? (
          <>
          <Route
            exact
            path="/"
            element={<Home></Home>}
          />
           <Route
            exact
            path="/timetable"
            element={<Timetable isuser={true} loggedStatus={loggedStatus}></Timetable>}
          />
          </>
        ) : (
          <>
          <Route
            exact
            path="/timetable"
            element={<Timetable isuser={false}></Timetable>}
          />
            <Route exact path="/" element={<BackgroundC />} />
            <Route path="*" element={<BackgroundC />} />
          </>
        )}
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
