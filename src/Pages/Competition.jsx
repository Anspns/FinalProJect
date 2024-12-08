import React from 'react';
import { Link } from 'react-router-dom';

// ข้อมูลโครงการ
const projects = [
  { id: 1, image: "https://via.placeholder.com/800x400", title: "ประกวดปลากัด 2024", description: "รายละเอียดการประกวดปลากัด", date: "1 มกราคม 2024" },
  { id: 2, image: "https://via.placeholder.com/800x400", title: "ประกวดปลากัด 2023", description: "รายละเอียดการประกวดปลากัด", date: "1 กุมภาพันธ์ 2024" },
  { id: 3, image: "https://via.placeholder.com/800x400", title: "ประกวดปลากัด 2022", description: "รายละเอียดการประกวดปลากัด", date: "1 มีนาคม 2024" },
  { id: 4, image: "https://via.placeholder.com/800x400", title: "ประกวดปลากัด 2021", description: "รายละเอียดการประกวดปลากัด", date: "1 เมษายน 2024" },
  { id: 5, image: "https://via.placeholder.com/800x400", title: "ประกวดปลากัด 2020", description: "รายละเอียดการประกวดปลากัด", date: "1 พฤษภาคม 2024" },
  { id: 6, image: "https://via.placeholder.com/800x400", title: "ประกวดปลากัด 2019", description: "รายละเอียดการประกวดปลากัด", date: "1 มิถุนายน 2024" },
  { id: 7, image: "https://via.placeholder.com/800x400", title: "ประกวดปลากัด 2018", description: "รายละเอียดการประกวดปลากัด", date: "1 กรกฎาคม 2024" },
  { id: 8, image: "https://via.placeholder.com/800x400", title: "ประกวดปลากัด 2017", description: "รายละเอียดการประกวดปลากัด", date: "1 สิงหาคม 2024" },
];

const Competition = () => {
  return (
    <div className="bg-gray-100 font-sans text-gray-800 min-h-screen pt-12">
      {/* Header Section */}
      <div className="max-w-full mx-auto px-10 py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">การประกวดปลากัด</h1>
        <p className="text-lg text-gray-600">
          ร่วมเป็นส่วนหนึ่งของการประกวดปลากัดสุดยิ่งใหญ่ พร้อมโอกาสชนะรางวัลมากมาย!
        </p>
      </div>

      {/* Projects Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 mx-auto max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/project/${project.id}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                  <p className="text-gray-400 text-sm mt-1">{project.date}</p>
                  <Link to={`/register/${project.id}`}>
                    <button className="mt-3 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-300">
                      สมัครเข้าร่วมการประกวด
                    </button>
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Competition;
