import { useState } from "react";
import {Route,Routes} from "react-router-dom"
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Profile from "./Profile.jsx";
import FixProfile from "./FixProfile.jsx";
import Home from "./Home.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/fix-profile" element={<FixProfile />} />
    </Routes>
  );
}
