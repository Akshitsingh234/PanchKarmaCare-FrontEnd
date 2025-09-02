import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Navbar from "../Components/Navbar"; 
import { useNavigate } from "react-router-dom";
export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user } = useUser();  // Clerk user object
  const [form, setForm] = useState({
    age: "",
    gender: "",
    medicalHistory: "",
    lifestyleHabits: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/patients/${user.id}/profile`, // clerkUserId from Clerk
        form
      );
      setMessage("Profile updated successfully!");
      console.log("Updated patient:", response.data);
       navigate('/dashboard');
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile");
    }
  };

  return (
    
    <div className="container mt-5">
         <Navbar />
      <h2>Setup Your Profile</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">--Select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Medical History</label>
          <textarea
            name="medicalHistory"
            value={form.medicalHistory}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Lifestyle Habits</label>
          <textarea
            name="lifestyleHabits"
            value={form.lifestyleHabits}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Profile
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
