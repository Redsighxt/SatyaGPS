import { Link } from "wouter";
import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-darkgray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center">
                <Rocket className="text-white" size={20} />
              </div>
              <h4 className="text-xl font-fredoka">Satya Simulation GPS Bursum</h4>
            </div>
            <p className="text-gray-300">
              Making math fun and accessible for young learners everywhere.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/algebra" className="hover:text-coral transition-colors">Learning Modules</Link></li>
              <li><Link href="/practice" className="hover:text-coral transition-colors">Practice Games</Link></li>
              <li><Link href="/dashboard" className="hover:text-coral transition-colors">Progress Tracking</Link></li>
              <li><Link href="/dashboard" className="hover:text-coral transition-colors">Teacher Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-coral transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Satya Simulation GPS Bursum. Making math magical for young minds.</p>
        </div>
      </div>
    </footer>
  );
}
