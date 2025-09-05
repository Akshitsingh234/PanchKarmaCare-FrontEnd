import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { FiCalendar, FiFileText, FiClock, FiTablet, FiPlus, FiX, FiTrash2 } from "react-icons/fi";



export default function UserDashboard() {
 
  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSchedule, setNewSchedule] = useState("");

  // Fetch appointments
  useEffect(() => {
    if (!user) return;
      console.log("Clerk user.id:", user.id);  
    axios
      .get(`${import.meta.env.VITE_API_URL}/appointments/clerk/${user.id}`)
      .then((res) => setAppointments(res.data || []))
      .catch((err) => console.error(err));
  }, [user]);

  // Fetch reminders
  useEffect(() => {
    if (!user) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/reminders/patient/${user.id}`  )
     
      .then((res) => setReminders(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  // Add a new reminder
  const handleAddReminder = () => {
    if (!newTitle || !newSchedule) return;

    axios
      .post(`${import.meta.env.VITE_API_URL}/reminders/patient`, {
        patientId: user.id,
        title: newTitle,
        schedule: newSchedule,
      })
      .then((res) => setReminders([...reminders, res.data]))
      .catch((err) => console.error(err));

    setNewTitle("");
    setNewSchedule("");
    setIsModalOpen(false);
  };

  // Remove a reminder
  const handleRemoveReminder = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/reminders/patient/${user.id}/${id}`)
      .then(() => setReminders(reminders.filter((r) => r.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-200">
      <Navbar />
      <div className="flex">
        <div className="mt-15"></div>
        <div className="flex pt-20">
          <Sidebar className="mt-20" />
          {/* Main Content */}
          <main className="flex-1 p-8 pt-24 space-y-10">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
              <div className="bg-gradient-to-br from-green-200 via-blue-100 to-green-100 p-8 rounded-2xl shadow-xl border border-green-100">
                <h3 className="flex items-center text-sm text-green-700 font-semibold">
                  <FiCalendar className="mr-2 text-xl text-blue-600" /> Upcoming Appointments
                </h3>
                <p className="text-3xl font-bold mt-4 text-green-900">{appointments.length}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 via-green-100 to-green-200 p-8 rounded-2xl shadow-xl border border-green-100">
                <h3 className="flex items-center text-sm text-yellow-700 font-semibold">
                  <FiFileText className="mr-2 text-xl text-yellow-500" /> Pending Reports
                </h3>
                <p className="text-3xl font-bold mt-4 text-yellow-900">0</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 via-blue-100 to-green-200 p-8 rounded-2xl shadow-xl border border-green-100">
                <h3 className="flex items-center text-sm text-green-700 font-semibold">
                  <FiClock className="mr-2 text-xl text-green-600" /> Total Visits
                </h3>
                <p className="text-3xl font-bold mt-4 text-green-900">{appointments.length}</p>
              </div>
              <div className="bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 p-8 rounded-2xl shadow-xl border border-green-100">
                <h3 className="flex items-center text-sm text-red-700 font-semibold">
                  <FiTablet className="mr-2 text-xl text-red-500" /> Medicines Due
                </h3>
                <p className="text-3xl font-bold mt-4 text-red-900">0</p>
              </div>
            </div>
            {/* Recent Appointments Table */}
            <div className="bg-white/90 p-8 rounded-2xl shadow-xl mb-10 border border-green-100">
              <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
                <FiCalendar className="mr-2" /> Recent Appointments
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4">Date</th>
                      <th className="p-4">Doctor</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Time</th>
                      <th className="p-4">Reason</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map((item, i) => (
                        <tr key={i} className="hover:bg-green-50">
                          <td className="p-4">{item.date || "-"}</td>
                          <td className="p-4">{item.doctor?.fullName || item.doctor?.name || "-"}</td>
                          <td className="p-4">{typeof item.service === "object" ? item.service?.name || "-" : item.service || "-"}</td>
                          <td className="p-4">{item.time || "-"}</td>
                          <td className="p-4">{item.reason || "-"}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.status?.toLowerCase() === "completed" ? "bg-green-100 text-green-700" : item.status?.toLowerCase() === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>{item.status || "-"}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-4 text-gray-500" colSpan="6">No recent appointments</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Medical Reminders */}
            <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-green-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                  <FiTablet className="mr-2" /> Medical Reminders
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 shadow-md transition-all gap-2"
                >
                  <FiPlus className="mr-2" /> Add Reminder
                </button>
              </div>
              {/* Reminder List */}
              <ul className="space-y-4">
                {reminders.map((reminder) => (
                  <li
                    key={reminder.id}
                    className="flex justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow border border-green-100"
                  >
                    <div>
                      <p className="font-semibold text-green-800">{reminder.title}</p>
                      <p className="text-sm text-green-600">{reminder.schedule}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveReminder(reminder.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                  <h3 className="text-lg font-semibold mb-4">Add New Reminder</h3>
                  <input
                    type="text"
                    placeholder="Reminder title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Schedule (e.g., Daily at 8 AM)"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4"
                  />
                  <button
                    onClick={handleAddReminder}
                    className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 shadow-md transition-all"
                  >
                    Add Reminder
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
