import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Root from "./Root.jsx";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />

       
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Root />} />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
