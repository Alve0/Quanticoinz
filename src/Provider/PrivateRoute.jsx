import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";
import Loading from "../Pages/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { loading, user } = use(AuthContext);
  if (loading) {
    return <Loading />;
  }
  if (user !== null) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
