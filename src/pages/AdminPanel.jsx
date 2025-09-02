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
    <div className="p-6 max-w-4xl mx-auto">
      <Navbar />
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel - Manage Doctors</h2>

      {/* Add Doctor Form */}
      <form
        onSubmit={addDoctor}
        className="bg-white shadow-md rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={newDoctor.fullName}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newDoctor.email}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full"
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={newDoctor.experience}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full"
          required
        />
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </form>

      {/* Doctor List */}
      <h3 className="text-xl font-semibold mb-4">Doctors List</h3>
      <ul className="space-y-3">
        {doctors.map((doc) => (
          <li
            key={doc.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
          >
            <span>
              <strong>{doc.fullName}</strong> ({doc.specialization}) - {doc.experience} yrs
            </span>
            <button
              onClick={() => deleteDoctor(doc.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

       {/* Patient List */}
      <h3 className="text-xl font-semibold mb-4">Patients List</h3>
      <ul className="space-y-3">
        {patients.map((pat) => (
          <li
            key={pat.id}
            className="bg-green-100 p-3 rounded-lg shadow-sm"
          >
            <strong>{pat.fullName}</strong> - {pat.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
