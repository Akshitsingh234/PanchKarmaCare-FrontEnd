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
    .get(`http://localhost:8080/api/doctors/by-clerk/${user.id}`)
    .then((res) => {
      console.log("✅ Doctor object:", res.data);
      setDoctor(res.data);

      return axios.get(
        `http://localhost:8080/api/doctors/appointments/doctor/${res.data.id}`
      );
    })
    .then(async (res) => {
      console.log("📅 Appointments:", res.data);

      const apptsWithPatients = await Promise.all(
        res.data.map(async (appt) => {
          try {
            const patientRes = await axios.get(
              `http://localhost:8080/api/patients/${appt.patientId}`
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
    await axios.post(`http://localhost:8080/api/doctors/appointments/${appointmentId}/reject`);
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
    await axios.post(`http://localhost:8080/api/doctors/appointments/${appointmentId}/approve`);
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
  <div className="bg-gray-100 min-h-screen">
    <Navbar />

    {/* Added gap below Navbar */}
    <div className="max-w-5xl mx-auto py-10 px-6 mt-20">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Doctor Dashboard
      </h1>

      {/* Doctor Info Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-start">
        {/* Left side (doctor details) */}
        <div>
          <h2 className="text-xl font-semibold">
            Welcome Dr. {doctor ? doctor.fullName : "Loading..."} 👋
          </h2>
          <p className="text-muted-foreground text-lg mt-1">
            Welcome back to your medical dashboard
          </p>
          <p className="text-gray-600">
            Specialization: {doctor ? doctor.specialization : "Loading..."}
          </p>
          <p className="text-gray-600">
            Doctor ID: {doctor ? doctor.doctorId : "Loading..."}
          </p>
        </div>

        {/* Right side (button) */}
        <button
          type="button"
          onClick={() => navigate("/add-prescription")}
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 
                     hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 
                     focus:ring-4 focus:outline-none focus:ring-lime-200 
                     dark:focus:ring-teal-700 font-medium rounded-lg text-sm 
                     px-5 py-2.5 text-center"
        >
          Write Prescription
        </button>
      </div>

      {/* Appointment List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appt) => (
              <div
                key={appt.appointmentId}
                className="bg-gray-50 border rounded-lg shadow-sm p-4 hover:shadow-lg transition"
              >
                {/* Patient Info */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {appt.patient
                    ? `${appt.patient.fullName}`
                    : `Patient ID: ${appt.patientId}`}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {appt.patient ? appt.patient.email : ""}
                </p>

                {/* Appointment Details */}
                <p className="text-gray-700">
                  <span className="font-medium">Date:</span> {appt.date}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Time:</span> {appt.time}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      appt.status === "PENDING"
                        ? "bg-yellow-200 text-yellow-800"
                        : appt.status === "APPROVED"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                </p>

                {/* Extra Patient Info */}
                {appt.patient && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Age:</span>{" "}
                      {appt.patient.age} |{" "}
                      <span className="font-medium">Gender:</span>{" "}
                      {appt.patient.gender}
                    </p>
                    <p>
                      <span className="font-medium">Medical History:</span>{" "}
                      {appt.patient.medicalHistory || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Lifestyle:</span>{" "}
                      {appt.patient.lifestyleHabits || "N/A"}
                    </p>
                  </div>
                )}

                {/* ✅ Approve/Reject buttons */}
                {appt.status === "PENDING" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      onClick={() => handleApprove(appt.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
