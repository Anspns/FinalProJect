import React, { useState } from "react";

const History = () => {
  const [activeTab, setActiveTab] = useState("evaluationHistory"); // Default tab
  const [selectedFish, setSelectedFish] = useState(null);

  const evaluationData = [
    {
      id: 1,
      fishName: "Betta 1",
      image: "https://via.placeholder.com/100",
      status: "evaluated", // evaluated, pending, or incomplete
      expertCount: 3,
      age: 2,
      size: "5 cm",
      type: "Short-tail",
      tailType: "Fan tail",
      scores: { color: 8, shape: 9, movement: 7 },
    },
    {
      id: 2,
      fishName: "Betta 2",
      image: "https://via.placeholder.com/100",
      status: "pending",
      expertCount: 1,
      age: 1,
      size: "4.5 cm",
      type: "Long-tail",
      tailType: "Crown tail",
      scores: { color: null, shape: null, movement: null },
    },
    {
      id: 3,
      fishName: "Betta 3",
      image: "https://via.placeholder.com/100",
      status: "incomplete",
      expertCount: 2,
      age: 3,
      size: "6 cm",
      type: "Short-tail",
      tailType: "Moon tail",
      scores: { color: 7, shape: null, movement: null },
    },
  ];

  const competitionData = [
    {
      id: 1,
      fishName: "Betta A",
      image: "https://via.placeholder.com/100",
      status: "active", // active, pending, or notStarted
      rank: 1,
    },
    {
      id: 2,
      fishName: "Betta B",
      image: "https://via.placeholder.com/100",
      status: "pending",
      rank: null,
    },
    {
      id: 3,
      fishName: "Betta C",
      image: "https://via.placeholder.com/100",
      status: "notStarted",
      rank: null,
    },
  ];

  const getStatusDot = (status) => {
    switch (status) {
      case "evaluated":
      case "active":
        return <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>;
      case "pending":
        return <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>;
      case "incomplete":
      case "notStarted":
        return <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>;
      default:
        return null;
    }
  };

  const handleDetailsClick = (fish) => {
    setSelectedFish(fish);
  };

  const closeDetailsPopup = () => {
    setSelectedFish(null);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">ประวัติ</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "evaluationHistory" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("evaluationHistory")}
        >
          ประวัติการประเมินคะแนน
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "competitionHistory" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("competitionHistory")}
        >
          ประวัติการแข่งขัน
        </button>
      </div>

      {/* Content */}
      {activeTab === "evaluationHistory" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">ประวัติการประเมินคะแนน</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evaluationData.map((fish) => (
              <div
                key={fish.id}
                className="border p-4 rounded-lg shadow-md flex items-center space-x-4"
              >
                <img
                  src={fish.image}
                  alt={fish.fishName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{fish.fishName}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusDot(fish.status)}
                    <span>
                      {fish.status === "evaluated"
                        ? "ประเมินแล้ว"
                        : fish.status === "pending"
                        ? "รอการประเมิน"
                        : "กำลังรอการประเมิน"}
                    </span>
                  </div>
                </div>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleDetailsClick(fish)}
                >
                  ดูรายละเอียด
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "competitionHistory" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">ประวัติการแข่งขัน</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitionData.map((fish) => (
              <div
                key={fish.id}
                className="border p-4 rounded-lg shadow-md flex items-center space-x-4"
              >
                <img
                  src={fish.image}
                  alt={fish.fishName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{fish.fishName}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusDot(fish.status)}
                    <span>
                      {fish.status === "active"
                        ? "กำลังแข่งขัน"
                        : fish.status === "pending"
                        ? "รอประกาศผลคะแนน"
                        : "ยังไม่เริ่มการแข่งขัน"}
                    </span>
                  </div>
                </div>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleDetailsClick(fish)}
                >
                  ดูรายละเอียด
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details Popup */}
      {selectedFish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">รายละเอียดปลา</h2>
            <img
              src={selectedFish.image}
              alt={selectedFish.fishName}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{selectedFish.fishName}</h3>
            {activeTab === "evaluationHistory" && (
              <>
                <p className="mb-2">อายุ: {selectedFish.age} ปี</p>
                <p className="mb-2">ขนาด: {selectedFish.size}</p>
                <p className="mb-2">ประเภท: {selectedFish.type}</p>
                <p className="mb-2">ชนิดหาง: {selectedFish.tailType}</p>

                <h4 className="text-lg font-bold mt-4">คะแนนเฉลี่ย</h4>
                <ul className="list-disc pl-6">
                  <li>สี: {selectedFish.scores.color !== null ? selectedFish.scores.color : "ยังไม่มีคะแนน"}</li>
                  <li>รูปทรง: {selectedFish.scores.shape !== null ? selectedFish.scores.shape : "ยังไม่มีคะแนน"}</li>
                  <li>การเคลื่อนไหว: {selectedFish.scores.movement !== null ? selectedFish.scores.movement : "ยังไม่มีคะแนน"}</li>
                </ul>
              </>
            )}
            {activeTab === "competitionHistory" && (
              <>
                <p className="mb-2">
                  สถานะการแข่งขัน: {selectedFish.status === "active" ? "กำลังแข่งขัน" : selectedFish.status === "pending" ? "รอประกาศผลคะแนน" : "ยังไม่เริ่มการแข่งขัน"}
                </p>
                {selectedFish.rank && (
                  <p className="text-lg font-bold text-center">อันดับที่: {selectedFish.rank}</p>
                )}
              </>
            )}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
              onClick={closeDetailsPopup}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
