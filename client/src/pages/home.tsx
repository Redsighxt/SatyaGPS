import Header from "@/components/Header";
import ProgressDashboard from "@/components/ProgressDashboard";
import LearningModules from "@/components/LearningModules";
import InteractiveDemo from "@/components/InteractiveDemo";
import PlaceValueDemo from "@/components/PlaceValueDemo";
import PracticeMode from "@/components/PracticeMode";
import TeacherDashboard from "@/components/TeacherDashboard";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-coral rounded-full flex items-center justify-center shadow-lg animate-float">
                <Rocket className="w-16 h-16 md:w-24 md:h-24 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-fredoka text-white mb-4 drop-shadow-lg">
              Math Adventure Awaits!
            </h2>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
              Join our fun learning journey and discover amazing math concepts through games and interactive activities!
            </p>
            <Button className="bg-coral hover:bg-red-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Rocket className="mr-3 h-6 w-6" />
              Start Learning
            </Button>
          </div>
        </div>
      </section>

      <ProgressDashboard />
      <LearningModules />
      <InteractiveDemo />
      <PlaceValueDemo />
      <PracticeMode />
      <TeacherDashboard />

      {/* Footer */}
      <footer className="bg-darkgray text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center">
                  <Rocket className="text-white w-5 h-5" />
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
                <li><a href="#" className="hover:text-coral transition-colors">Learning Modules</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Practice Games</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Progress Tracking</a></li>
                <li><a href="#" className="hover:text-coral transition-colors">Teacher Dashboard</a></li>
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
    </div>
  );
}
