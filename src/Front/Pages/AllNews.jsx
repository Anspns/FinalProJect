import React from "react";
import { Link } from "react-router-dom";

// ข้อมูลข่าวสารทั้งหมด (เหมือนกับข้อมูลใน Footer.js)
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

const AllNews = () => {
  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">ข่าวสารทั้งหมด</h2>
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
  );
};

export default AllNews;
