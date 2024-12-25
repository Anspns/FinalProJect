import React, { useState } from "react";
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
import { AuthProvider } from "./Context/AuthContext";
import Profile from "./Front/Pages/Profile";
import ChangePassword from "./Front/Pages/ChangePassword";
import ProtectedRoute from "./Context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
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

          {/* Protected Routes */}
          <Route
            path="/register/:id"
            element={
              <ProtectedRoute>
                <RegistrationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/betta-quality"
            element={
              <ProtectedRoute>
                <BettaQuality />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;