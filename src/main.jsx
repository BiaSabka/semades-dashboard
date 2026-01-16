import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Root from "./Root.jsx";
import PrivateRoute from "./components/routes/PrivateRoute";
import "./styles/global.css";
import Superintendencias from "./components/superintendencias/Superintendencias";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dados-centro" element={<Root />} />
        <Route path="/dashboard" element={<Root element={<Root />} />} />
        <Route path="/superintendencias" element={<Superintendencias />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
