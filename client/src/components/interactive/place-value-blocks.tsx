import { useState } from "react";
import { motion } from "framer-motion";

export default function PlaceValueBlocks() {
  const [hundreds, setHundreds] = useState(1);
  const [tens, setTens] = useState(4);
  const [ones, setOnes] = useState(6);

  const totalValue = hundreds * 100 + tens * 10 + ones;

  const HundredBlock = ({ index }: { index: number }) => (
    <motion.div
      key={index}
      className="w-16 h-16 bg-coral bg-opacity-80 rounded border-2 border-white grid grid-cols-3 gap-0.5 p-1"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="bg-white rounded-sm"></div>
      ))}
    </motion.div>
  );

  const TenBlock = ({ index }: { index: number }) => (
    <motion.div
      key={index}
      className="w-12 h-4 bg-turquoise bg-opacity-80 rounded border border-white"
      initial={{ scale: 0, x: -20 }}
      animate={{ scale: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    />
  );

  const OneBlock = ({ index }: { index: number }) => (
    <motion.div
      key={index}
      className="w-4 h-4 bg-mint bg-opacity-80 rounded border border-white"
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.2 }}
    />
  );

  const adjustValue = (place: 'hundreds' | 'tens' | 'ones', delta: number) => {
    switch (place) {
      case 'hundreds':
        setHundreds(Math.max(0, Math.min(9, hundreds + delta)));
        break;
      case 'tens':
        setTens(Math.max(0, Math.min(9, tens + delta)));
        break;
      case 'ones':
        setOnes(Math.max(0, Math.min(9, ones + delta)));
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Place Value Chart */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-fredoka text-darkgray">Hundreds</h4>
            <div className="flex space-x-1">
              <motion.button
                className="w-8 h-8 bg-coral rounded-full text-white font-bold flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustValue('hundreds', -1)}
              >
                -
              </motion.button>
              <motion.button
                className="w-8 h-8 bg-coral rounded-full text-white font-bold flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustValue('hundreds', 1)}
              >
                +
              </motion.button>
            </div>
          </div>
          <div className="bg-gradient-to-b from-coral to-red-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center">
            {Array.from({ length: hundreds }, (_, i) => (
              <HundredBlock key={i} index={i} />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-fredoka text-darkgray">Tens</h4>
            <div className="flex space-x-1">
              <motion.button
                className="w-8 h-8 bg-turquoise rounded-full text-white font-bold flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustValue('tens', -1)}
              >
                -
              </motion.button>
              <motion.button
                className="w-8 h-8 bg-turquoise rounded-full text-white font-bold flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustValue('tens', 1)}
              >
                +
              </motion.button>
            </div>
          </div>
          <div className="bg-gradient-to-b from-turquoise to-teal-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center">
            {Array.from({ length: tens }, (_, i) => (
              <TenBlock key={i} index={i} />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-fredoka text-darkgray">Ones</h4>
            <div className="flex space-x-1">
              <motion.button
                className="w-8 h-8 bg-mint rounded-full text-white font-bold flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustValue('ones', -1)}
              >
                -
              </motion.button>
              <motion.button
                className="w-8 h-8 bg-mint rounded-full text-white font-bold flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => adjustValue('ones', 1)}
              >
                +
              </motion.button>
            </div>
          </div>
          <div className="bg-gradient-to-b from-mint to-green-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center">
            {Array.from({ length: ones }, (_, i) => (
              <OneBlock key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Result Display */}
      <motion.div 
        className="bg-lightyellow rounded-xl p-6 text-center"
        key={totalValue}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-2xl font-fredoka text-darkgray mb-4">Your Number</h4>
        <motion.div 
          className="text-6xl font-bold text-darkgray mb-4"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {totalValue}
        </motion.div>
        <p className="text-lg text-mediumgray">
          {hundreds} Hundred{hundreds !== 1 ? 's' : ''} + {tens} Ten{tens !== 1 ? 's' : ''} + {ones} One{ones !== 1 ? 's' : ''} = {totalValue}
        </p>
      </motion.div>
    </div>
  );
}
