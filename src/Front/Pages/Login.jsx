import React, { useState, useEffect } from "react";
import { signIn } from "../../Back/Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import db from "../../Back/Firestore";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, [navigate]);

  const fetchUserData = async (user) => {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          username: userData.username || "ไม่ระบุ",
          firstName: userData.firstName || "ไม่ระบุ",
          lastName: userData.lastName || "ไม่ระบุ",
        })
      );
    } else {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: "",
        firstName: "",
        lastName: "",
        createdAt: serverTimestamp(),
      });
      console.log("สร้างข้อมูลผู้ใช้ใหม่");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signIn(email, password, false);
      const user = userCredential.user;

      if (!user) {
        throw new Error("ไม่พบข้อมูลผู้ใช้");
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      await fetchUserData(user);
      localStorage.setItem("isLoggedIn", "true");

      alert("เข้าสู่ระบบสำเร็จ!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("เกิดข้อผิดพลาด: " + err.message);
      localStorage.setItem("isLoggedIn", "false");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const userCredential = await signIn(email, password, true);
      const user = userCredential.user;

      if (!user) {
        throw new Error("ไม่พบข้อมูลผู้ใช้");
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastLogin: serverTimestamp(),
          provider: "google",
        },
        { merge: true }
      );

      await fetchUserData(user);
      localStorage.setItem("isLoggedIn", "true");

      alert("เข้าสู่ระบบผ่าน Google สำเร็จ!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("เกิดข้อผิดพลาด: " + err.message);
      localStorage.setItem("isLoggedIn", "false");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-20">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          เข้าสู่ระบบ
        </h2>

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

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบด้วย Google"}
          </button>
        </div>

        <p className="mt-4 text-center">
          ยังไม่ได้สมัครสมาชิก?{" "}
          <Link to="/signup" className="text-blue-500">
            สมัครสมาชิก
          </Link>
        </p>

        <p className="mt-2 text-center">
          <Link to="/forgot-password" className="text-blue-500">
            ลืมรหัสผ่าน?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
