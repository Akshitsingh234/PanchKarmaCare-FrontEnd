import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProfileSetup from "./pages/ProfileSetup";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { RedirectToSignIn } from "@clerk/clerk-react";
import Dashboard from "./pages/dashboard";
import AdminPanel from "./pages/AdminPanel";
import DoctorPanel from "./pages/DoctorPanel";
import PatientDashboard from "./pages/dashboard";
import Appoinntment from "./pages/Appointment";
import Prescription from  "./pages/Prescription"; 
import AddPrescription from  "./pages/AddPrescription";  
import DoctorList from  "./pages/DoctorList";  
import ProtectedRoute from "./pages/ProtectedRoute";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<RequireAuth><AdminPanel /></RequireAuth>} />
        <Route path="/profile-setup" element={<RequireAuth><ProfileSetup /></RequireAuth>} />
        <Route path="/login" element={<SignedOut><SignInButton redirectUrl="/profile-setup" /></SignedOut>}/>
        <Route path="/admin-dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
         <Route path="/doctor-dashboard" element={<RequireAuth><DoctorPanel /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><PatientDashboard /></RequireAuth>} />
            <Route path="/book-appointment" element={<RequireAuth><Appoinntment /></RequireAuth>} />
            <Route path="/prescription" element={<RequireAuth><Prescription /></RequireAuth>} />
           <Route path="/add-prescription" element={<RequireAuth><AddPrescription /></RequireAuth>} />
            <Route path="/doctors" element={<DoctorList />} />
      </Routes>
    </BrowserRouter>
  );
  function RequireAuth({ children }) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  return children;
}
}
