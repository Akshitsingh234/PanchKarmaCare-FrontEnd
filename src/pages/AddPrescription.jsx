import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function AddPrescription() {
  const { user } = useUser();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [text, setText] = useState("");

  // 🔹 Fetch doctor by Clerk ID
  useEffect(() => {
    if (!user) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/doctors/by-clerk/${user.id}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.error("❌ Error fetching doctor:", err));
  }, [user]);

  // 🔹 Fetch patients list
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/patients`)
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("❌ Error fetching patients:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctor || !selectedPatient || !text) {
      alert("Please select patient and write prescription!");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/prescriptions/add`, {
        doctorId: doctor.id,
        patientId: Number(selectedPatient),
        prescriptionText: text,
      });
      alert("✅ Prescription saved successfully!");
      setText("");
      setSelectedPatient("");
    } catch (err) {
      console.error("❌ Error saving prescription:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              📝 Prescription Page
            </h2>
            {doctor && (
              <p className="text-gray-600 mt-1">
                Dr. {doctor.fullName} {doctor.specialization && ` - ${doctor.specialization}`}
              </p>
            )}
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
            Doctor ID: {doctor?.id || "Loading..."}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Select */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Patient
            </label>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="">-- Choose Patient --</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.fullName})
                </option>
              ))}
            </select>
          </div>

          {/* Prescription Area */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Prescription Details
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 border rounded-lg shadow-sm h-40 focus:ring focus:ring-blue-200"
              placeholder="Write symptoms, diagnosis, and medicines here..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setSelectedPatient("");
                setText("");
              }}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md"
            >
              Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
