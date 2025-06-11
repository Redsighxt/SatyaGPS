import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { Link } from 'wouter';
import { SquareGrid } from '@/components/learning/SquareGrid';
import { useUpdateProgress } from '@/hooks/use-progress';
import { Button } from '@/components/ui/button';
import Header from "@/components/Header";

export default function Squares() {
  const [currentProblem, setCurrentProblem] = useState({ number: 3, type: 'square' as 'square' | 'root' });
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [startTime] = useState(Date.now());
  const [showGridAnimation, setShowGridAnimation] = useState(false);
  
  const { mutate: updateProgress } = useUpdateProgress();

  const correctAnswer = currentProblem.type === 'square'
    ? currentProblem.number * currentProblem.number
    : Math.sqrt(currentProblem.number);

  const checkAnswer = (answer: number) => {
    const correct = answer === correctAnswer;
    setUserAnswer(answer);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 15);
      setShowGridAnimation(true);
      setTimeout(() => {
        generateNewProblem();
        setShowGridAnimation(false);
      }, 3000);
    }
  };

  const generateNewProblem = () => {
    const type = Math.random() > 0.5 ? 'square' : 'root';
    let number;
    
    if (type === 'square') {
      number = Math.floor(Math.random() * 7) + 2; // 2-8
    } else {
      const squares = [4, 9, 16, 25, 36, 49, 64];
      number = squares[Math.floor(Math.random() * squares.length)];
    }
    
    setCurrentProblem({ number, type });
    setUserAnswer(null);
    setIsCorrect(null);
    setProblemsCompleted(prev => prev + 1);
  };

  const resetModule = () => {
    setCurrentProblem({ number: 3, type: 'square' });
    setUserAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setProblemsCompleted(0);
    setShowGridAnimation(false);
  };

  useEffect(() => {
    if (problemsCompleted >= 5) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      updateProgress({ studentId: 1, moduleId: 'squares', score, timeSpent });
    }
  }, [problemsCompleted, score, startTime, updateProgress]);

  const generateAnswerOptions = () => {
    const correct = correctAnswer;
    const options = [correct];
    
    if (currentProblem.type === 'square') {
      options.push(correct + 1, correct - 1, correct + 2);
    } else {
      options.push(correct + 1, correct - 1, correct + 2);
    }
    
    return options.filter((val, index, arr) => arr.indexOf(val) === index && val > 0)
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 4);
  };

  return (
    <div className="min-h-screen">
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
                Square World
              </h1>
              <p className="text-white/90 text-lg">Create perfect squares and discover their magical roots!</p>
            </div>
            <div className="w-40" />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-fredoka text-darkgray text-center mb-8">
              Explore Squares and Square Roots
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h4 className="text-xl font-fredoka text-darkgray text-center">
                  Create a Square
                </h4>
                <div className="flex justify-center">
                    <div 
                        className="grid gap-1 bg-plum/20 p-2 rounded-lg"
                        style={{ gridTemplateColumns: `repeat(${currentProblem.number}, 1fr)`}}
                    >
                        {Array.from({ length: currentProblem.number * currentProblem.number }).map((_, i) => (
                            <motion.div 
                                key={i} 
                                className="w-8 h-8 bg-plum rounded"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                            />
                        ))}
                    </div>
                </div>
              </div>

              <div className="space-y-6 text-center">
                <div>
                  <label className="block text-sm font-semibold text-mediumgray mb-2">Choose a number (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentProblem.number}
                    onChange={(e) => setCurrentProblem({ ...currentProblem, number: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div className="bg-lightyellow p-6 rounded-2xl">
                    <p className="text-2xl font-bold text-darkgray">{currentProblem.number} x {currentProblem.number} = <span className="text-plum">{currentProblem.number * currentProblem.number}</span></p>
                    <p className="text-lg text-mediumgray mt-2">{currentProblem.number} squared is {currentProblem.number * currentProblem.number}</p>
                </div>
                 <div className="bg-lightyellow p-6 rounded-2xl">
                    <p className="text-2xl font-bold text-darkgray">√{currentProblem.number} = <span className="text-plum">{Math.sqrt(currentProblem.number).toFixed(3)}</span></p>
                    <p className="text-lg text-mediumgray mt-2">The square root of {currentProblem.number} is {Math.sqrt(currentProblem.number).toFixed(3)}</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href={`/module/squares/challenge`}>
                <Button>Start Challenge</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
