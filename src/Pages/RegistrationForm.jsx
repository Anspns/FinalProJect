import React, { useState } from "react";
import { useParams, Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom

const RegistrationForm = () => {
  const { id } = useParams(); // ดึงค่า id จาก URL
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-100 font-sans text-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          ฟอร์มการสมัครเข้าร่วมการประกวด {id}
        </h2>
        {submitted ? (
          <div className="text-center text-green-500">
            <p>คุณได้ทำการสมัครเข้าร่วมการประกวดเรียบร้อยแล้ว!</p>
            {/* ใช้ Link เพื่อไปยังหน้าอื่นหลังจากส่งฟอร์ม */}
            <Link
              to="/success" // หน้า success หรือหน้าอื่นที่คุณต้องการ
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              ไปที่หน้าสำเร็จ
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600">ชื่อ</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-600">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-600">อีเมล</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="text-center">
              {/* ใช้ Link ในการส่งข้อมูล */}
              <Link
                to="/success" // เปลี่ยน URL ไปที่หน้าที่ต้องการเมื่อส่งฟอร์ม
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                ส่งข้อมูล
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
