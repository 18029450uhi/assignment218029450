import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import LiveChat from "./LiveChat";
import LiveChatTest from "./LiveChatTest";

function ProfileButton() {

// modal section 
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);const handleShow = () => setShow(true);


  const [user, setUser] = useState(null);

  // firebase.auth().onAuthStateChanged((user) => {
  //   setUser(user);
  // });

  useEffect(() => {
    // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //   setUser(user);
    // });

    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the listener when the component unmounts
    // return () => unsubscribe();
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

  const userInitial = user.displayName ? user.displayName : ""; // user.displayName..charAt(0)

  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="profileDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={handleProfileClick}
        >
          {userInitial}
        </button>

        <button
          onClick={handleLogout}
          className="btn btn-secondary"
        >
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
      {show && <LiveChat show={show} handleClose={handleClose}/>}
      {/* {showChat && <LiveChatTest />} */}
    </div>
  );
}

export default ProfileButton;
