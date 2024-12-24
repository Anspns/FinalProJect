import React, { createContext, useState, useContext, useEffect } from "react";

// สร้าง Context สำหรับการล็อกอิน
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ตรวจสอบสถานะล็อกอินทุกครั้งที่เปิดแอป
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", checkLogin); // ฟังการเปลี่ยนแปลงของ localStorage
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook สำหรับดึงค่า Context ไปใช้ในคอมโพเนนต์อื่น
export const useAuth = () => useContext(AuthContext);
