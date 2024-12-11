import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors";
import { useNavigate, Outlet } from "react-router";

const GeneralRoutes = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return <Outlet />;
};

export default GeneralRoutes;
