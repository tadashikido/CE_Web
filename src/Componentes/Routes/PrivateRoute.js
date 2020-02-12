import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "../Login/auth";

const PrivateRoute = ({ comp: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  ></Route>
);

export default PrivateRoute;
