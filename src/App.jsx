import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Front/components/Navbar";
import Footer from "./Front/components/Footer";
import ProjectDetail from "./Front/Pages/ProjectDetail";
import AllNews from "./Front/Pages/AllNews";
import Login from "./Front/Pages/Login";
import SignUp from "./Front/Pages/SignUp";
import ForgotPassword from "./Front/Pages/ForgotPassword";
import Competition from "./Front/Pages/Competition";
import RegistrationForm from "./Front/Pages/RegistrationForm";
import BettaQuality from "./Front/Pages/BettaQuality";
import History from "./Front/Pages/History";



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
        <Route path="/betta-quality" element={<BettaQuality />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
