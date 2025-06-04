import { useParams } from "wouter";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import DraggableNumber from "@/components/DraggableNumber";
import NumberLine from "@/components/NumberLine";
import PlaceValueChart from "@/components/PlaceValueChart";

export default function Module() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const modules = {
    "number-magic": {
      title: "Number Magic",
      description: "Learn addition, subtraction, multiplication and division with fun animations!",
      color: "coral",
      icon: "plus",
      component: <AlgebraicOperations />
    },
    "number-building": {
      title: "Number Building", 
      description: "Build big numbers with ones, tens, and hundreds blocks!",
      color: "turquoise",
      icon: "layer-group",
      component: <PlaceValueModule />
    },
    "number-families": {
      title: "Number Families",
      description: "Discover how numbers are related and find their common friends!",
      color: "skyblue", 
      icon: "project-diagram",
      component: <LCMHCFModule />
    },
    "square-world": {
      title: "Square World",
      description: "Create perfect squares and discover their magical roots!",
      color: "plum",
      icon: "th",
      component: <SquaresModule />
    }
  };

  const module = modules[moduleId as keyof typeof modules];

  if (!module) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-fredoka text-white mb-4">Module Not Found</h1>
          <Link href="/">
            <Button className="bg-coral text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Module Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-fredoka text-white mb-2">
                {module.title}
              </h1>
              <p className="text-white/90 text-lg">{module.description}</p>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </section>

      {/* Module Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {module.component}
        </div>
      </section>
    </div>
  );
}

// Individual module components
function AlgebraicOperations() {
  const [num1, setNum1] = useState(3);
  const [num2, setNum2] = useState(4);
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(7);

  const operations = ["+", "-", "×", "÷"];

  const calculateResult = () => {
    switch (operation) {
      case "+": return num1 + num2;
      case "-": return num1 - num2;
      case "×": return num1 * num2;
      case "÷": return Math.floor(num1 / num2);
      default: return 0;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-fredoka text-darkgray text-center mb-8">
        Interactive Math Operations
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Number Line */}
        <div className="space-y-6">
          <h4 className="text-xl font-fredoka text-darkgray text-center">
            Drag and Drop Math
          </h4>
          <NumberLine value={result} max={20} />
          
          {/* Operation Interface */}
          <div className="flex justify-center items-center space-x-4">
            <DraggableNumber 
              value={num1} 
              color="coral"
              onChange={setNum1}
            />
            <select 
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="text-4xl font-bold text-darkgray bg-transparent border-0 focus:outline-none"
            >
              {operations.map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
            <DraggableNumber 
              value={num2} 
              color="turquoise"
              onChange={setNum2}
            />
            <span className="text-4xl font-bold text-darkgray">=</span>
            <div className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {calculateResult()}
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
              {Array(Math.min(calculateResult(), 25)).fill(0).map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 bg-coral rounded-full shadow-md animate-bounce-slow" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceValueModule() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-fredoka text-darkgray text-center mb-8">
        Build Numbers with Place Value
      </h3>
      <PlaceValueChart />
    </div>
  );
}

function LCMHCFModule() {
  const [num1, setNum1] = useState(12);
  const [num2, setNum2] = useState(18);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const getFactors = (n: number): number[] => {
    const factors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-fredoka text-darkgray text-center mb-8">
        Find Number Relationships
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-xl font-fredoka text-darkgray text-center">
            Choose Numbers
          </h4>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <label className="block text-sm font-semibold text-mediumgray mb-2">First Number</label>
              <input 
                type="number"
                value={num1}
                onChange={(e) => setNum1(parseInt(e.target.value) || 1)}
                className="w-20 h-16 text-2xl font-bold text-center bg-skyblue text-white rounded-2xl border-0"
              />
            </div>
            <div className="text-center">
              <label className="block text-sm font-semibold text-mediumgray mb-2">Second Number</label>
              <input 
                type="number"
                value={num2}
                onChange={(e) => setNum2(parseInt(e.target.value) || 1)}
                className="w-20 h-16 text-2xl font-bold text-center bg-coral text-white rounded-2xl border-0"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-fredoka text-darkgray text-center">
            Results
          </h4>
          <div className="bg-lightyellow rounded-xl p-6 space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-darkgray">Highest Common Factor (HCF)</div>
              <div className="text-3xl font-bold text-coral">{gcd(num1, num2)}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-darkgray">Least Common Multiple (LCM)</div>
              <div className="text-3xl font-bold text-turquoise">{lcm(num1, num2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SquaresModule() {
  const [number, setNumber] = useState(4);
  const square = number * number;
  const squareRoot = Math.sqrt(number);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-fredoka text-darkgray text-center mb-8">
        Explore Squares and Square Roots
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-xl font-fredoka text-darkgray text-center">
            Choose a Number
          </h4>
          <div className="text-center">
            <input 
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
              className="w-24 h-20 text-3xl font-bold text-center bg-plum text-white rounded-2xl border-0 mb-4"
              min="1"
              max="10"
            />
            <p className="text-lg text-mediumgray">
              {number}² = {square}
            </p>
            {Number.isInteger(squareRoot) && (
              <p className="text-lg text-mediumgray">
                √{number} = {squareRoot}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-fredoka text-darkgray text-center">
            Visual Square
          </h4>
          <div className="bg-lightyellow rounded-xl p-4 flex justify-center">
            <div 
              className={`grid gap-1 p-2`}
              style={{ 
                gridTemplateColumns: `repeat(${number}, 1fr)`,
                gridTemplateRows: `repeat(${number}, 1fr)`
              }}
            >
              {Array(square).fill(0).map((_, i) => (
                <div 
                  key={i}
                  className="w-6 h-6 bg-plum rounded border border-white animate-pulse"
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-darkgray">
              {number} × {number} = {square} squares
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
