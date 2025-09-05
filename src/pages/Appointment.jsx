import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";


export default function Appointment() {
  const { user } = useUser();
  const [doctors, setDoctors] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    specialization: "",
    doctor: "",
    mode: "",
    reason: "",
    medicalHistory: "",
    medications: "",
    allergies: "",
    insuranceProvider: "",
    policyNumber: "",
    insuranceCard: null,
    reports: null,
    prescription: null,
    paymentMode: "",
    paymentReceipt: null,
    consent: false,
    additionalNotes: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);


useEffect(() => {
  axios
    .get("http://localhost:8080/api/doctors") // backend endpoint returning all doctors
    .then((res) => setDoctors(res.data || []))
    .catch((err) => console.error(err));
}, []);
  const steps = [
    "Personal Info",
    "Appointment",
    "Medical History",
    "Insurance",
    "Documents",
    "Payment",
    "Confirm",
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

const handleSubmit = async () => {
  try {
    const appointmentData = {
      patientId: user?.id,
      patientName: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.appointmentDate,
      time: formData.appointmentTime,
      service: formData.specialization, 
      doctor: { id: Number(formData.doctorId) },     // ✅ send doctor
      reason: formData.reason,        // ✅ send reason
      mode: formData.mode,            // optional if backend supports
    };

    await axios.post("http://localhost:8080/appointments", appointmentData, {
      headers: { "Content-Type": "application/json" },
    });

    alert("✅ Appointment booked successfully!");
    setStep(1);

    // Reset form
    setFormData({
      name: user?.fullName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      phone: "",
      appointmentDate: "",
      appointmentTime: "",
      specialization: "",
      doctor: "",
      mode: "",
      reason: "",
      medicalHistory: "",
      medications: "",
      allergies: "",
      insuranceProvider: "",
      policyNumber: "",
      insuranceCard: null,
      reports: null,
      prescription: null,
      paymentMode: "",
      paymentReceipt: null,
      consent: false,
      additionalNotes: "",
    });
  } catch (error) {
    console.error(error);
    alert("❌ Error booking appointment");
  }
};

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
          </div>
        );

      case 2:
        return (
          <div className="bg-gradient-to-br from-green-100 via-blue-50 to-green-200 rounded-2xl shadow-xl p-8 space-y-8 border border-green-200 animate-fade-in">
            <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-7 h-7 text-green-400'><path strokeLinecap='round' strokeLinejoin='round' d='M16.5 7.5V6A2.25 2.25 0 0014.25 3.75h-4.5A2.25 2.25 0 007.5 6v1.5' /><path strokeLinecap='round' strokeLinejoin='round' d='M3.75 7.5h16.5M4.5 7.5v10.125A2.625 2.625 0 007.125 20.25h9.75A2.625 2.625 0 0020.25 17.625V7.5' /></svg>
              Appointment Details
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <label className="block">
                  <span className="flex items-center gap-2 text-green-700 font-medium mb-1">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 4h8' /></svg>
                    Date
                  </span>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate || ""}
                    onChange={handleChange}
                    className="w-full border border-green-200 p-4 rounded-lg text-lg focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-green-700 font-medium mb-1">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3' /><path strokeLinecap='round' strokeLinejoin='round' d='M12 6a9 9 0 110 18 9 9 0 010-18z' /></svg>
                    Time
                  </span>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime || ""}
                    onChange={handleChange}
                    className="w-full border border-green-200 p-4 rounded-lg text-lg focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-green-700 font-medium mb-1">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' /><path strokeLinecap='round' strokeLinejoin='round' d='M12 4a8 8 0 110 16 8 8 0 010-16z' /></svg>
                    Specialization
                  </span>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full border border-green-200 p-4 rounded-lg text-lg focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                  >
                    <option value="">Select Specialization</option>
                    <option value="Ayurveda">Ayurveda</option>
                    <option value="Panchakarma">Panchakarma</option>
                    <option value="Nutrition">Nutrition</option>
                  </select>
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-green-700 font-medium mb-1">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' /><path strokeLinecap='round' strokeLinejoin='round' d='M12 4a8 8 0 110 16 8 8 0 010-16z' /></svg>
                    Doctor
                  </span>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    required
                    className="w-full border border-green-200 p-4 rounded-lg text-lg focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.fullName} - {doc.specialization}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex-1 space-y-6">
                <label className="block">
                  <span className="flex items-center gap-2 text-green-700 font-medium mb-1">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' /><path strokeLinecap='round' strokeLinejoin='round' d='M12 4a8 8 0 110 16 8 8 0 010-16z' /></svg>
                    Mode
                  </span>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full border border-green-200 p-4 rounded-lg text-lg focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                  >
                    <option value="">Select Mode</option>
                    <option value="Online">Online</option>
                    <option value="In-person">In-person</option>
                  </select>
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-green-700 font-medium mb-1">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' /><path strokeLinecap='round' strokeLinejoin='round' d='M12 4a8 8 0 110 16 8 8 0 010-16z' /></svg>
                    Reason for Visit
                  </span>
                  <textarea
                    name="reason"
                    placeholder="Reason for visit"
                    value={formData.reason || ""}
                    onChange={handleChange}
                    className="w-full border border-green-200 p-4 rounded-lg text-lg focus:ring-2 focus:ring-green-300 focus:border-green-400 transition min-h-[120px]"
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <textarea
              name="medicalHistory"
              placeholder="Medical History"
              value={formData.medicalHistory || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <textarea
              name="medications"
              placeholder="Current Medications"
              value={formData.medications || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <textarea
              name="allergies"
              placeholder="Allergies"
              value={formData.allergies || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <input
              type="text"
              name="insuranceProvider"
              placeholder="Insurance Provider"
              value={formData.insuranceProvider || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <input
              type="text"
              name="policyNumber"
              placeholder="Policy Number"
              value={formData.policyNumber || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <input
              type="file"
              name="insuranceCard"
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <input
              type="file"
              name="reports"
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <input
              type="file"
              name="prescription"
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            >
              <option value="">Select Payment Mode</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
            </select>
            <input
              type="file"
              name="paymentReceipt"
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            <textarea
              name="additionalNotes"
              placeholder="Additional Notes"
              value={formData.additionalNotes || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <label className="flex items-center gap-4 text-lg">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="w-6 h-6"
              />
              I confirm that the above details are correct
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navbar />
       <div className="mt-20"></div>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-8 md:p-12 pt-28">
          <div className="max-w-4xl mx-auto bg-white/90 p-4 sm:p-8 md:p-12 rounded-3xl shadow-2xl min-h-[80vh] flex flex-col justify-center border border-green-100">
            {/* Stepper */}
            <div className="flex justify-between mb-10">
              {steps.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 mb-2
                      ${i + 1 < step ? 'bg-green-500 border-green-500 text-white' : i + 1 === step ? 'bg-white border-green-500 text-green-600 font-bold shadow-lg' : 'bg-gray-200 border-gray-300 text-gray-400'}`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-xs sm:text-sm text-center ${i + 1 <= step ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>{s}</span>
                  {i < steps.length - 1 && (
                    <div className={`h-1 w-full mt-1 ${i + 1 < step ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="transition-all duration-300">
              {renderStep()}
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between mt-12 gap-4">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-lg rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                >
                  Back
                </button>
              )}
              {step < steps.length ? (
                <button
                  onClick={nextStep}
                  className="ml-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-lg rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="ml-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}