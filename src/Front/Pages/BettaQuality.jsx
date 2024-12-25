import React, { useState } from "react";

const BettaQuality = () => {
  const [fishName, setFishName] = useState("");
  const [fishAge, setFishAge] = useState("");
  const [fishSize, setFishSize] = useState("");
  const [fishType, setFishType] = useState("");
  const [finType, setFinType] = useState("");
  const [tailType, setTailType] = useState("");
  const [subTailType, setSubTailType] = useState("");

  const handleFishTypeChange = (e) => {
    setFishType(e.target.value);
    setFinType("");
    setTailType("");
    setSubTailType(""); // Reset all dependent fields when fish type changes
  };

  const handleFinTypeChange = (e) => {
    setFinType(e.target.value);
    setTailType("");
    setSubTailType(""); // Reset tail and sub-tail types when fin type changes
  };

  const handleTailTypeChange = (e) => {
    setTailType(e.target.value);
    setSubTailType(""); // Reset sub-tail type when tail type changes
  };

  const tailOptions = {
    "ครีบสั้น": {
      "หางเดี่ยว": ["หางพัด", "หางโพธิ์", "หางมงกุฎ", "หางพระจันทร์ครึ่งดวง"],
      "หางคู่": ["หางพัด", "หางโพธิ์", "หางมงกุฎ", "หางพระจันทร์ครึ่งดวง"],
    },
    "ครีบยาว": {
      "หางเดี่ยว": ["หางพู่กัน", "หางมงกุฎ", "หางพระอาทิตย์ครึ่งดวง", "หางพระจันทร์ครึ่งดวง"],
      "หางคู่": ["หางพู่กัน", "หางมงกุฎ", "หางพระอาทิตย์ครึ่งดวง", "หางพระจันทร์ครึ่งดวง"],
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    alert("ข้อมูลถูกส่งแล้ว!");
  };

  return (
    <div className="container mx-auto py-20 px-4 bg-blue-50">
      <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">ประเมินคุณภาพปลากัด</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* อัปโหลดรูปภาพ */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">อัปโหลดรูปภาพ (3 รูป)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        {/* อัปโหลดวิดีโอ */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">อัปโหลดวิดีโอ (1 วิดีโอ)</label>
          <input
            type="file"
            accept="video/*"
            className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        {/* ข้อมูลปลากัด */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">ชื่อปลากัด</label>
          <input
            type="text"
            value={fishName}
            onChange={(e) => setFishName(e.target.value)}
            className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">อายุปลากัด (เดือน)</label>
          <input
            type="number"
            value={fishAge}
            onChange={(e) => setFishAge(e.target.value)}
            className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">ขนาดปลากัด (ซม.)</label>
          <input
            type="number"
            value={fishSize}
            onChange={(e) => setFishSize(e.target.value)}
            className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
            required
          />
          <small className="text-gray-500">จากปากถึงโคนหาง</small>
        </div>

        {/* ประเภทปลากัด */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">ประเภทปลากัด</label>
          <select
            value={fishType}
            onChange={handleFishTypeChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
            required
          >
            <option value="">-- เลือกประเภทปลากัด --</option>
            <option value="ปลากัดหางสั้น">ปลากัดหางสั้น</option>
            <option value="ปลากัดหางยาว">ปลากัดหางยาว</option>
            <option value="ปลากัดยักษ์">ปลากัดยักษ์</option>
          </select>
        </div>

        {/* ครีบ */}
        {fishType && fishType !== "ปลากัดยักษ์" && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">ครีบ</label>
            <select
              value={finType}
              onChange={handleFinTypeChange}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
              required
            >
              <option value="">-- เลือกครีบ --</option>
              <option value="ครีบสั้น">ครีบสั้น</option>
              <option value="ครีบยาว">ครีบยาว</option>
            </select>
          </div>
        )}

        {/* ประเภทหาง */}
        {finType && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">ประเภทหาง</label>
            <select
              value={tailType}
              onChange={handleTailTypeChange}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
              required
            >
              <option value="">-- เลือกประเภทหาง --</option>
              {Object.keys(tailOptions[finType]).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ชนิดหาง */}
        {tailType && tailOptions[finType][tailType] && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">ชนิดหาง</label>
            <select
              value={subTailType}
              onChange={(e) => setSubTailType(e.target.value)}
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
              required
            >
              <option value="">-- เลือกชนิดหาง --</option>
              {tailOptions[finType][tailType].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          ส่งข้อมูล
        </button>
      </form>
    </div>
  );
};

export default BettaQuality;
