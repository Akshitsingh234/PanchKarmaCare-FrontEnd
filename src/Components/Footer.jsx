import { FaYoutube, FaSquareInstagram, FaSquareXTwitter, FaFacebook } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 px-6 py-12 mt-10 rounded-t-3xl shadow-inner">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* About Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">About PanchKarmaCare</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                MediPlan is your personalized tool for managing long-term medication schedules. 
                With reminders, progress tracking, and caregiver support, we help ensure 
                you stay on top of your health.
              </p>
              <div className="flex gap-4 mt-6">
                <FaYoutube className="w-7 h-7 text-red-500 hover:scale-125 hover:text-red-600 transition-transform cursor-pointer" />
                <FaSquareInstagram className="w-7 h-7 text-pink-500 hover:scale-125 hover:text-pink-600 transition-transform cursor-pointer" />
                <FaSquareXTwitter className="w-7 h-7 text-gray-300 hover:scale-125 hover:text-white transition-transform cursor-pointer" />
                <FaFacebook className="w-7 h-7 text-blue-500 hover:scale-125 hover:text-blue-600 transition-transform cursor-pointer" />
              </div>
            </div>
    
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline hover:text-green-300">Medication Reminders</a></li>
                <li><a href="#" className="hover:underline hover:text-green-300">Medication Benefits & Risks</a></li>
                <li><a href="#" className="hover:underline hover:text-green-300">FAQs</a></li>
                <li><a href="/customisedService.html" className="hover:underline hover:text-green-300">Parenting Feature</a></li>
                <li><a href="/contact.html" className="hover:underline hover:text-green-300">Contact Us</a></li>
              </ul>
            </div>
    
            {/* Helpful Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">Helpful Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline hover:text-green-300">How to Manage Medications</a></li>
                <li><a href="#" className="hover:underline hover:text-green-300">Caregiver Support Tools</a></li>
                <li><a href="#" className="hover:underline hover:text-green-300">Medicine Refill Alerts</a></li>
                <li><a href="#" className="hover:underline hover:text-green-300">Health Progress Monitoring</a></li>
              </ul>
            </div>
    
            {/* Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://www.who.int/publications/who-guidelines" 
                     target="_blank" rel="noopener noreferrer" 
                     className="hover:underline hover:text-green-300">
                    WHO Guidelines
                  </a>
                </li>
                <li>
                  <a href="https://www.cdc.gov/medication-safety/about/index.html" 
                     target="_blank" rel="noopener noreferrer" 
                     className="hover:underline hover:text-green-300">
                    CDC Medication Tips
                  </a>
                </li>
                <li>
                  <a href="https://nhsrcindia.org/" 
                     target="_blank" rel="noopener noreferrer" 
                     className="hover:underline hover:text-green-300">
                    Health Ministry Resources
                  </a>
                </li>
              </ul>
            </div>
          </div>
    
          {/* Footer Bottom */}
          <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-green-400">PanchKarmaCare</span>. 
              All rights reserved.
            </p>
          </div>
        </footer>
      );
    
}