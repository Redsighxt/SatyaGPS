import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SquareGridProps {
  size: number;
  interactive?: boolean;
  onComplete?: (size: number) => void;
  showAnimation?: boolean;
}

export function SquareGrid({ 
  size = 3, 
  interactive = false, 
  onComplete,
  showAnimation = true 
}: SquareGridProps) {
  const [filledCells, setFilledCells] = useState<boolean[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    setFilledCells(new Array(size * size).fill(false));
  }, [size]);

  const buildSquare = () => {
    if (isBuilding) return;
    
    setIsBuilding(true);
    const newFilledCells = new Array(size * size).fill(false);
    
    for (let i = 0; i < size * size; i++) {
      setTimeout(() => {
        newFilledCells[i] = true;
        setFilledCells([...newFilledCells]);
        
        if (i === size * size - 1) {
          setIsBuilding(false);
          onComplete?.(size);
        }
      }, i * 100);
    }
  };

  const toggleCell = (index: number) => {
    if (!interactive || isBuilding) return;
    
    const newFilledCells = [...filledCells];
    newFilledCells[index] = !newFilledCells[index];
    setFilledCells(newFilledCells);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className="grid gap-1 p-4 bg-white rounded-xl shadow-lg"
        style={{ 
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          width: 'fit-content'
        }}
      >
        {Array(size * size).fill(null).map((_, index) => (
          <motion.div
            key={index}
            className={`w-8 h-8 border-2 border-gray-300 rounded cursor-pointer ${
              filledCells[index] 
                ? 'bg-gradient-to-br from-plum to-purple-400' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              backgroundColor: filledCells[index] ? 'hsl(var(--plum))' : 'rgb(243 244 246)'
            }}
            transition={{ 
              delay: showAnimation ? index * 0.05 : 0,
              duration: 0.2 
            }}
            onClick={() => toggleCell(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-fredoka text-darkgray mb-2">
          {size}² = {size * size}
        </div>
        <p className="text-mediumgray mb-4">
          {size} × {size} = {size * size}
        </p>
        {interactive && (
          <button
            onClick={buildSquare}
            disabled={isBuilding}
            className="bg-plum text-white font-bold py-2 px-6 rounded-full hover:bg-purple-500 transition-colors disabled:opacity-50"
          >
            {isBuilding ? 'Building...' : 'Build Square'}
          </button>
        )}
      </div>
    </div>
  );
}
