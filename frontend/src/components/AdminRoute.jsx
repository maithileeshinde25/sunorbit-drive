import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user || user?.loggedUser?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AdminRoute;
