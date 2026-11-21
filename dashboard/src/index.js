import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const basename = process.env.NODE_ENV === "production" ? "/dashboard" : "/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);