import { PanInfo, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface DraggableNumberProps {
  value: number;
  onChange: (value: number) => void;
  color: string;
}

export default function DraggableNumber({ value, onChange, color }: DraggableNumberProps) {
  const controls = useAnimation();
  const [dragStartValue, setDragStartValue] = useState(0);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const newValue = Math.max(0, Math.round(dragStartValue + info.offset.x / 20));
    onChange(newValue);
  };

  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    });
  }, [value, controls]);

  return (
    <motion.div 
      drag="x" 
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setDragStartValue(value)}
      onDrag={handleDrag}
      animate={controls}
      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg cursor-grab active:cursor-grabbing bg-${color}`}
    >
      {value}
    </motion.div>
  );
}
