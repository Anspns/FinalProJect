import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";  // ดึง useAuth จาก Context

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();  // ใช้สถานะล็อกอินจาก AuthContext

  const navItems = [
    { label: "แนะนำ", href: "/" },
    { label: "ข่าวสาร", href: "/all-news" },
    { label: "การประกวด", href: "/competition" },
    { label: "ประเมินคุณภาพปลากัด", href: "/betta-quality" },
    { label: "ประวัติ", href: "/history" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();  // เรียกฟังก์ชัน logout จาก Context
    alert("ออกจากระบบสำเร็จ");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto px-2 py-4 flex justify-between items-center">
        {/* โลโก้ซ้ายมือ */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="https://via.placeholder.com/100x40"
              alt="Fish"
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
        </div>

        {/* เมนูหน้าจอใหญ่ */}
        <div className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium"
            >
              {item.label}
            </Link>
          ))}

          {/* แสดงเมนูตามสถานะล็อกอิน */}
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border"
                />
                <span className="text-gray-700 font-medium">โปรไฟล์</span>
              </button>

              {/* ดรอปดาวน์เมนู */}
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  ข้อมูลส่วนตัว
                </Link>
                <Link
                  to="/change-password"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  เปลี่ยนรหัสผ่าน
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>

        {/* ปุ่ม Hamburger สำหรับมือถือ */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* เมนูแบบ Slide สำหรับมือถือ */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden z-40 pt-16`}
      >
        <div className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block py-3 px-6 text-center border-b hover:bg-gray-100"
              onClick={toggleMenu}
            >
              {item.label}
            </Link>
          ))}

          {/* เมนูมือถือตามสถานะล็อกอิน */}
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="block py-3 px-6 text-center border-b hover:bg-gray-100"
                onClick={toggleMenu}
              >
                ข้อมูลส่วนตัว
              </Link>
              <Link
                to="/change-password"
                className="block py-3 px-6 text-center border-b hover:bg-gray-100"
                onClick={toggleMenu}
              >
                เปลี่ยนรหัสผ่าน
              </Link>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="block w-full py-3 px-6 text-center border-b hover:bg-gray-100 text-gray-700"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block py-3 px-6 text-center border-b hover:bg-gray-100"
              onClick={toggleMenu}
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
