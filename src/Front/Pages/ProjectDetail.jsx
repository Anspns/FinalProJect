import React from "react";
import { useParams, Link } from "react-router-dom"; // นำเข้า Link

// ข้อมูลรายละเอียดโครงการ (สามารถใช้ API หรือ JSON ตามต้องการ)
const projects = [
  { id: 1, title: "โครงการ 1", description: "รายละเอียดของโครงการ 1", image: "https://via.placeholder.com/800x400" },
  { id: 2, title: "โครงการ 2", description: "รายละเอียดของโครงการ 2", image: "https://via.placeholder.com/800x400" },
  { id: 3, title: "โครงการ 3", description: "รายละเอียดของโครงการ 3", image: "https://via.placeholder.com/800x400" },
  { id: 4, title: "โครงการ 4", description: "รายละเอียดของโครงการ 4", image: "https://via.placeholder.com/800x400" },
  { id: 5, title: "โครงการ 5", description: "รายละเอียดของโครงการ 5", image: "https://via.placeholder.com/800x400" },
  { id: 6, title: "โครงการ 6", description: "รายละเอียดของโครงการ 6", image: "https://via.placeholder.com/800x400" },
  { id: 7, title: "โครงการ 7", description: "รายละเอียดของโครงการ 7", image: "https://via.placeholder.com/800x400" },
  { id: 8, title: "โครงการ 8", description: "รายละเอียดของโครงการ 8", image: "https://via.placeholder.com/800x400" },
];

const ProjectDetail = () => {
  const { id } = useParams(); // ดึง id จาก URL
  const project = projects.find((p) => p.id === parseInt(id));

  return (
    <div className="container mx-auto py-20 pt-20">
      {/* เพิ่ม `pt-20` เพื่อเว้นระยะห่างจาก Navbar */}
      <div className="max-w-2xl mx-auto">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-semibold text-gray-800">
          {project.title}
        </h1>
        <p className="text-gray-600 mt-4">{project.description}</p>
        
        {/* เพิ่มระยะห่างระหว่างข้อความและปุ่ม */}
        <div className="mt-6">
          <Link
            to={`/register/${project.id}`} // เปลี่ยนไปยังหน้าที่ต้องการ
            className="bg-blue-500 text-white rounded-lg py-2 px-6 hover:bg-blue-600 transition-colors duration-300"
          >
            สมัครเข้าร่วมการประกวด
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
