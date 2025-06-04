import { motion } from "framer-motion";

export default function Mascot() {
  return (
    <motion.div
      className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg overflow-hidden"
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-coral to-turquoise flex items-center justify-center">
        <motion.div
          className="text-white text-6xl md:text-8xl"
          animate={{ 
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚀
        </motion.div>
      </div>
    </motion.div>
  );
}
