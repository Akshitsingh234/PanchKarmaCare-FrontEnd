import { FaYoutube, FaSquareInstagram, FaSquareXTwitter, FaFacebook } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-[#E6E6FA] text-gray-800 px-6 py-10">
            {/* About Section */}
            <div>
                <h3 className="text-xl font-bold mb-4">About PanchKarmaCare</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                    MediPlan is your personalized tool for managing long-term medication schedules. With reminders,
                    progress tracking, and caregiver support, we help ensure you stay on top of your health.
                </p>
                <div className="flex gap-4 mt-6">
                    <FaYoutube className="w-6 h-6 text-red-600 hover:scale-110 hover:text-red-700 transition-transform cursor-pointer" />
                    <FaSquareInstagram className="w-6 h-6 text-pink-600 hover:scale-110 hover:text-pink-700 transition-transform cursor-pointer" />
                    <FaSquareXTwitter className="w-6 h-6 text-black hover:scale-110 hover:text-gray-800 transition-transform cursor-pointer" />
                    <FaFacebook className="w-6 h-6 text-blue-600 hover:scale-110 hover:text-blue-800 transition-transform cursor-pointer" />
                </div>
            </div>
            <div className="mt-6 max-w-7xl mx-auto  grid grid-cols-2 sm:grid-cols-3 gap-8 lg:grid-cols-3 justify-between lg:flex">
                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline hover:text-purple-700">Medication Reminders</a></li>
                        <li><a href="#" className="hover:underline hover:text-purple-700">Medication Benefits & Risks</a></li>
                        <li><a href="#" className="hover:underline hover:text-purple-700">FAQs</a></li>
                        <li><a href="/customisedService.html" className="hover:underline hover:text-purple-700">Parenting Feature</a></li>
                        <li><a href="/contact.html" className="hover:underline hover:text-purple-700">Contact Us</a></li>
                    </ul>
                </div>

                {/* Helpful Links */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Helpful Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline hover:text-purple-700">How to Manage Medications</a></li>
                        <li><a href="#" className="hover:underline hover:text-purple-700">Caregiver Support Tools</a></li>
                        <li><a href="#" className="hover:underline hover:text-purple-700">Medicine Refill Alerts</a></li>
                        <li><a href="#" className="hover:underline hover:text-purple-700">Health Progress Monitoring</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="https://www.who.int/publications/who-guidelines" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-700">WHO Guidelines</a></li>
                        <li><a href="https://www.cdc.gov/medication-safety/about/index.html" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-700">CDC Medication Tips</a></li>
                        <li><a href="https://nhsrcindia.org/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-700">Health Ministry Resources</a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} PanchKarmaCare. All rights reserved.
            </div>
        </footer>
    );
}