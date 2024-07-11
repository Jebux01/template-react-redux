import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

import { history, PrivateRoute } from "./utils";
import Home from "./components/home";
import Login from "./components/login";
import ResponsiveAppBar from "./components/nav";


function App() {
  history.location = useLocation();
  history.navigate = useNavigate();

  return (
    <div className="app-container bg-light">
      <ResponsiveAppBar />
      <div className="container pt-4 pb-4">
        <Routes>
          {/* private */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          {/* public */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
