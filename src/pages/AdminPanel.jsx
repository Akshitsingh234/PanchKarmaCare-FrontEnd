import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar"; 

export default function AdminPage() {
  const [doctors, setDoctors] = useState([]);
   const [patients, setPatients] = useState([]); 
  const [newDoctor, setNewDoctor] = useState({
    fullName: "",
    email: "",
    experience: "",
    specialization: ""
  });

  // Fetch doctors on load
  useEffect(() => {
    fetchDoctors();
      fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors", err);
    }
  };


   const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/patients");
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients", err);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // convert experience to number, keep other fields as is
    setNewDoctor({
      ...newDoctor,
      [name]: name === "experience" ? Number(value) : value,
    });
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    console.log("Sending doctor payload:", newDoctor); 
    try {
      await axios.post("http://localhost:8080/api/doctors/register", newDoctor);
      setNewDoctor({ fullName: "", email: "", experience: "", specialization: "" });
      fetchDoctors();
    } catch (err) {
      console.error("Error adding doctor", err.response?.data || err);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/doctors/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting doctor", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 py-6">
      <div className="max-w-4xl mx-auto p-6">
        <Navbar />
        <div className="mt-15"></div>
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel - Manage Doctors</h2>
        <div className="mt-15"></div>
        {/* Add Doctor Form */}
        <div className="transition-transform duration-200 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl shadow-lg mb-8 p-1">
          <form
            onSubmit={addDoctor}
            className="bg-white/90 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="md:col-span-2 flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <h3 className="text-xl font-bold text-green-700">Add New Doctor</h3>
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={newDoctor.fullName}
              onChange={handleChange}
              className="border border-green-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newDoctor.email}
              onChange={handleChange}
              className="border border-green-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
              required
            />
            <input
              type="number"
              name="experience"
              placeholder="Experience (years)"
              value={newDoctor.experience}
              onChange={handleChange}
              className="border border-green-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
              required
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={newDoctor.specialization}
              onChange={handleChange}
              className="border border-green-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
              required
            />
            <button
              type="submit"
              className="md:col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 mt-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Doctor
            </button>
          </form>
        </div>

        {/* Doctor List */}
        <h3 className="text-xl font-semibold mb-4">Doctors List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-gradient-to-br from-green-200 via-blue-100 to-blue-200 rounded-2xl shadow-md p-6 flex flex-col justify-between transition-transform duration-200 hover:shadow-xl hover:-translate-y-1 border border-green-200"
            >
              <div>
                <h4 className="text-lg font-bold text-green-800 mb-1">{doc.fullName}</h4>
                <p className="text-blue-700 mb-1">{doc.specialization}</p>
                <p className="text-blue-500 text-sm mb-2">{doc.experience} yrs experience</p>
                <p className="text-gray-700 text-xs break-all mb-4">{doc.email}</p>
              </div>
              <button
                onClick={() => deleteDoctor(doc.id)}
                className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

         {/* Patient List */}
        <h3 className="text-xl font-semibold mb-4">Patients List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {patients.map((pat) => (
            <div
              key={pat.id}
              className="bg-gradient-to-br from-yellow-100 via-green-100 to-green-200 rounded-2xl shadow-md p-6 flex flex-col justify-between transition-transform duration-200 hover:shadow-xl hover:-translate-y-1 border border-green-200"
            >
              <h4 className="text-lg font-bold text-green-800 mb-1">{pat.fullName}</h4>
              <p className="text-gray-700 text-xs break-all mb-2">{pat.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
