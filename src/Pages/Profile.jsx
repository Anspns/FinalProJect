import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // ใช้ข้อมูลจาก user ที่ได้รับจาก props หรือ localStorage
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserInfo(storedUser);
    } else {
      setUserInfo(user); // ถ้ามีข้อมูล user ใน props ก็ใช้ข้อมูลนั้น
    }
  }, [user]);

  if (!userInfo) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="container mx-auto py-20">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">โปรไฟล์ผู้ใช้</h2>

        <div className="mb-4">
          <label className="block text-gray-700">อีเมล</label>
          <p className="text-gray-800">{userInfo.email}</p>
        </div>

        {userInfo.displayName && (
          <div className="mb-4">
            <label className="block text-gray-700">ชื่อผู้ใช้</label>
            <p className="text-gray-800">{userInfo.displayName}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">วันที่ลงทะเบียน</label>
          <p className="text-gray-800">
            {userInfo.metadata?.creationTime
              ? new Date(userInfo.metadata.creationTime).toLocaleString()
              : "ไม่มีข้อมูล"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">สถานะการล็อกอิน</label>
          <p className="text-gray-800">{userInfo.emailVerified ? "ยืนยันอีเมลแล้ว" : "ยังไม่ยืนยันอีเมล"}</p>
        </div>

        <div className="text-center mt-6">
          <Link to="/edit-profile" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            แก้ไขโปรไฟล์
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
