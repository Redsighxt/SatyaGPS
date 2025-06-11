import { motion } from "framer-motion";
import { Medal, Star, Trophy } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";

export default function ProgressTracker() {
  const { data: progress, isLoading } = useProgress(1);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-lightyellow to-mint rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="flex space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = progress?.overallProgress ?? 65;
  const completedModules = progress?.completedModules ?? 8;
  const currentStreak = progress?.currentStreak ?? 5;

  return (
    <motion.div 
      className="bg-gradient-to-r from-lightyellow to-mint rounded-3xl p-6 md:p-8 shadow-xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-fredoka text-darkgray mb-4 md:mb-0">
          Your Progress
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold text-coral"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {completedModules}
            </motion.div>
            <div className="text-sm text-mediumgray">Completed</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold text-skyblue"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {currentStreak}
            </motion.div>
            <div className="text-sm text-mediumgray">Day Streak</div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white rounded-full h-4 shadow-inner mb-4 overflow-hidden">
        <motion.div 
          className="bg-gradient-to-r from-coral to-turquoise h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <p className="text-center text-darkgray font-semibold">
        {progressPercentage}% Complete - Keep going!
      </p>
      
      {/* Recent Badges */}
      <div className="flex justify-center space-x-4 mt-6">
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-coral to-red-400 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
        >
          <Medal className="text-white" size={24} />
        </motion.div>
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-turquoise to-teal-400 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          whileHover={{ scale: 1.1 }}
        >
          <Star className="text-white" size={24} />
        </motion.div>
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-plum to-purple-400 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
        >
          <Trophy className="text-white" size={24} />
        </motion.div>
      </div>
    </motion.div>
  );
}
