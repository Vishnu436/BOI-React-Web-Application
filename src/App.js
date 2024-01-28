import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";
import Applications from "./Mainmenu/Applications.jsx";
import Dashboard from "./Mainmenu/Dashboard.jsx";
import HttpsRedirect from 'react-https-redirect';

function App() {
  return (
    <HttpsRedirect>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Layout />}>
            <Route path="/main/applications" element={<Applications />} />
            <Route path="/main/dashboard" element={<Dashboard />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </HttpsRedirect>
  )
}

export default App;
