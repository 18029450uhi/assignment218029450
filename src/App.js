import "./App.css";
import QuestionPage from "./pages/QuestionPage";
import Login from "./components/Login";

import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/pages/QuestionPage" />
        )
      }
    />
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log("authenticated", authenticated);
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  });

  return (
    <div>
      <h1>test</h1>
      <Router>
        <Switch>
          <PublicRoute
            exact
            path="/"
            authenticated={authenticated}
            component={Login}
          />
          <PrivateRoute
            exact
            path="/pages/QuestionPage"
            authenticated={authenticated}
            component={QuestionPage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
