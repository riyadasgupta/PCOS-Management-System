import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to home/login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
