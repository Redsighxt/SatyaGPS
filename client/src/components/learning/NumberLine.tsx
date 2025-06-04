import { motion } from 'framer-motion';

interface NumberLineProps {
  min?: number;
  max?: number;
  currentValue?: number;
  showMarkers?: boolean;
  onValueChange?: (value: number) => void;
}

export function NumberLine({ 
  min = 0, 
  max = 10, 
  currentValue = 0, 
  showMarkers = true,
  onValueChange 
}: NumberLineProps) {
  const markers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  
  return (
    <div className="bg-gray-100 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-mediumgray">{min}</span>
        <span className="text-sm font-semibold text-mediumgray">{max}</span>
      </div>
      
      <div className="relative bg-skyblue rounded-full h-3">
        {showMarkers && markers.map((marker) => (
          <button
            key={marker}
            className="absolute top-0 w-6 h-6 bg-coral rounded-full -mt-1.5 shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-white text-xs font-bold"
            style={{
              left: `${((marker - min) / (max - min)) * 100}%`,
              transform: 'translateX(-50%)',
            }}
            onClick={() => onValueChange?.(marker)}
          >
            {marker}
          </button>
        ))}
        
        {currentValue !== undefined && (
          <motion.div
            className="absolute top-0 w-8 h-8 bg-mint rounded-full -mt-2.5 shadow-lg flex items-center justify-center text-white font-bold"
            style={{
              left: `${((currentValue - min) / (max - min)) * 100}%`,
              transform: 'translateX(-50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {currentValue}
          </motion.div>
        )}
      </div>
    </div>
  );
}
