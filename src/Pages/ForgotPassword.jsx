import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig"; // นำเข้า Firebase Authentication
import { Link } from "react-router-dom"; // นำเข้า Link

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("อีเมลรีเซ็ตรหัสผ่านได้ถูกส่งไปยังอีเมลของคุณ");
    } catch (err) {
      setError("เกิดข้อผิดพลาด: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-20">
      <form onSubmit={handleResetPassword} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">ลืมรหัสผ่าน</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {message && <div className="text-green-500 text-center mb-4">{message}</div>}

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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "กำลังส่งอีเมล..." : "ส่งอีเมลรีเซ็ตรหัสผ่าน"}
        </button>

        <p className="mt-4 text-center">
          <Link to="/login" className="text-blue-500">กลับไปที่หน้าเข้าสู่ระบบ</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
