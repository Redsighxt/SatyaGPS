import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { Link } from 'wouter';
import { useUpdateProgress } from '@/hooks/use-progress';
import { Button } from '@/components/ui/button';
import Header from "@/components/Header";

export default function LcmHcf() {
  const [currentProblem, setCurrentProblem] = useState({ num1: 6, num2: 9, type: 'HCF' as 'HCF' | 'LCM' });
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [startTime] = useState(Date.now());
  
  const { mutate: updateProgress } = useUpdateProgress();

  const getFactors = (num: number): number[] => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const getMultiples = (num: number, limit: number = 100): number[] => {
    const multiples = [];
    for (let i = num; i <= limit; i += num) {
      multiples.push(i);
    }
    return multiples;
  };

  const calculateHCF = (a: number, b: number): number => {
    const factorsA = getFactors(a);
    const factorsB = getFactors(b);
    const commonFactors = factorsA.filter(factor => factorsB.includes(factor));
    return Math.max(...commonFactors);
  };

  const calculateLCM = (a: number, b: number): number => {
    const multiplesA = getMultiples(a, 100);
    const multiplesB = getMultiples(b, 100);
    const commonMultiples = multiplesA.filter(multiple => multiplesB.includes(multiple));
    return Math.min(...commonMultiples);
  };

  const correctAnswer = currentProblem.type === 'HCF'
    ? calculateHCF(currentProblem.num1, currentProblem.num2)
    : calculateLCM(currentProblem.num1, currentProblem.num2);

  const checkAnswer = (answer: number) => {
    const correct = answer === correctAnswer;
    setUserAnswer(answer);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 15);
      setTimeout(() => {
        generateNewProblem();
      }, 2000);
    }
  };

  const generateNewProblem = () => {
    const type = Math.random() > 0.5 ? 'HCF' : 'LCM';
    let num1, num2;
    
    if (type === 'HCF') {
      // For HCF, use numbers that have common factors
      const pairs = [[6, 9], [8, 12], [15, 20], [18, 24], [10, 15]];
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      [num1, num2] = pair;
    } else {
      // For LCM, use smaller numbers
      num1 = Math.floor(Math.random() * 8) + 2;
      num2 = Math.floor(Math.random() * 8) + 2;
    }
    
    setCurrentProblem({ num1, num2, type });
    setUserAnswer(null);
    setIsCorrect(null);
    setProblemsCompleted(prev => prev + 1);
  };

  const resetModule = () => {
    setCurrentProblem({ num1: 6, num2: 9, type: 'HCF' });
    setUserAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setProblemsCompleted(0);
  };

  useEffect(() => {
    if (problemsCompleted >= 5) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      updateProgress({ studentId: 1, moduleId: 'lcm-hcf', score, timeSpent });
    }
  }, [problemsCompleted, score, startTime, updateProgress]);

  const factors1 = getFactors(currentProblem.num1);
  const factors2 = getFactors(currentProblem.num2);
  const commonFactors = factors1.filter(factor => factors2.includes(factor));

  const multiples1 = getMultiples(currentProblem.num1, 50);
  const multiples2 = getMultiples(currentProblem.num2, 50);
  const commonMultiples = multiples1.filter(multiple => multiples2.includes(multiple));

  return (
    <div className="min-h-screen bg-gradient-to-br from-skyblue via-blue-400 to-indigo-400">
      <Header />
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
                Number Families
              </h1>
              <p className="text-white/90 text-lg">Discover how numbers are related and find their common friends!</p>
            </div>
            <div className="w-40" />
          </div>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container mx-auto px-4">
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
                      value={currentProblem.num1}
                      onChange={(e) => setCurrentProblem({ ...currentProblem, num1: parseInt(e.target.value) || 1 })}
                      className="w-24 h-16 text-2xl font-bold text-center bg-skyblue text-white rounded-2xl border-0 focus:ring-4 ring-blue-300 transition"
                    />
                  </div>
                  <div className="text-center">
                    <label className="block text-sm font-semibold text-mediumgray mb-2">Second Number</label>
                    <input 
                      type="number"
                      value={currentProblem.num2}
                      onChange={(e) => setCurrentProblem({ ...currentProblem, num2: parseInt(e.target.value) || 1 })}
                      className="w-24 h-16 text-2xl font-bold text-center bg-coral text-white rounded-2xl border-0 focus:ring-4 ring-red-300 transition"
                    />
                  </div>
                </div>
                <div className="bg-lightyellow p-4 rounded-xl">
                    <h5 className="font-bold text-center text-darkgray">Factors of {currentProblem.num1}</h5>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {factors1.map(f => <div key={f} className="w-8 h-8 flex items-center justify-center bg-skyblue/50 rounded-full font-bold text-sm">{f}</div>)}
                    </div>
                </div>
                 <div className="bg-lightyellow p-4 rounded-xl">
                    <h5 className="font-bold text-center text-darkgray">Factors of {currentProblem.num2}</h5>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {factors2.map(f => <div key={f} className="w-8 h-8 flex items-center justify-center bg-coral/50 rounded-full font-bold text-sm">{f}</div>)}
                    </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-fredoka text-darkgray text-center">
                  Results
                </h4>
                 <div className="bg-mint/30 p-6 rounded-2xl text-center">
                    <h5 className="font-bold text-lg text-darkgray">Highest Common Factor (HCF)</h5>
                    <p className="text-4xl font-bold text-green-700">{calculateHCF(currentProblem.num1, currentProblem.num2)}</p>
                </div>
                 <div className="bg-plum/30 p-6 rounded-2xl text-center">
                    <h5 className="font-bold text-lg text-darkgray">Least Common Multiple (LCM)</h5>
                    <p className="text-4xl font-bold text-purple-700">{calculateLCM(currentProblem.num1, currentProblem.num2)}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                    <h5 className="font-bold text-center text-darkgray">Common Factors</h5>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {commonFactors.map(f => <div key={f} className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full font-bold text-sm">{f}</div>)}
                    </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href={`/module/lcm-hcf/challenge`}>
                <Button>Start Challenge</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
