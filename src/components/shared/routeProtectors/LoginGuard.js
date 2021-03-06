import React from "react";
import { Redirect } from "react-router-dom";

export const LoginGuard = props => {
  if (!localStorage.getItem("token")) {
    return props.children; // returns Login Component
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to={"/game"} />;
};
