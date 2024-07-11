import React from "react";
import { Navigate, Outlet, Location, NavigateFunction } from "react-router-dom";
import { useSelector } from "react-redux";

export const history: {
  navigate: NavigateFunction | null;
  location: Location | null;
} = {
  navigate: null,
  location: null,
};

export function PrivateRoute() {
  const auth = useSelector((x: any) => x.auth.value);

  if (!auth) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  // authorized so return outlet for child routes
  return <Outlet />;
}
