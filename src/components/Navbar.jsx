import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "แนะนำ", href: "/" },
    { label: "ข่าวสาร", href: "/all-news" },
    { label: "การประกวด", href: "/competition" },
    { label: "ประเมินคุณภาพปลากัด", href: "/betta-quality" },
    { label: "ประวัติ", href: "/history" },
    { label: "เข้าสู่ระบบ", href: "/login" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        className={`
        fixed top-0 left-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        lg:hidden z-40 pt-16
      `}
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
