import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import app from './firebaseConfig';

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

// ฟังก์ชันรีเซ็ตรหัสผ่าน
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// ฟังก์ชันออกจากระบบ
export const signOutUser = () => {
  return signOut(auth);
};

// ฟังก์ชันติดตามสถานะผู้ใช้
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ฟังก์ชันอัปเดตโปรไฟล์ผู้ใช้
export const updateUserProfile = (displayName) => {
  return updateProfile(auth.currentUser, {
    displayName: displayName
  });
};

// ฟังก์ชันล็อกอินที่รวมอีเมลและ Google ไว้ในที่เดียว
export const signIn = (email, password, useGoogle = false) => {
  if (useGoogle) {
    return signInWithGoogle();
  } else {
    return signInWithEmail(email, password);
  }
};

// ส่งออก 'auth' เพื่อใช้ในที่อื่น ๆ
export { auth };
export default auth;
