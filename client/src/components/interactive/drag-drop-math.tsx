import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Equal } from "lucide-react";

export default function DragDropMath() {
  const [leftNumber, setLeftNumber] = useState(3);
  const [rightNumber, setRightNumber] = useState(4);
  const [result, setResult] = useState(leftNumber + rightNumber);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const updateResult = () => {
    setResult(leftNumber + rightNumber);
  };

  const handleDragStart = (number: number) => {
    setDraggedItem(number);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (position: 'left' | 'right') => {
    if (draggedItem !== null) {
      if (position === 'left') {
        setLeftNumber(draggedItem);
      } else {
        setRightNumber(draggedItem);
      }
      setTimeout(updateResult, 100);
    }
  };

  const DraggableNumber = ({ number, color }: { number: number; color: string }) => (
    <motion.div
      className={`w-16 h-16 bg-${color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl cursor-move shadow-lg draggable`}
      draggable
      onDragStart={() => handleDragStart(number)}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.2, rotate: 5 }}
    >
      {number}
    </motion.div>
  );

  const DropZone = ({ position, currentNumber, color }: { position: 'left' | 'right'; currentNumber: number; color: string }) => (
    <motion.div
      className={`w-16 h-16 bg-${color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg drag-area`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(position)}
      whileHover={{ scale: 1.05 }}
    >
      {currentNumber}
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Interactive Addition */}
      <div className="space-y-6">
        <h4 className="text-xl font-fredoka text-darkgray text-center">
          Drag and Drop Addition
        </h4>
        
        {/* Number Line */}
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-mediumgray">0</span>
            <span className="text-sm font-semibold text-mediumgray">10</span>
          </div>
          <div className="relative bg-skyblue rounded-full h-3">
            <motion.div 
              className="absolute top-0 w-6 h-6 bg-coral rounded-full -mt-1.5 shadow-lg cursor-pointer"
              style={{ left: `${(leftNumber / 10) * 100}%` }}
              animate={{ left: `${(leftNumber / 10) * 100}%` }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.div 
              className="absolute top-0 w-6 h-6 bg-turquoise rounded-full -mt-1.5 shadow-lg cursor-pointer"
              style={{ left: `${(rightNumber / 10) * 100}%` }}
              animate={{ left: `${(rightNumber / 10) * 100}%` }}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        </div>
        
        {/* Equation */}
        <div className="flex items-center justify-center space-x-4">
          <DropZone position="left" currentNumber={leftNumber} color="coral" />
          <Plus className="text-4xl text-darkgray" size={32} />
          <DropZone position="right" currentNumber={rightNumber} color="turquoise" />
          <Equal className="text-4xl text-darkgray" size={32} />
          <motion.div 
            className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
            key={result}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {result}
          </motion.div>
        </div>

        {/* Draggable Numbers */}
        <div className="flex justify-center space-x-4 flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <DraggableNumber 
              key={number} 
              number={number} 
              color={number <= 5 ? "coral" : "turquoise"} 
            />
          ))}
        </div>
      </div>

      {/* Visual Counters */}
      <div className="space-y-6">
        <h4 className="text-xl font-fredoka text-darkgray text-center">
          Count with Objects
        </h4>
        
        {/* Counter Objects */}
        <div className="bg-lightyellow rounded-xl p-4 min-h-32">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: result }, (_, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 bg-coral rounded-full shadow-md"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                whileHover={{ 
                  scale: 1.2,
                  y: [0, -5, 0],
                  transition: { duration: 0.3 }
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <motion.button 
            className="bg-mint text-white font-bold py-3 px-6 rounded-2xl hover:bg-green-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const newLeft = Math.floor(Math.random() * 5) + 1;
              const newRight = Math.floor(Math.random() * 5) + 1;
              setLeftNumber(newLeft);
              setRightNumber(newRight);
              setTimeout(() => setResult(newLeft + newRight), 100);
            }}
          >
            <Plus className="inline mr-2" size={20} />
            New Problem
          </motion.button>
        </div>
      </div>
    </div>
  );
}
