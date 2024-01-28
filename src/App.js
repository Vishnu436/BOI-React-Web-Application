import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";
import Applications from "./Mainmenu/Applications.jsx";
import Dashboard from "./Mainmenu/Dashboard.jsx";


function App() {
  return (
 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Layout />}>
            <Route path="/main/applications" element={<Applications />} />
            <Route path="/main/dashboard" element={<Dashboard />} /> 
          </Route>
        </Routes>
      </BrowserRouter>

  )
}

export default App;
