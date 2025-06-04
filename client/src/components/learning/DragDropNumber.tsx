import { useState } from 'react';
import { motion } from 'framer-motion';

interface DragDropNumberProps {
  value: number;
  color: string;
  onDrop?: (value: number) => void;
  className?: string;
}

export function DragDropNumber({ value, color, onDrop, className = "" }: DragDropNumberProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    if (onDrop) {
      onDrop(value);
    }
  };

  return (
    <motion.div
      className={`w-16 h-16 bg-${color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl cursor-move shadow-lg ${className}`}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={{
        scale: isDragging ? 1.1 : 1,
        rotate: isDragging ? 5 : 0,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        x: position.x,
        y: position.y,
      }}
    >
      {value}
    </motion.div>
  );
}
