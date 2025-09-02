import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-green-700 cursor-pointer"
        >
          🌿 PanchakarmaCare
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-6">
          <button
            className="text-gray-700 hover:text-green-700 transition"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="text-gray-700 hover:text-green-700 transition"
            onClick={() => navigate("/about")}
          >
            About
          </button>
          <button
            className="text-gray-700 hover:text-green-700 transition"
            onClick={() => navigate("/doctors")}
          >
            Doctors
          </button>
          <button
            className="text-gray-700 hover:text-green-700 transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Book Appointment
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl= "/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
