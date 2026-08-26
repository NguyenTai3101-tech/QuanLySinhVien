import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import FixProfile from "./FixProfile.jsx";
import Home from "./Home.jsx";
import FillProfile from "./FillProfile.jsx";
import Teacher from "./Teacher.jsx";
import Profile from "./Profile.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Teacher />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/fix-profile" element={<FixProfile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/fill-profile" element={<FillProfile />} />
      <Route path="teacher" element={<Teacher />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
}
