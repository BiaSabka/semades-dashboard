import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Root from "./Root.jsx";
import PrivateRoute from "./components/routes/PrivateRoute";
import "./styles/global.css";
import Superintendencias from "./components/superintendencias/Superintendencias";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Navigate to="/" replace />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Root />} />}
        />
        <Route
          path="/dados-centro"
          element={<PrivateRoute element={<Root />} />}
        />
        <Route
          path="/superintendencias"
          element={<PrivateRoute element={<Superintendencias />} />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
