import { useProgress } from "@/hooks/useProgress";
import { Medal, Star, Trophy } from "lucide-react";

export default function ProgressDashboard() {
  const { progress, badges, overallProgress, currentStreak } = useProgress(1); // Demo user ID

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-lightyellow to-mint rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-fredoka text-darkgray mb-4 md:mb-0">
              Your Progress
            </h3>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-coral">{progress.length}</div>
                <div className="text-sm text-mediumgray">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-skyblue">{currentStreak}</div>
                <div className="text-sm text-mediumgray">Day Streak</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white rounded-full h-4 shadow-inner mb-4">
            <div 
              className="bg-gradient-to-r from-coral to-turquoise h-4 rounded-full transition-all duration-500" 
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-center text-darkgray font-semibold">
            {overallProgress}% Complete - Keep going!
          </p>
          
          {/* Recent Badges */}
          <div className="flex justify-center space-x-4 mt-6">
            {badges.slice(0, 3).map((badge, index) => {
              const IconComponent = index === 0 ? Medal : index === 1 ? Star : Trophy;
              const colorClass = index === 0 ? "from-coral to-red-400" : 
                                index === 1 ? "from-turquoise to-teal-400" : 
                                "from-plum to-purple-400";
              
              return (
                <div 
                  key={badge.id}
                  className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-full flex items-center justify-center shadow-lg ${index === 0 ? 'animate-pulse' : ''}`}
                >
                  <IconComponent className="text-white h-6 w-6" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
