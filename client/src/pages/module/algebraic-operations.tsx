import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, RotateCcw, Play, Medal } from 'lucide-react';
import { Link } from 'wouter';
import { DragDropNumber } from '@/components/learning/DragDropNumber';
import NumberLine from '@/components/NumberLine';
import { useUpdateProgress, useAwardBadge } from '@/hooks/use-progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from "@/components/Header";
import DraggableNumber from "@/components/DraggableNumber";

export default function AlgebraicOperationsModule() {
  const [currentProblem, setCurrentProblem] = useState({ num1: 3, num2: 4, operation: '+' });
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [startTime] = useState(Date.now());
  
  const { mutate: updateProgress } = useUpdateProgress();
  const { mutate: awardBadge } = useAwardBadge();
  const { toast } = useToast();

  const correctAnswer = currentProblem.operation === '+' 
    ? currentProblem.num1 + currentProblem.num2
    : currentProblem.operation === '-'
    ? currentProblem.num1 - currentProblem.num2
    : currentProblem.operation === '*'
    ? currentProblem.num1 * currentProblem.num2
    : Math.floor(currentProblem.num1 / currentProblem.num2);

  const checkAnswer = (answer: number) => {
    const correct = answer === correctAnswer;
    setUserAnswer(answer);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 10);
      setTimeout(() => {
        generateNewProblem();
      }, 1500);
    }
  };

  const generateNewProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;
    
    if (operation === '+') {
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * 9) + 1;
    } else if (operation === '-') {
      num1 = Math.floor(Math.random() * 10) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
    } else {
      num1 = Math.floor(Math.random() * 5) + 2;
      num2 = Math.floor(Math.random() * 5) + 2;
    }
    
    setCurrentProblem({ num1, num2, operation });
    setUserAnswer(null);
    setIsCorrect(null);
    setProblemsCompleted(prev => prev + 1);
  };

  const resetModule = () => {
    setCurrentProblem({ num1: 3, num2: 4, operation: '+' });
    setUserAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setProblemsCompleted(0);
  };

  useEffect(() => {
    if (problemsCompleted >= 5) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      updateProgress({ studentId: 1, moduleId: 'algebraic-operations', score, timeSpent });
      awardBadge({ studentId: 1, badgeType: 'module', badgeName: 'Algebraic Operations Master' });
      toast({
        title: "Badge Unlocked!",
        description: "You earned the 'Algebraic Operations Master' badge!",
        action: <Medal className="text-yellow-500" />,
      });
    }
  }, [problemsCompleted, score, startTime, updateProgress, awardBadge, toast]);

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
                Number Magic
              </h1>
              <p className="text-white/90 text-lg">Learn addition, subtraction, multiplication and division!</p>
            </div>
            <div className="w-40" />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-fredoka text-darkgray text-center mb-8">
              Interactive Math Operations
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-xl font-fredoka text-darkgray text-center">
                  Drag and Drop Math
                </h4>
                <NumberLine value={correctAnswer} max={20} />
                
                <div className="flex justify-center items-center space-x-4">
                  <DraggableNumber 
                    value={currentProblem.num1} 
                    color="coral"
                    onChange={(value) => setCurrentProblem({ ...currentProblem, num1: value }) }
                  />
                  <select 
                    value={currentProblem.operation}
                    onChange={(e) => setCurrentProblem({ ...currentProblem, operation: e.target.value }) }
                    className="text-4xl font-bold text-darkgray bg-transparent border-0 focus:outline-none"
                  >
                    {['+', '-', '*'].map(op => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                  <DraggableNumber 
                    value={currentProblem.num2} 
                    color="turquoise"
                    onChange={(value) => setCurrentProblem({ ...currentProblem, num2: value }) }
                  />
                  <span className="text-4xl font-bold text-darkgray">=</span>
                  <div className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {correctAnswer.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-fredoka text-darkgray text-center">
                  Count with Objects
                </h4>
                <div className="bg-lightyellow rounded-xl p-4 min-h-32">
                  <div className="grid grid-cols-5 gap-2">
                    {Array(Math.floor(Math.abs(correctAnswer))).fill(0).map((_, i) => (
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
            <div className="text-center mt-8">
              <Link href={`/module/algebraic-operations/challenge`}>
                <Button>Start Challenge</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
