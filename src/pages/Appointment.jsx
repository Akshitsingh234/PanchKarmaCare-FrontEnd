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
          <div className="space-y-8">
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            >
              <option value="">Select Specialization</option>
              <option value="Ayurveda">Ayurveda</option>
              <option value="Panchakarma">Panchakarma</option>
              <option value="Nutrition">Nutrition</option>
            </select>
             {/* <input
        type="text"
        name="doctor"
        placeholder="Doctor Name"
        value={formData.doctor}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
      /> */}
    <select
  name="doctorId"
  value={formData.doctorId}
  onChange={handleChange}
  required
>
  <option value="">Select Doctor</option>
  {doctors.map((doc) => (
    <option key={doc.id} value={doc.id}>
      {doc.fullName} - {doc.specialization}
    </option>
  ))}
</select>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
            </select>
            <textarea
              name="reason"
              placeholder="Reason for visit"
              value={formData.reason || ""}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg text-lg"
            />
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-12 pt-32">
          <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-xl min-h-[80vh] flex flex-col justify-center">
            {/* Stepper */}
            <div className="flex justify-between mb-10">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex-1 text-center text-base ${
                    i + 1 <= step ? "font-bold text-green-600" : "text-gray-400"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-8 py-3 bg-gray-200 text-lg rounded-lg"
                >
                  Back
                </button>
              )}
              {step < steps.length ? (
                <button
                  onClick={nextStep}
                  className="ml-auto px-8 py-3 bg-green-500 text-white text-lg rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="ml-auto px-8 py-3 bg-green-600 text-white text-lg rounded-lg"
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