// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/home";
// import ProfileSetup from "./pages/ProfileSetup";
// import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
// import { RedirectToSignIn } from "@clerk/clerk-react";
// import Dashboard from "./pages/dashboard";
// import AdminPanel from "./pages/AdminPanel";
// import DoctorPanel from "./pages/DoctorPanel";
// import PatientDashboard from "./pages/dashboard";
// import Appoinntment from "./pages/Appointment";
// import Prescription from  "./pages/Prescription"; 
// import AddPrescription from  "./pages/AddPrescription";  
// import DoctorList from  "./pages/DoctorList";  
// import ProtectedRoute from "./pages/ProtectedRoute";
// import ChatBot from  "./pages/ChatBot"; 
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/admin-dashboard" element={<RequireAuth><AdminPanel /></RequireAuth>} />
//         <Route path="/profile-setup" element={<RequireAuth><ProfileSetup /></RequireAuth>} />
//         <Route path="/login" element={<SignedOut><SignInButton redirectUrl="/profile-setup" /></SignedOut>}/>
//         {/* <Route path="/admin-dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} /> */}
//          <Route path="/doctor-dashboard" element={<RequireAuth><DoctorPanel /></RequireAuth>} />
//           <Route path="/dashboard" element={<RequireAuth><PatientDashboard /></RequireAuth>} />
//             <Route path="/book-appointment" element={<RequireAuth><Appoinntment /></RequireAuth>} />
//             <Route path="/prescription" element={<RequireAuth><Prescription /></RequireAuth>} />
//            <Route path="/add-prescription" element={<RequireAuth><AddPrescription /></RequireAuth>} />
//             <Route path="/doctors" element={<DoctorList />} />
//               <Route path="/symptoms" element={<ChatBot />} />
//       </Routes>
//     </BrowserRouter>
//   );
//   function RequireAuth({ children }) {
//   const { isSignedIn } = useUser();

//   if (!isSignedIn) {
//     return <RedirectToSignIn />;
//   }
//   return children;
// }
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

import Home from "./pages/home";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/dashboard";
import AdminPanel from "./pages/AdminPanel";
import DoctorPanel from "./pages/DoctorPanel";
import PatientDashboard from "./pages/dashboard";
import Appoinntment from "./pages/Appointment";
import Prescription from "./pages/Prescription";
import AddPrescription from "./pages/AddPrescription";
import DoctorList from "./pages/DoctorList";
import ChatBot from "./pages/ChatBot";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./AuthContext.jsx";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin only */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* Doctor only */}
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <DoctorPanel />
              </ProtectedRoute>
            }
          />

          {/* Patient only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          {/* Common routes (sirf login hone chahiye) */}
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/book-appointment" element={<Appoinntment />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/add-prescription" element={<AddPrescription />} />

          {/* Public routes */}
          <Route
            path="/login"
            element={
              <SignedOut>
                <SignInButton redirectUrl="/profile-setup" />
              </SignedOut>
            }
          />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/symptoms" element={<ChatBot />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

