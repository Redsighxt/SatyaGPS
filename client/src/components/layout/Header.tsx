import { Rocket, Star, User } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export function Header() {
  const { getTotalStars, getOverallProgress } = useProgress();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center animate-bounce-slow">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-fredoka text-darkgray">
              Satya Simulation GPS Bursum
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-lightyellow px-4 py-2 rounded-full">
              <Star className="text-coral w-5 h-5" />
              <span className="font-semibold text-darkgray">{getTotalStars()} Stars</span>
            </div>
            <button className="w-10 h-10 bg-plum rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <User className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
