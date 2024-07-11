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
import ResponsiveAppBar, { DrawerHeader } from "./components/nav";
import Box from "@mui/material/Box";

function App() {
  history.location = useLocation();
  history.navigate = useNavigate();

  return (
    <div className="app-container bg-light">
      <Box sx={{ display: "flex" }}>
        <ResponsiveAppBar />
        <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '30px' }}>
          <Routes>
            {/* private */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            {/* public */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
