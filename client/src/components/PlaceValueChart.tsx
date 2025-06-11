import { useState } from "react";
import { motion } from "framer-motion";

export default function PlaceValueChart() {
  const [hundreds, setHundreds] = useState(0);
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);

  const total = hundreds * 100 + tens * 10 + ones;

  const blockAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-around items-end">
        {/* Hundreds */}
        <div className="text-center">
          <div className="w-32 h-32 bg-coral bg-opacity-20 rounded-lg p-2 space-y-1 overflow-hidden">
            {Array.from({ length: hundreds }).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-full h-2 bg-coral rounded" 
                variants={blockAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>
          <h4 className="font-fredoka text-lg text-coral mt-2">Hundreds</h4>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <Button onClick={() => setHundreds(h => Math.max(0, h - 1))}>-</Button>
            <span className="font-bold text-xl">{hundreds}</span>
            <Button onClick={() => setHundreds(h => Math.min(9, h + 1))}>+</Button>
          </div>
        </div>
        {/* Tens */}
        <div className="text-center">
          <div className="w-24 h-32 bg-turquoise bg-opacity-20 rounded-lg p-2 space-y-1 overflow-hidden">
            {Array.from({ length: tens }).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-full h-2 bg-turquoise rounded" 
                variants={blockAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>
          <h4 className="font-fredoka text-lg text-turquoise mt-2">Tens</h4>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <Button onClick={() => setTens(t => Math.max(0, t - 1))}>-</Button>
            <span className="font-bold text-xl">{tens}</span>
            <Button onClick={() => setTens(t => Math.min(9, t + 1))}>+</Button>
          </div>
        </div>
        {/* Ones */}
        <div className="text-center">
          <div className="w-16 h-32 bg-plum bg-opacity-20 rounded-lg p-2 space-y-1 overflow-hidden">
            {Array.from({ length: ones }).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-full h-2 bg-plum rounded" 
                variants={blockAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>
          <h4 className="font-fredoka text-lg text-plum mt-2">Ones</h4>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <Button onClick={() => setOnes(o => Math.max(0, o - 1))}>-</Button>
            <span className="font-bold text-xl">{ones}</span>
            <Button onClick={() => setOnes(o => Math.min(9, o + 1))}>+</Button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-fredoka text-darkgray">Total: {total}</h3>
      </div>
    </div>
  );
}

function Button({ children, ...props }: { children: React.ReactNode;[key: string]: any }) {
  return (
    <button {...props} className="w-8 h-8 bg-gray-200 rounded-full font-bold text-lg hover:bg-gray-300 transition-colors">
      {children}
    </button>
  );
}
