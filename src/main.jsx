import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./Root.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/dashboard" element={<Root />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
