import { Link } from "wouter";
import { motion } from "framer-motion";
import { Rocket, Star, User } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";

export default function Header() {
  const { data: progress } = useProgress(1);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <motion.div 
                className="w-12 h-12 bg-coral rounded-full flex items-center justify-center"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Rocket className="text-white" size={24} />
              </motion.div>
              <h1 className="text-2xl md:text-3xl font-fredoka text-darkgray">
                Satya Simulation GPS Bursum
              </h1>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-lightyellow px-4 py-2 rounded-full">
              <Star className="text-coral" size={20} />
              <span className="font-semibold text-darkgray">
                {progress?.totalPoints || 250} Stars
              </span>
            </div>
            <Link href="/dashboard">
              <motion.button 
                className="w-10 h-10 bg-plum rounded-full flex items-center justify-center transition-transform cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="text-white" size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
