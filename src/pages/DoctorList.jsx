import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/admin/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Navbar />
      <h2 className="text-2xl font-bold mb-6 text-center">Our Doctors</h2>
          <div className="mt-15"></div>
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <a
            key={doc.id}
            href="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                       hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {doc.fullName}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {doc.specialization} — {doc.experience} yrs experience
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{doc.email}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
