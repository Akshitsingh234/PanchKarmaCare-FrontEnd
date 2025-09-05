import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Ayurveda from "../assets/Ayurveda.png";

import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { FiAlignJustify } from "react-icons/fi";
import Footer from "../Components/Footer";
import Features from "../Components/Features";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  // ✅ Backend login + redirect
  useEffect(() => {
  if (!user) return; // exit if no user yet

  let isMounted = true; // prevent navigation if component unmounts

  axios
    .post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      clerkUserId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      fullName: user.fullName,
    })
    .then((res) => {
      if (!isMounted) return;

      const loggedInUser = res.data;
      console.log("✅ Backend login response:", loggedInUser);

      if (!loggedInUser || !loggedInUser.role) {
        console.error("⚠️ No role found in backend response");
        return;
      }

      switch (loggedInUser.role) {
        case "ADMIN":
          navigate("/admin-dashboard");
          break;
        case "DOCTOR":
          navigate("/doctor-dashboard", { state: { user: loggedInUser } });
          break;
        case "PATIENT":
        default:
          if (!loggedInUser.age || !loggedInUser.gender) {
            navigate("/profile-setup", { state: { user: loggedInUser } });
          } else {
            navigate("/dashboard", { state: { user: loggedInUser } });
          }
          break;
      }
    })
    .catch((err) => {
      console.error("❌ Login error:", err);
    });

  return () => {
    isMounted = false; // cleanup
  };
}, [user, navigate]);

  const features = [
    {
      title: "Set Medication Reminders",
      description: "Never miss a dose with personalized reminders.",
    },
    {
      title: "Track & Manage",
      description: "Monitor your therapy and health journey seamlessly.",
    },
    {
      title: "Stay Alert & Refill",
      description: "Get alerts for medicine refills before you run out.",
    },
    {
      title: "Caregiver Support",
      description: "Allow family or caregivers to manage schedules for you.",
    },
  ];

  return (
    <div className="bg-[#E6E6FA]">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </div>

   import Spline from "@splinetool/react-spline";

{/* Hero Section */}
<section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-soft">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left content */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          Your Health is Our
          <span className="text-primary"> Priority</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
          Experience exceptional healthcare with our team of dedicated professionals. 
          We provide comprehensive medical services with compassion and expertise.
        </p>
        <button 
          size="lg" 
          className="bg-gradient-primary hover:shadow-soft transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
      </div>

      {/* Right content - Replaced Image with Spline */}
      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden shadow-card h-[400px] lg:h-[500px]">
          <Spline scene="https://prod.spline.design/E4w34FMZ2QMn0VfF/scene.splinecode" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
        </div>
        {/* Floating accents */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/30 rounded-full blur-xl"></div>
      </div>
    </div>
  </div>
</section>

      
       <Features/>

    {/* Services Section */}
<section className="bg-white py-10">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Left column - Spline embed */}
    <div className="rounded shadow-md overflow-hidden h-[400px] md:h-[500px]">
      <Spline
        scene="https://prod.spline.design/PpAxekBN8rWu5kge/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      />
    </div>

    {/* Right column - unchanged text content */}
    <div>
      <h2 className="text-3xl font-bold text-blue-800 sm:text-5xl">
        Your Customized Services..
      </h2>
      <p className="mt-4 text-gray-700 sm:text-xl">
        MediPlan to fit your unique health needs! Set personalized
        medication reminders, track your progress, and let caregivers
        manage your schedule.
      </p>
      <ul className="mt-6 space-y-3">
        {["Set Medication Reminders", "Track & Manage", "Stay Alert & Refill"].map(
          (text, i) => (
            <li key={i} className="flex items-center text-blue-800">
              ✅ <span className="ml-2">{text}</span>
            </li>
          )
        )}
      </ul>
      <button
        onClick={() => navigate("/about")}
        className="mt-6 relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-black px-6 py-2.5 text-white text-sm font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"></span>
        <span className="relative z-10 flex items-center">
          Let's Learn More
          <FiAlignJustify className="ml-2 text-lg" />
        </span>
      </button>
    </div>
  </div>
</section>

      {/* Features Grid */}
      <section className="py-10 bg-[#E6E6FA]">
        <div className="features-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white shadow-md rounded-2xl p-4 text-center hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
