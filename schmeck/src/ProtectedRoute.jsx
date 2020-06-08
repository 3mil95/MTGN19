import React from "react";
import { Route, Redirect } from "react-router-dom";
import Frack from "./Frack";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  Frack.UpdateCurrentUser().catch(() => {
    Frack.Logout();
  })
  //console.log(Frack.HasToken())
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.adminOnly) {
          if (Frack.CurrentUser) {
            if (Frack.CurrentUser.admin === true) {
              return <Component {...props} currentUser={rest.currentUser}/>;
            }
          }
          return <Redirect to='/' />;
        } else {
          if (Frack.HasToken()) {
            return <Component {...props} currentUser={rest.currentUser}/>;
          } else {
            //console.log(rest.path)
            //return <Redirect to='/Login'/>
            return <Redirect to={{pathname :'/Login', url: props.location.pathname}}/>;
          }
        }
      }}
    />
  );
};

export default ProtectedRoute;
