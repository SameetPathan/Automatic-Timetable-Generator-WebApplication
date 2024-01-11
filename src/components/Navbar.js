import React, { useState } from "react";
import { register } from "../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
import { BrowserRouter as Router, Routes, Route,Link  } from "react-router-dom";
import Cookies from 'js-cookie';
function Navbar(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [registerData, setRegisterData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerErrors, setRegisterErrors] = useState({});

  const logout =()=>{
    props.setLoggedStatus(false)
    props.setCurrentAccount("")
    Cookies.remove('userstatus');
  }

  const handlePhoneNumberChange = (event) => {
    const enteredPhoneNumber = event.target.value;
    setPhoneNumber(enteredPhoneNumber);
    if (enteredPhoneNumber.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number must be 10 digits long",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
    }
  };

  const handlePasswordChange = (event) => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);
    if (enteredPassword.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleLogin = async () => {
    const errors = {};
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone number must be 10 digits long";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    } else {
      const db = getDatabase();
      const userRef = ref(db, "users/" + phoneNumber);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();

      if (!userData) {
        alert("Login Failed ");
        props.setCurrentlogged(true);
      }
      else{
        if(userData.phoneNumber===phoneNumber && userData.password===password){
          props.setCurrentAccount(phoneNumber);
          props.setLoggedStatus(true);
          setPhoneNumber("")
          Cookies.set('userstatus', true); 
          setPassword("")
        }
        else{
          alert("Login Failed")
          props.setLoggedStatus(false);
        }
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegister = () => {
    const errors = {};

    if (!registerData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!registerData.phoneNumber || registerData.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone number must be 10 digits long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerData.email || !emailRegex.test(registerData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!registerData.password || registerData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    } else {
      register(registerData);
      setRegisterData({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-dark"
        style={{ backgroundColor: "#051922" }}
      >
        <a className="navbar-brand">Automatic Timetable System</a>
        <div className="form-inline">
        <Link to="/timetable"> <button
            className="btn btn-outline-success my-2 my-sm-0 mr-2"
  
          >
            View current Week Timetable
          </button></Link>
    
        {props.loggedStatus ? <>

          <Link to="/"  className="btn btn-outline-success my-2 my-sm- mr-2">
        
            Dashboard
       </Link>
          
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
           onClick={logout}
          >
            Logout
          </button>
        </>:
        <><button
            className="btn btn-outline-success my-2 my-sm-0"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Staff Login
          </button>
          <button
            className="btn btn-outline-success my-2 my-sm-0 ml-2"
            data-toggle="modal"
            data-target="#registerModal"
          >
            Staff Register
          </button></>}
          
        </div>
      </nav>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="phone-number" className="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone-number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  {errors.phoneNumber && (
                    <div className="text-danger">{errors.phoneNumber}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">
                Register
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={registerData.name}
                    onChange={handleInputChange}
                  />
                  {registerErrors.name && (
                    <div className="text-danger">{registerErrors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber" className="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={registerData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {registerErrors.phoneNumber && (
                    <div className="text-danger">
                      {registerErrors.phoneNumber}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="col-form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleInputChange}
                  />
                  {registerErrors.email && (
                    <div className="text-danger">{registerErrors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleInputChange}
                  />
                  {registerErrors.password && (
                    <div className="text-danger">{registerErrors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="col-form-label">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {registerErrors.confirmPassword && (
                    <div className="text-danger">
                      {registerErrors.confirmPassword}
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
