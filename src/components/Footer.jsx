import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // ใช้ Link แทนการใช้ anchor tag

// ข้อมูลโปสเตอร์
const posters = [
  { id: 1, image: "https://via.placeholder.com/800x400", title: "โปสเตอร์ 1" },
  { id: 2, image: "https://via.placeholder.com/800x400", title: "โปสเตอร์ 2" },
  { id: 3, image: "https://via.placeholder.com/800x400", title: "โปสเตอร์ 3" },
  { id: 4, image: "https://via.placeholder.com/800x400", title: "โปสเตอร์ 4" },
  { id: 5, image: "https://via.placeholder.com/800x400", title: "โปสเตอร์ 5" },
  { id: 6, image: "https://via.placeholder.com/800x400", title: "โปสเตอร์ 6" },
  { id: 7, image: "https://via.placeholder.com/800x400", title: "โปสเตอร์ 7" },
  { id: 8, image: "https://via.placeholder.com/800x400", title: "โปสเตอร์ 8" },
];

// ข้อมูลข่าวสารแนะนำ
const newsItems = [
  { id: 1, image: "https://via.placeholder.com/150x75", title: "ข่าวสาร 1", description: "คำอธิบายของข่าวสาร 1", date: "2024-12-01" },
  { id: 2, image: "https://via.placeholder.com/150x75", title: "ข่าวสาร 2", description: "คำอธิบายของข่าวสาร 2", date: "2024-12-02" },
  { id: 3, image: "https://via.placeholder.com/150x75", title: "ข่าวสาร 3", description: "คำอธิบายของข่าวสาร 3", date: "2024-12-03" },
  { id: 4, image: "https://via.placeholder.com/150x75", title: "ข่าวสาร 4", description: "คำอธิบายของข่าวสาร 4", date: "2024-12-04" },
  { id: 5, image: "https://via.placeholder.com/150x75", title: "ข่าวสาร 5", description: "คำอธิบายของข่าวสาร 5", date: "2024-12-05" },
  { id: 6, image: "https://via.placeholder.com/150x75", title: "ข่าวสาร 6", description: "คำอธิบายของข่าวสาร 6", date: "2024-12-06" },
  { id: 7, image: "https://via.placeholder.com/150x75", title: "ข่าวสาร 7", description: "คำอธิบายของข่าวสาร 7", date: "2024-12-07" },
  { id: 8, image: "https://via.placeholder.com/150x75", title: "ข่าวสาร 8", description: "คำอธิบายของข่าวสาร 8", date: "2024-12-08" },
];

const Footer = () => {
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  // สไลด์อัตโนมัติ
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setCurrentPosterIndex((prev) => (prev + 1) % posters.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextPoster = () => {
    setDirection("next");
    setCurrentPosterIndex((prev) => (prev + 1) % posters.length);
  };

  const prevPoster = () => {
    setDirection("prev");
    setCurrentPosterIndex(
      (prev) => (prev - 1 + posters.length) % posters.length
    );
  };

  return (
    <footer className="bg-gray-50 py-20 md:py-20">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-center">
          {/* ปุ่มเลื่อนซ้าย */}
          <button
            onClick={prevPoster}
            className="absolute left-0 z-20 bg-white/80 hover:bg-white shadow-md p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <ChevronLeft className="text-gray-700" />
          </button>

          {/* คอนเทนเนอร์โปสเตอร์ */}
          <div className="w-full max-w-screen-xl relative overflow-hidden rounded-xl shadow-lg">
            <div
              className="flex transition-all duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentPosterIndex * 100}%)`,
              }}
            >
              {posters.map((poster) => (
                <div
                  key={poster.id}
                  className="w-full flex-shrink-0 transition-all duration-700 ease-in-out"
                >
                  <Link to={`/project/${poster.id}`}>
                    <img
                      src={poster.image}
                      alt={`โปสเตอร์ ${poster.id}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ปุ่มเลื่อนขวา */}
          <button
            onClick={nextPoster}
            className="absolute right-0 z-20 bg-white/80 hover:bg-white shadow-md p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <ChevronRight className="text-gray-700" />
          </button>
        </div>

        {/* จุดไข่ปลา */}
        <div className="flex justify-center mt-6">
          {posters.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentPosterIndex ? "next" : "prev");
                setCurrentPosterIndex(index);
              }}
              className={`w-3 h-3 mx-1.5 rounded-full transition-all duration-300 
                ${index === currentPosterIndex ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>

        {/* ข่าวสารแนะนำ */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">ข่าวสารแนะนำ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsItems.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Link to={`/project/${news.id}`}>
                  <img
                    src={news.image}
                    alt={`ข่าวสาร ${news.id}`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{news.title}</h3>
                    <p className="text-gray-600 mt-2">{news.description}</p>
                    <p className="text-gray-400 text-sm mt-2">{news.date}</p>
                    <button className="mt-4 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-300">
                      อ่านเพิ่มเติม
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
