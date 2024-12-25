import React, { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../Back/Auth";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setSuccess("เปลี่ยนรหัสผ่านสำเร็จ");
        setTimeout(() => navigate("/profile"), 2000);
      } else {
        setError("กรุณาเข้าสู่ระบบอีกครั้ง");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
    }
  };

  return (
    <div className="container mx-auto py-20">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">เปลี่ยนรหัสผ่าน</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-gray-700">รหัสผ่านปัจจุบัน</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">รหัสผ่านใหม่</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">ยืนยันรหัสผ่านใหม่</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            เปลี่ยนรหัสผ่าน
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
