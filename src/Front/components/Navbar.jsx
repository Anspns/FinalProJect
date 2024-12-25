import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "แนะนำ", href: "/" },
    { label: "ข่าวสาร", href: "/all-news" },
    { label: "การประกวด", href: "/competition" },
    { label: "ประเมินคุณภาพปลากัด", href: "/betta-quality" },
    { label: "ประวัติ", href: "/history" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    alert("ออกจากระบบสำเร็จ");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-900 shadow-lg z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/100x40"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-white font-bold text-lg">Fish Expo</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-white hover:text-blue-300 transition duration-300 font-medium text-base"
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border-2 border-blue-300"
                />
                <span className="text-white font-medium">โปรไฟล์</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  ข้อมูลส่วนตัว
                </Link>
                <Link
                  to="/change-password"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  เปลี่ยนรหัสผ่าน
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-blue-300 transition duration-300 font-medium"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-blue-900 lg:hidden z-40 pt-16">
          <div className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block py-3 px-6 text-center text-white hover:bg-blue-800 rounded"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block py-3 px-6 text-center text-white hover:bg-blue-800 rounded"
                  onClick={toggleMenu}
                >
                  ข้อมูลส่วนตัว
                </Link>
                <Link
                  to="/change-password"
                  className="block py-3 px-6 text-center text-white hover:bg-blue-800 rounded"
                  onClick={toggleMenu}
                >
                  เปลี่ยนรหัสผ่าน
                </Link>
                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="block w-full py-3 px-6 text-center text-white hover:bg-blue-800 rounded"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-3 px-6 text-center text-white hover:bg-blue-800 rounded"
                onClick={toggleMenu}
              >
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
