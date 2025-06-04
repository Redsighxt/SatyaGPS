import { Link } from "wouter";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  progress: number;
  href: string;
}

export default function ModuleCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  progress, 
  href 
}: ModuleCardProps) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      coral: 'from-coral to-red-400 bg-coral',
      turquoise: 'from-turquoise to-teal-400 bg-turquoise',
      skyblue: 'from-skyblue to-blue-400 bg-skyblue',
      plum: 'from-plum to-purple-400 bg-plum'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-coral to-red-400 bg-coral';
  };

  const progressDots = Array.from({ length: 4 }, (_, i) => (
    <div
      key={i}
      className={`w-2 h-2 rounded-full ${
        i < Math.floor(progress / 25) ? `bg-${color}` : 'bg-gray-200'
      }`}
    />
  ));

  return (
    <Link href={href}>
      <motion.div
        className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-center">
          <motion.div 
            className={`w-20 h-20 bg-gradient-to-br ${getColorClasses(color)} rounded-2xl flex items-center justify-center mx-auto mb-4`}
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="text-white" size={32} />
          </motion.div>
          <h4 className="text-xl font-fredoka text-darkgray mb-3">
            {title}
          </h4>
          <p className="text-mediumgray mb-4 text-sm">
            {description}
          </p>
          <div className={`bg-${color} bg-opacity-20 rounded-full py-2 px-4 mb-4`}>
            <div className="flex items-center justify-center space-x-1">
              {progressDots}
            </div>
          </div>
          <motion.button 
            className={`w-full bg-${color} text-white font-bold py-3 rounded-2xl transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Adventure
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}
