import { useState } from "react";
import { motion } from "framer-motion";

interface SquareGridProps {
  size?: number;
  onChange?: (size: number, area: number) => void;
}

export default function SquareGrid({ size: initialSize = 3, onChange }: SquareGridProps) {
  const [size, setSize] = useState(initialSize);
  const [showSquareRoot, setShowSquareRoot] = useState(false);

  const area = size * size;

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    onChange?.(newSize, newSize * newSize);
  };

  const isPerfectSquare = (num: number) => {
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
  };

  return (
    <div className="space-y-6">
      {/* Size Controls */}
      <div className="flex items-center justify-center space-x-4">
        <motion.button
          className="w-12 h-12 bg-coral rounded-full text-white font-bold flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSizeChange(Math.max(1, size - 1))}
          disabled={size <= 1}
        >
          -
        </motion.button>
        <div className="text-center">
          <div className="text-2xl font-bold text-darkgray">{size} × {size}</div>
          <div className="text-sm text-mediumgray">Grid Size</div>
        </div>
        <motion.button
          className="w-12 h-12 bg-coral rounded-full text-white font-bold flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSizeChange(Math.min(10, size + 1))}
          disabled={size >= 10}
        >
          +
        </motion.button>
      </div>

      {/* Grid Display */}
      <div className="flex justify-center">
        <div 
          className="inline-grid gap-1 p-4 bg-plum bg-opacity-20 rounded-2xl"
          style={{ 
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            maxWidth: '400px'
          }}
        >
          {Array.from({ length: area }, (_, i) => (
            <motion.div
              key={i}
              className="w-8 h-8 bg-plum rounded border border-white shadow-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: i * 0.02,
                duration: 0.3,
                type: "spring"
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "hsl(var(--coral))"
              }}
            />
          ))}
        </div>
      </div>

      {/* Area Display */}
      <motion.div 
        className="bg-lightyellow rounded-xl p-6 text-center"
        key={area}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-xl font-fredoka text-darkgray mb-3">
          Square Area
        </h4>
        <div className="text-4xl font-bold text-darkgray mb-2">
          {size}² = {area}
        </div>
        <p className="text-mediumgray">
          {size} rows × {size} columns = {area} squares
        </p>
      </motion.div>

      {/* Square Root Toggle */}
      <div className="text-center">
        <motion.button
          className="bg-mint text-white font-bold py-3 px-6 rounded-2xl transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSquareRoot(!showSquareRoot)}
        >
          {showSquareRoot ? 'Hide' : 'Show'} Square Root
        </motion.button>
      </div>

      {/* Square Root Display */}
      {showSquareRoot && (
        <motion.div 
          className="bg-mint bg-opacity-20 rounded-xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-xl font-fredoka text-darkgray mb-3">
            Square Root
          </h4>
          <div className="text-3xl font-bold text-darkgray mb-2">
            √{area} = {Math.sqrt(area)}
          </div>
          <p className="text-mediumgray">
            {isPerfectSquare(area) 
              ? `${area} is a perfect square!`
              : `${area} is not a perfect square.`
            }
          </p>
        </motion.div>
      )}

      {/* Quick Perfect Squares */}
      <div className="bg-white rounded-xl p-4">
        <h4 className="text-lg font-fredoka text-darkgray mb-3 text-center">
          Quick Perfect Squares
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {[1, 4, 9, 16, 25, 36, 49, 64, 81, 100].map((square) => {
            const root = Math.sqrt(square);
            return (
              <motion.button
                key={square}
                className={`p-2 rounded-lg text-center transition-colors ${
                  area === square
                    ? 'bg-mint text-white'
                    : 'bg-gray-100 text-darkgray hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSizeChange(root)}
              >
                <div className="text-sm font-bold">{root}²</div>
                <div className="text-xs">{square}</div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
