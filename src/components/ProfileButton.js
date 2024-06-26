import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
//import LiveChat from "./LiveChat";
import Messages from "./modals/Messages";

function ProfileButton({ updatedData, setUpdatedData }) {
  // modal section
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  const handleProfileClick = () => {
    setShow(true);
  };

  if (!user) {
    return (
      <Link to="/login">
        <button className="btn btn-primary">Login</button>
      </Link>
    );
  }

  const userInitial = user.displayName ? user.displayName : ""; // user.displayName

  return (
    <div>
      <div className="d-flex">
        {/* <button
        // className="btn btn-secondary dropdown-toggle"
        // type="button"
        // id="profileDropdown"
        // data-toggle="dropdown"
        // aria-haspopup="true"
        // aria-expanded="false"

        // style={{ marginRight: "5px" }}
        ></button> */}

        <div className="" onClick={handleProfileClick}>
          <img
            className="w-50 rounded-circle cursor-pointer"
            style={{ border: "2px solid", cursor: "pointer" }}
            src={user?.photoURL}
            alt=""
          />
        </div>

        <button onClick={handleLogout} className="btn btn-secondary">
          Sign Out
        </button>

        <div className="dropdown-menu" aria-labelledby="profileDropdown">
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {show && (
        <Messages
          show={show}
          handleClose={handleClose}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
        />
      )}
    </div>
  );
}

export default ProfileButton;
