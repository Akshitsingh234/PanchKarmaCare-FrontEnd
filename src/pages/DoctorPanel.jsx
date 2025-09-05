import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";


export default function DoctorPanel() {
   const navigate =  useNavigate();  
  const { user } = useUser();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

 useEffect(() => {
  if (!user) return;

  console.log("🔑 Clerk ID:", user.id);

  axios
    .get(`${import.meta.env.VITE_API_URL}/api/doctors/by-clerk/${user.id}`)
    .then((res) => {
      console.log("✅ Doctor object:", res.data);
      setDoctor(res.data);

      return axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctors/appointments/doctor/${res.data.id}`
      );
    })
    .then(async (res) => {
      console.log("📅 Appointments:", res.data);

      const apptsWithPatients = await Promise.all(
        res.data.map(async (appt) => {
          try {
            const patientRes = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/patients/${appt.patientId}`
            );
            return { ...appt, patient: patientRes.data };
          } catch (err) {
            console.error("❌ Error fetching patient:", err);
            return { ...appt, patient: null };
          }
        })
      );

      // 🔥 Sort so PENDING comes first
      const sortedAppts = apptsWithPatients.sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (a.status !== "PENDING" && b.status === "PENDING") return 1;
        return 0;
      });

      setAppointments(sortedAppts);
    })
    .catch((err) =>
      console.error("❌ Error fetching doctor/appointments:", err)
    );
}, [user]);


  //  reject 
  const handleReject = async (appointmentId) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/doctors/appointments/${appointmentId}/reject`);
    // refresh appointments after rejection
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.appointmentId === appointmentId ? { ...appt, status: "REJECTED" } : appt
      )
    );
  } catch (err) {
    console.error("❌ Error rejecting appointment:", err);
  }
};

const handleApprove = async (appointmentId) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/doctors/appointments/${appointmentId}/approve`);
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.appointmentId === appointmentId ? { ...appt, status: "APPROVED" } : appt
      )
    );
  } catch (error) {
    console.error("❌ Failed to approve appointment:", error);
  }
};
 return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-200">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-6 mt-20">
        <h1 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-3">
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-8 h-8 text-green-400'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' /></svg>
          Doctor Dashboard
        </h1>
        {/* Doctor Info Card */}
        <div className="bg-gradient-to-r from-green-200 via-blue-100 to-green-100 shadow-xl rounded-2xl p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border border-green-200">
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-1 flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 text-green-400'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' /></svg>
              Welcome Dr. {doctor ? doctor.fullName : "Loading..."} <span className="text-2xl">👨‍⚕️</span>
            </h2>
            <p className="text-green-700 text-lg mt-1 mb-2">Welcome back to your medical dashboard</p>
            <div className="flex flex-wrap gap-4 text-green-900 text-sm">
              <span className="bg-white/70 px-3 py-1 rounded-lg shadow border border-green-100">Specialization: {doctor ? doctor.specialization : "Loading..."}</span>
              <span className="bg-white/70 px-3 py-1 rounded-lg shadow border border-green-100">Doctor ID: {doctor ? doctor.doctorId : "Loading..."}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/add-prescription")}
            className="mt-6 md:mt-0 text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 font-semibold rounded-xl text-base px-6 py-3 shadow-lg transition-all flex items-center gap-2"
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' /></svg>
            Write Prescription
          </button>
        </div>
        {/* Appointment List */}
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 text-green-400'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' /></svg>
            Appointments
          </h2>
          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((appt) => (
                <div
                  key={appt.appointmentId}
                  className="bg-gradient-to-br from-green-50 via-blue-50 to-green-100 border border-green-100 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-200"
                >
                  {/* Patient Info */}
                  <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5 text-green-400'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' /></svg>
                    {appt.patient ? `${appt.patient.fullName}` : `Patient ID: ${appt.patientId}`}
                  </h3>
                  <p className="text-sm text-green-700 mb-1">{appt.patient ? appt.patient.email : ""}</p>
                  {/* Appointment Details */}
                  <div className="flex flex-wrap gap-2 text-green-900 text-xs mb-2">
                    <span className="bg-white/70 px-2 py-1 rounded border border-green-100">Date: {appt.date}</span>
                    <span className="bg-white/70 px-2 py-1 rounded border border-green-100">Time: {appt.time}</span>
                    <span className="bg-white/70 px-2 py-1 rounded border border-green-100">Status: <span className={`font-semibold ${appt.status === "PENDING" ? "text-yellow-600" : appt.status === "APPROVED" ? "text-green-700" : "text-red-700"}`}>{appt.status}</span></span>
                  </div>
                  {/* Extra Patient Info */}
                  {appt.patient && (
                    <div className="mt-2 text-xs text-green-800 space-y-1">
                      <p><span className="font-medium">Age:</span> {appt.patient.age} | <span className="font-medium">Gender:</span> {appt.patient.gender}</p>
                      <p><span className="font-medium">Medical History:</span> {appt.patient.medicalHistory || "N/A"}</p>
                      <p><span className="font-medium">Lifestyle:</span> {appt.patient.lifestyleHabits || "N/A"}</p>
                    </div>
                  )}
                  {/* Approve/Reject buttons */}
                  {appt.status === "PENDING" && (
                    <div className="mt-4 flex gap-2">
                      <button
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 shadow-md transition-all"
                        onClick={() => handleApprove(appt.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg hover:from-red-500 hover:to-red-700 shadow-md transition-all"
                        onClick={() => handleReject(appt.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );

}
