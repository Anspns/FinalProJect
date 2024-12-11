import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Back/firebaseConfig"; // นำเข้า Firebase Authentication
import { Link, useNavigate } from "react-router-dom"; // นำเข้า useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ใช้ hook เพื่อเปลี่ยนเส้นทาง

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // บันทึกข้อมูลผู้ใช้ลงใน localStorage
      localStorage.setItem("user", JSON.stringify(user)); // เก็บข้อมูลผู้ใช้
      localStorage.setItem("isLoggedIn", "true"); // บันทึกสถานะการล็อกอิน

      alert("เข้าสู่ระบบสำเร็จ!");
      navigate("/"); // ไปยังหน้าแรกหลังจากเข้าสู่ระบบสำเร็จ
    } catch (err) {
      setError("เกิดข้อผิดพลาด: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-20">
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">เข้าสู่ระบบ</h2>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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

        <div className="mb-4">
          <label className="block text-gray-700">รหัสผ่าน</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>

        <p className="mt-4 text-center">
          ยังไม่ได้สมัครสมาชิก? <Link to="/signup" className="text-blue-500">สมัครสมาชิก</Link>
        </p>

        <p className="mt-2 text-center">
          <Link to="/forgot-password" className="text-blue-500">ลืมรหัสผ่าน?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
