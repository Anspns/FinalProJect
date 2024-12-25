import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // ถ้าไม่ได้ล็อกอิน ให้เปลี่ยนเส้นทางไปหน้า Login
    return <Navigate to="/login" />;
  }

  // ถ้าล็อกอินแล้ว ให้แสดง Component ที่ต้องการ
  return children;
};

export default ProtectedRoute;
