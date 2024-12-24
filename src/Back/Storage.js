// Back/Storage.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './firebaseConfig';  // นำเข้า Firebase App ที่ตั้งค่าแล้ว

// Initializing Firebase Storage
const storage = getStorage(app);

// ฟังก์ชันการอัพโหลดไฟล์ไปยัง Firebase Storage
export const uploadFile = async (filePath, file) => {
  const storageRef = ref(storage, filePath);
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);  // ดึง URL ของไฟล์
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};

export default storage;
