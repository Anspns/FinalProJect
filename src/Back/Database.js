// Back/Database.js
import { getDatabase, ref, set, get, child } from 'firebase/database';
import app from './firebaseConfig';  // นำเข้า Firebase App ที่ตั้งค่าแล้ว

// Initializing Firebase Realtime Database
const dbRealtime = getDatabase(app);

// ฟังก์ชันการเขียนข้อมูลใน Realtime Database
export const writeDataToDatabase = async (path, data) => {
  const dbRef = ref(dbRealtime, path);
  try {
    await set(dbRef, data);
  } catch (error) {
    console.error("Error writing data to database: ", error);
  }
};

// ฟังก์ชันการอ่านข้อมูลจาก Realtime Database
export const readDataFromDatabase = async (path) => {
  const dbRef = ref(dbRealtime, path);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error reading data from database: ", error);
  }
};

export default dbRealtime;
