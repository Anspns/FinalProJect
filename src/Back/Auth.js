// Back/Auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from './firebaseConfig';  // นำเข้า Firebase App ที่ตั้งค่าแล้ว

// Initializing Firebase Auth
const auth = getAuth(app);

// ฟังก์ชันการสมัครสมาชิกด้วยอีเมล
export const signUpWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// ฟังก์ชันการล็อกอินด้วยอีเมลและรหัสผ่าน
export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// ฟังก์ชันการล็อกอินด้วย Google
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// ฟังก์ชันรวมสำหรับการล็อกอินทั้งด้วยอีเมลและ Google
export const signIn = (email, password, useGoogle = false) => {
  if (useGoogle) {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider); // ใช้ Google SignIn
  } else {
    return signInWithEmailAndPassword(auth, email, password); // ใช้อีเมลและรหัสผ่าน
  }
};

// ส่งออก 'auth' เพื่อใช้ในที่อื่น ๆ
export { auth };

export default auth;
