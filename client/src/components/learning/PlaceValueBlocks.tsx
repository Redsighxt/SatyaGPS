import { motion } from 'framer-motion';
import { useState } from 'react';

interface PlaceValueBlocksProps {
  hundreds?: number;
  tens?: number;
  ones?: number;
  onValueChange?: (place: 'hundreds' | 'tens' | 'ones', value: number) => void;
  interactive?: boolean;
}

export function PlaceValueBlocks({ 
  hundreds = 0, 
  tens = 0, 
  ones = 0, 
  onValueChange,
  interactive = true 
}: PlaceValueBlocksProps) {
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);

  const HundredBlock = () => (
    <motion.div 
      className="w-16 h-16 bg-coral bg-opacity-80 rounded border-2 border-white grid grid-cols-3 gap-0.5 p-1 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {Array(9).fill(null).map((_, i) => (
        <div key={i} className="bg-white rounded-sm"></div>
      ))}
    </motion.div>
  );

  const TenBlock = () => (
    <motion.div 
      className="w-12 h-4 bg-turquoise bg-opacity-80 rounded border border-white cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    />
  );

  const OneBlock = () => (
    <motion.div 
      className="w-4 h-4 bg-mint bg-opacity-80 rounded border border-white cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    />
  );

  const addBlock = (place: 'hundreds' | 'tens' | 'ones') => {
    if (interactive && onValueChange) {
      const currentValue = place === 'hundreds' ? hundreds : place === 'tens' ? tens : ones;
      const maxValue = place === 'hundreds' ? 9 : place === 'tens' ? 9 : 9;
      if (currentValue < maxValue) {
        onValueChange(place, currentValue + 1);
      }
    }
  };

  const removeBlock = (place: 'hundreds' | 'tens' | 'ones') => {
    if (interactive && onValueChange) {
      const currentValue = place === 'hundreds' ? hundreds : place === 'tens' ? tens : ones;
      if (currentValue > 0) {
        onValueChange(place, currentValue - 1);
      }
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Hundreds */}
      <div className="text-center">
        <h4 className="text-lg font-fredoka text-darkgray mb-4">Hundreds</h4>
        <div 
          className="bg-gradient-to-b from-coral to-red-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center"
          onClick={() => addBlock('hundreds')}
        >
          {Array(hundreds).fill(null).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                removeBlock('hundreds');
              }}
            >
              <HundredBlock />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tens */}
      <div className="text-center">
        <h4 className="text-lg font-fredoka text-darkgray mb-4">Tens</h4>
        <div 
          className="bg-gradient-to-b from-turquoise to-teal-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center"
          onClick={() => addBlock('tens')}
        >
          {Array(tens).fill(null).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                removeBlock('tens');
              }}
            >
              <TenBlock />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ones */}
      <div className="text-center">
        <h4 className="text-lg font-fredoka text-darkgray mb-4">Ones</h4>
        <div 
          className="bg-gradient-to-b from-mint to-green-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center"
          onClick={() => addBlock('ones')}
        >
          {Array(ones).fill(null).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                removeBlock('ones');
              }}
            >
              <OneBlock />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
