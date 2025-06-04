import { useState } from "react";

export default function PlaceValueChart() {
  const [hundreds, setHundreds] = useState(1);
  const [tens, setTens] = useState(4); 
  const [ones, setOnes] = useState(6);

  const totalValue = hundreds * 100 + tens * 10 + ones;

  return (
    <div>
      {/* Place Value Chart */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center">
          <h4 className="text-lg font-fredoka text-darkgray mb-4">Hundreds</h4>
          <div className="bg-gradient-to-b from-coral to-red-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center drop-zone">
            {Array.from({ length: hundreds }).map((_, i) => (
              <div key={i} className="w-16 h-16 bg-coral bg-opacity-80 rounded border-2 border-white grid grid-cols-3 gap-0.5 p-1">
                {Array.from({ length: 9 }).map((_, j) => (
                  <div key={j} className="bg-white rounded-sm" />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <button 
              onClick={() => setHundreds(Math.max(0, hundreds - 1))}
              className="w-8 h-8 bg-red-200 rounded-full mr-2 hover:bg-red-300"
            >
              -
            </button>
            <button 
              onClick={() => setHundreds(Math.min(9, hundreds + 1))}
              className="w-8 h-8 bg-red-200 rounded-full hover:bg-red-300"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <h4 className="text-lg font-fredoka text-darkgray mb-4">Tens</h4>
          <div className="bg-gradient-to-b from-turquoise to-teal-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center drop-zone">
            {Array.from({ length: tens }).map((_, i) => (
              <div key={i} className="w-12 h-4 bg-turquoise bg-opacity-80 rounded border border-white" />
            ))}
          </div>
          <div className="mt-2">
            <button 
              onClick={() => setTens(Math.max(0, tens - 1))}
              className="w-8 h-8 bg-teal-200 rounded-full mr-2 hover:bg-teal-300"
            >
              -
            </button>
            <button 
              onClick={() => setTens(Math.min(9, tens + 1))}
              className="w-8 h-8 bg-teal-200 rounded-full hover:bg-teal-300"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <h4 className="text-lg font-fredoka text-darkgray mb-4">Ones</h4>
          <div className="bg-gradient-to-b from-mint to-green-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center drop-zone">
            {Array.from({ length: ones }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-mint bg-opacity-80 rounded border border-white" />
            ))}
          </div>
          <div className="mt-2">
            <button 
              onClick={() => setOnes(Math.max(0, ones - 1))}
              className="w-8 h-8 bg-green-200 rounded-full mr-2 hover:bg-green-300"
            >
              -
            </button>
            <button 
              onClick={() => setOnes(Math.min(9, ones + 1))}
              className="w-8 h-8 bg-green-200 rounded-full hover:bg-green-300"
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      {/* Result Display */}
      <div className="bg-lightyellow rounded-xl p-6 text-center">
        <h4 className="text-2xl font-fredoka text-darkgray mb-4">Your Number</h4>
        <div className="text-6xl font-bold text-darkgray mb-4">
          {totalValue}
        </div>
        <p className="text-lg text-mediumgray">
          {hundreds} Hundred{hundreds !== 1 ? 's' : ''} + {tens} Ten{tens !== 1 ? 's' : ''} + {ones} One{ones !== 1 ? 's' : ''} = {totalValue}
        </p>
      </div>
    </div>
  );
}
