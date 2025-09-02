// ProtectedRoute.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.post("http://localhost:8080/api/auth/login", {
        clerkUserId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        fullName: user.fullName,
      })
      .then((res) => {
        const loggedInUser = res.data;

        if (!loggedInUser?.role) return;

        if (loggedInUser.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (loggedInUser.role === "DOCTOR") {
          navigate("/doctor-dashboard", { state: { user: loggedInUser } });
        } else {
          if (!loggedInUser.age) {
            navigate("/profile-setup");
          } else {
            navigate("/dashboard");
          }
        }
      })
      .catch(err => console.error("❌ Auth check failed:", err));
    }
  }, [user, navigate]);

  return children;
}
