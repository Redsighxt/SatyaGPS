import { useState } from "react";

interface DraggableNumberProps {
  value: number;
  color: string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function DraggableNumber({ 
  value, 
  color, 
  onChange, 
  min = 0, 
  max = 20 
}: DraggableNumberProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handleIncrement}
        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-300 transition-colors"
      >
        +
      </button>
      
      <div
        className={`w-16 h-16 bg-${color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl cursor-move hover:scale-110 transition-transform shadow-lg draggable ${
          isDragging ? 'scale-110' : ''
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {value}
      </div>
      
      <button
        onClick={handleDecrement}
        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-300 transition-colors"
      >
        -
      </button>
    </div>
  );
}
