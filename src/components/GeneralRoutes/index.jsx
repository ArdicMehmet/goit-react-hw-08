import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors";
import { Navigate, Outlet } from "react-router";

const GeneralRoutes = () => {
  const token = useSelector(selectToken);
  if (token) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

export default GeneralRoutes;
