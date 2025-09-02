import React from 'react';
import { FiCalendar, FiFileText, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="lg:w-1/4 bg-[#E6E6FA] p-6 shadow-lg space-y-6 min-h-screen">
      {/* Dashboard Title Box */}
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <h2 className="text-2xl font-bold text-[#2C2C54]">Dashboard</h2>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-[#2C2C54] mb-4 flex items-center">
          <FiBell className="mr-2 text-2xl" /> Quick Actions
        </h2>
        <ul className="space-y-3">
          <li>
            <button 
              onClick={() => handleNavigation('/book-appointment')} 
              className="w-full flex items-center px-4 py-3 bg-white hover:bg-blue-300 hover:shadow-xl shadow-lg duration-300 text-[#2C2C54] rounded-lg transition"
            >
              <FiCalendar className="mr-2 text-2xl" /> Book Appointment
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigation('/prescription')} 
              className="w-full flex items-center px-4 py-3 bg-white hover:bg-blue-300 hover:shadow-xl shadow-lg duration-300 text-[#2C2C54] rounded-lg transition"
            >
              <FiFileText className="mr-2 text-2xl" /> View Prescriptions
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
