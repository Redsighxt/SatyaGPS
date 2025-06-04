import { useState } from "react";
import { motion } from "framer-motion";

interface NumberLineProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  showFactors?: boolean;
}

export default function NumberLine({ 
  min = 0, 
  max = 20, 
  step = 1, 
  value = 10,
  onChange,
  showFactors = false 
}: NumberLineProps) {
  const [currentValue, setCurrentValue] = useState(value);

  const handleValueChange = (newValue: number) => {
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const getFactors = (num: number) => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const factors = showFactors ? getFactors(currentValue) : [];

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-mediumgray">{min}</span>
          <span className="text-sm font-semibold text-mediumgray">{max}</span>
        </div>
        
        {/* Number Line */}
        <div className="relative bg-skyblue rounded-full h-4">
          {/* Tick marks */}
          {Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => {
            const tickValue = min + i * step;
            const position = ((tickValue - min) / (max - min)) * 100;
            
            return (
              <div
                key={tickValue}
                className="absolute top-0 w-0.5 h-4 bg-white opacity-50"
                style={{ left: `${position}%` }}
              />
            );
          })}
          
          {/* Current value marker */}
          <motion.div
            className="absolute top-0 w-8 h-8 bg-coral rounded-full -mt-2 shadow-lg cursor-pointer flex items-center justify-center"
            style={{ left: `${((currentValue - min) / (max - min)) * 100}%` }}
            animate={{ left: `${((currentValue - min) / (max - min)) * 100}%` }}
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={(event, info) => {
              const rect = (event.target as HTMLElement).parentElement?.getBoundingClientRect();
              if (rect) {
                const percentage = Math.max(0, Math.min(100, ((info.point.x - rect.left) / rect.width) * 100));
                const newValue = Math.round(min + ((percentage / 100) * (max - min)) / step) * step;
                handleValueChange(Math.max(min, Math.min(max, newValue)));
              }
            }}
          >
            <span className="text-white text-xs font-bold">{currentValue}</span>
          </motion.div>
          
          {/* Factor markers */}
          {showFactors && factors.map((factor) => {
            const position = ((factor - min) / (max - min)) * 100;
            return (
              <motion.div
                key={factor}
                className="absolute top-0 w-4 h-4 bg-mint rounded-full -mt-0.5 shadow-md"
                style={{ left: `${position}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: factor * 0.1 }}
                whileHover={{ scale: 1.3 }}
              />
            );
          })}
        </div>

        {/* Number buttons */}
        <div className="flex justify-center space-x-2 mt-6 flex-wrap gap-2">
          {Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => {
            const buttonValue = min + i * step;
            return (
              <motion.button
                key={buttonValue}
                className={`w-10 h-10 rounded-full font-bold transition-colors ${
                  currentValue === buttonValue
                    ? 'bg-coral text-white'
                    : 'bg-gray-200 text-darkgray hover:bg-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleValueChange(buttonValue)}
              >
                {buttonValue}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Factors display */}
      {showFactors && (
        <motion.div 
          className="bg-lightyellow rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-lg font-fredoka text-darkgray mb-3">
            Factors of {currentValue}
          </h4>
          <div className="flex flex-wrap gap-2">
            {factors.map((factor) => (
              <motion.div
                key={factor}
                className="w-10 h-10 bg-mint rounded-full flex items-center justify-center text-white font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: factor * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {factor}
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-mediumgray mt-2">
            {factors.length} factors found
          </p>
        </motion.div>
      )}
    </div>
  );
}
