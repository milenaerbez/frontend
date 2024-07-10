import NavBar from "./navBar";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(window.localStorage.getItem("auth_token"))
  );

  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    setIsLoggedIn(Boolean(token));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homePage" element={<NavBar />} />
        <Route path="*" element={<Navigate to="/homePage" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
