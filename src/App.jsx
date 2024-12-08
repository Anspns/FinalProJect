import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectDetail from "./Pages/ProjectDetail";
import AllNews from "./Pages/AllNews";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Competition from "./Pages/Competition";
import RegistrationForm from "./Pages/RegistrationForm";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Footer />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/all-news" element={<AllNews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/register/:id" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
