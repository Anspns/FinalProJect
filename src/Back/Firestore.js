// Back/Firestore.js
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import app from './firebaseConfig';  // นำเข้า Firebase App ที่ตั้งค่าแล้ว

// Initializing Firestore
const db = getFirestore(app);

// ฟังก์ชันการดึงข้อมูลจาก Firestore
export const getCollectionData = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

// ฟังก์ชันการเพิ่มข้อมูลลงใน Firestore (ระบุ UID เอง)
export const addDataToFirestore = async (collectionName, data) => {
  try {
    const docRef = await setDoc(doc(db, collectionName, data.uid), data);  // ใช้ UID เป็นไอดี
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// ฟังก์ชันการเพิ่มข้อมูลแบบ Auto ID
export const addDocumentWithAutoID = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);  // ใช้ addDoc สร้างไอดีอัตโนมัติ
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// ฟังก์ชันอัปเดตข้อมูลใน Firestore
export const updateFirestoreDocument = async (collectionName, uid, data) => {
  try {
    const docRef = doc(db, collectionName, uid);
    await updateDoc(docRef, data);
    return uid;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// ฟังก์ชันการค้นหาข้อมูลด้วยเงื่อนไข
export const getDataByCondition = async (collectionName, field, operator, value) => {
  const q = query(collection(db, collectionName), where(field, operator, value));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });  // รวม id เข้าไปใน object ด้วย
  });
  return data;
};

// ฟังก์ชันลบข้อมูลใน Firestore
export const deleteFirestoreDocument = async (collectionName, uid) => {
  try {
    await deleteDoc(doc(db, collectionName, uid));
    return uid;
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

export default db;
