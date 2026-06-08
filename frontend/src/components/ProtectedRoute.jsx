import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles
}) => {

  const role =
    localStorage.getItem(
      "role"
    );

  if (!role) {

    return (
      <Navigate
        to="/login"
      />
    );

  }

  if (
  !allowedRoles.includes(role)
  ) {

  alert(
    "Access Denied. You do not have permission to view this page."
  );

  return (
    <Navigate to="/" />
  );

  }

  return children;
};

export default ProtectedRoute;