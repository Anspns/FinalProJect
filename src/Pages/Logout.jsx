// Logout.jsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // สมมติว่าใช้ Firebase

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    // ฟังก์ชันการออกจากระบบ
    const logoutUser = async () => {
      try {
        await auth.signOut(); // ฟังก์ชัน Firebase เพื่อออกจากระบบ
        console.log('ออกจากระบบแล้ว');
        history.push('/login'); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
      } catch (error) {
        console.error('เกิดข้อผิดพลาดขณะออกจากระบบ: ', error);
      }
    };

    logoutUser(); // เรียกใช้ฟังก์ชันออกจากระบบเมื่อโหลดหน้า
  }, [history]);

  return (
    <div>
      <h2>กำลังออกจากระบบ...</h2>
    </div>
  );
};

export default Logout;
