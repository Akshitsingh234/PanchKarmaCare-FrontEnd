import React, { useEffect, useState } from "react";
import { FiFileText, FiDownload, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

const ViewPrescriptions = () => {
  const { user } = useUser(); // Clerk user
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  // 1️⃣ Fetch patient by Clerk ID
  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:8080/api/patients/${user.id}`)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => console.error("Error fetching patient:", err));
  }, [user]);

  // 2️⃣ Fetch prescriptions for this patient
  useEffect(() => {
    if (!patient) return;

    axios
      .get(`http://localhost:8080/api/prescriptions/patient/${patient.id}`)
      .then((res) => setPrescriptions(res.data))
      .catch((err) => console.error("Error fetching prescriptions:", err));
  }, [patient]);

  return (
    <div className="min-h-screen bg-[#E6E6FA] flex flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Right content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">View Prescriptions</h1>
          <span>{patient?.name}</span>
        </header>

        {/* Main */}
        <main className="flex-1 p-8">
          <Link
            to="/user-dashboard"
            className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
          >
            <FiArrowLeft size={20} className="mr-2" /> Back
          </Link>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Your Prescriptions
            </h2>
            {prescriptions.length === 0 ? (
              <p className="text-gray-500">No prescriptions found.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-3 text-blue-600">Date</th>
                    <th className="p-3 text-blue-600">Doctor ID</th>
                    <th className="p-3 text-blue-600">Details</th>
                    <th className="p-3 text-blue-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                   <td className="p-3">
                       {new Date(p.createdAt).toLocaleDateString("en-GB", {
                         day: "2-digit",
                         month: "2-digit",
                         year: "numeric",
                       })}
                     </td>
                     <td className="p-3">{p.doctorName}</td>

                      <td className="p-3 flex items-center">
                        <FiFileText className="mr-2 text-blue-600" />{" "}
                        {p.details}
                      </td>
                      <td className="p-3">
                        <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          <FiDownload className="mr-2" /> Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewPrescriptions;
