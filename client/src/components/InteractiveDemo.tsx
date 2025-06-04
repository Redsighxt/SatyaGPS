import { useState } from "react";
import DraggableNumber from "./DraggableNumber";
import NumberLine from "./NumberLine";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function InteractiveDemo() {
  const [num1, setNum1] = useState(3);
  const [num2, setNum2] = useState(4);
  const result = num1 + num2;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-coral via-red-400 to-pink-400 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-fredoka text-white text-center mb-8">
            Try Number Magic Now!
          </h3>
          <div className="bg-white rounded-2xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Interactive Addition */}
              <div className="space-y-6">
                <h4 className="text-xl font-fredoka text-darkgray text-center">
                  Drag and Drop Addition
                </h4>
                
                <NumberLine value={result} max={20} />
                
                {/* Draggable Numbers */}
                <div className="flex justify-center items-center space-x-4">
                  <DraggableNumber 
                    value={num1} 
                    color="coral"
                    onChange={setNum1}
                  />
                  <div className="text-4xl font-bold text-darkgray">+</div>
                  <DraggableNumber 
                    value={num2} 
                    color="turquoise"
                    onChange={setNum2}
                  />
                  <div className="text-4xl font-bold text-darkgray">=</div>
                  <div className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {result}
                  </div>
                </div>
              </div>

              {/* Visual Counters */}
              <div className="space-y-6">
                <h4 className="text-xl font-fredoka text-darkgray text-center">
                  Count with Objects
                </h4>
                
                <div className="bg-lightyellow rounded-xl p-4 min-h-32">
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: Math.min(result, 25) }).map((_, i) => (
                      <div 
                        key={i}
                        className="w-8 h-8 bg-coral rounded-full shadow-md animate-bounce-slow" 
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <Button className="bg-mint text-white font-bold py-3 px-6 rounded-2xl hover:bg-green-500 transition-colors">
                    <Plus className="mr-2 h-4 w-4" />
                    Add More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
