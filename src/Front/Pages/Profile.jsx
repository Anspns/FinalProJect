import React, { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import db from "../../Back/Firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfoString = localStorage.getItem("user");
      
      if (!userInfoString) {
        console.log("No user info in localStorage, redirecting to login...");
        navigate("/login");
        return;
      }

      let userInfo;
      try {
        userInfo = JSON.parse(userInfoString);
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!userInfo || !userInfo.uid) {
        navigate("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", userInfo.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          setError("ไม่พบข้อมูลผู้ใช้");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("ไม่สามารถดึงข้อมูลได้");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleEdit = () => {
    setEditMode(true);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!user.username || !user.firstName || !user.lastName) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("user"));
    try {
      await updateDoc(doc(db, "users", userInfo.uid), user);
      localStorage.setItem("user", JSON.stringify({ ...userInfo, ...user }));
      setEditMode(false);
      setSuccess("บันทึกข้อมูลสำเร็จ!");
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  if (loading) return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-20">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">ข้อมูลส่วนตัว</h2>

        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700">ชื่อผู้ใช้</label>
            <input
              type="text"
              value={user.username || ""}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className={`w-full p-2 border rounded ${editMode ? "border-gray-300" : "bg-gray-100"}`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">ชื่อ</label>
            <input
              type="text"
              value={user.firstName || ""}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className={`w-full p-2 border rounded ${editMode ? "border-gray-300" : "bg-gray-100"}`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">นามสกุล</label>
            <input
              type="text"
              value={user.lastName || ""}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className={`w-full p-2 border rounded ${editMode ? "border-gray-300" : "bg-gray-100"}`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">อีเมล</label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          {editMode ? (
            <div className="flex justify-between">
              <button
                type="submit"
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                บันทึก
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                ยกเลิก
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              แก้ไขข้อมูล
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
