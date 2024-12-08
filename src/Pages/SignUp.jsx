import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // นำเข้า Firebase Authentication
import { Link } from "react-router-dom"; // นำเข้า Link

const SignUp = () => {
  const [username, setUsername] = useState(""); // ชื่อผู้ใช้
  const [firstName, setFirstName] = useState(""); // ชื่อ
  const [lastName, setLastName] = useState(""); // นามสกุล
  const [email, setEmail] = useState(""); // อีเมล
  const [password, setPassword] = useState(""); // รหัสผ่าน
  const [confirmPassword, setConfirmPassword] = useState(""); // ยืนยันรหัสผ่าน
  const [verificationCode, setVerificationCode] = useState(""); // รหัส 4 หลัก
  const [error, setError] = useState(""); // ข้อผิดพลาด
  const [loading, setLoading] = useState(false); // สถานะการโหลด
  const [passwordVisible, setPasswordVisible] = useState(false); // สถานะการแสดงรหัสผ่าน
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // สถานะการแสดงยืนยันรหัสผ่าน

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกันหรือไม่
    if (password !== confirmPassword) {
      setError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }

    // ตรวจสอบว่ารหัส 4 หลักตรงกับรูปแบบที่ต้องการ (ในที่นี้ให้มีเฉพาะตัวเลข 4 หลัก)
    if (!/^\d{4}$/.test(verificationCode)) {
      setError("กรุณากรอกรหัส 4 หลักที่ถูกต้อง");
      setLoading(false);
      return;
    }

    try {
      // สมัครสมาชิกด้วย Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      alert("สมัครสมาชิกสำเร็จ!");
    } catch (err) {
      setError("เกิดข้อผิดพลาด: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-20">
      <form onSubmit={handleSignUp} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">สมัครสมาชิก</h2>
        
        {/* ข้อผิดพลาด */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* ชื่อผู้ใช้ */}
        <div className="mb-4">
          <label className="block text-gray-700">ชื่อผู้ใช้</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* ชื่อ */}
        <div className="mb-4">
          <label className="block text-gray-700">ชื่อ</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* นามสกุล */}
        <div className="mb-4">
          <label className="block text-gray-700">นามสกุล</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* อีเมล */}
        <div className="mb-4">
          <label className="block text-gray-700">อีเมล</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* รหัสผ่าน */}
        <div className="mb-4">
          <label className="block text-gray-700">รหัสผ่าน</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "ซ่อน" : "แสดง"}
            </button>
          </div>
        </div>

        {/* ยืนยันรหัสผ่าน */}
        <div className="mb-4">
          <label className="block text-gray-700">ยืนยันรหัสผ่าน</label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? "ซ่อน" : "แสดง"}
            </button>
          </div>
          {/* ตรวจสอบการตรงกันของรหัสผ่าน */}
          {password && confirmPassword && password !== confirmPassword && (
            <div className="text-red-500 text-sm mt-1">รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน</div>
          )}
        </div>

        {/* รหัส 4 หลัก */}
        <div className="mb-4">
          <label className="block text-gray-700">รหัส 4 หลัก</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* ปุ่มสมัครสมาชิก */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>

        {/* ลิงก์ไปที่หน้าเข้าสู่ระบบ */}
        <p className="mt-4 text-center">
          มีบัญชีอยู่แล้ว? <Link to="/login" className="text-blue-500">เข้าสู่ระบบ</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
