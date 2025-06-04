import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { Link } from 'wouter';
import { DragDropNumber } from '@/components/learning/DragDropNumber';
import { NumberLine } from '@/components/learning/NumberLine';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';

export default function AlgebraicOperations() {
  const [currentProblem, setCurrentProblem] = useState({ num1: 3, num2: 4, operation: '+' });
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [startTime] = useState(Date.now());
  
  const { updateProgress } = useProgress();

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
      updateProgress('algebraic-operations', score, timeSpent, true);
    }
  }, [problemsCompleted, score, startTime, updateProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-red-400 to-pink-400">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-fredoka text-darkgray">Number Magic</h1>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-xl font-bold text-coral">{score}</div>
                <div className="text-sm text-mediumgray">Score</div>
              </div>
              <Button onClick={resetModule} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {problemsCompleted < 5 ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-fredoka text-darkgray mb-4">
                  Solve This Problem!
                </h2>
                <div className="bg-lightyellow rounded-2xl p-6 mb-6">
                  <div className="text-6xl font-bold text-darkgray">
                    {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
                  </div>
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Drag and Drop */}
                <div className="space-y-6">
                  <h3 className="text-xl font-fredoka text-darkgray text-center">
                    Drag Numbers to Answer
                  </h3>
                  
                  <div className="flex justify-center items-center space-x-4 mb-6">
                    <DragDropNumber value={currentProblem.num1} color="coral" />
                    <div className="text-4xl font-bold text-darkgray">{currentProblem.operation}</div>
                    <DragDropNumber value={currentProblem.num2} color="turquoise" />
                    <div className="text-4xl font-bold text-darkgray">=</div>
                    {userAnswer !== null ? (
                      <motion.div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ${
                          isCorrect ? 'bg-mint' : 'bg-red-400'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {userAnswer}
                      </motion.div>
                    ) : (
                      <div className="w-16 h-16 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
                        <span className="text-gray-400">?</span>
                      </div>
                    )}
                  </div>

                  {/* Answer Options */}
                  <div className="grid grid-cols-3 gap-4">
                    {[correctAnswer - 1, correctAnswer, correctAnswer + 1].sort(() => Math.random() - 0.5).map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => checkAnswer(answer)}
                        disabled={userAnswer !== null}
                        className="w-full h-16 bg-mint text-white font-bold text-xl rounded-2xl hover:bg-green-500 transition-colors disabled:opacity-50"
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="space-y-6">
                  <h3 className="text-xl font-fredoka text-darkgray text-center">
                    See It Visually
                  </h3>
                  
                  {currentProblem.operation === '+' && (
                    <div className="bg-lightyellow rounded-xl p-4">
                      <div className="grid grid-cols-10 gap-1">
                        {Array(currentProblem.num1 + currentProblem.num2).fill(null).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-6 h-6 rounded-full shadow-md ${
                              i < currentProblem.num1 ? 'bg-coral' : 'bg-turquoise'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {currentProblem.operation === '-' && (
                    <div className="bg-lightyellow rounded-xl p-4">
                      <div className="grid grid-cols-10 gap-1">
                        {Array(currentProblem.num1).fill(null).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-6 h-6 rounded-full shadow-md ${
                              i < correctAnswer ? 'bg-mint' : 'bg-gray-300'
                            }`}
                            initial={{ scale: 1 }}
                            animate={{ 
                              scale: i < correctAnswer ? 1 : 0,
                              opacity: i < correctAnswer ? 1 : 0.3 
                            }}
                            transition={{ delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <NumberLine 
                    min={0} 
                    max={Math.max(20, correctAnswer + 5)} 
                    currentValue={userAnswer || undefined}
                    onValueChange={checkAnswer}
                  />
                </div>
              </div>

              {/* Feedback */}
              {isCorrect !== null && (
                <motion.div
                  className={`text-center p-4 rounded-2xl ${
                    isCorrect ? 'bg-mint text-white' : 'bg-red-400 text-white'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-xl font-bold">Great job! You got it right!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl font-bold">Try again! The answer is {correctAnswer}</span>
                        <Button onClick={generateNewProblem} className="ml-4">
                          Next Problem
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Progress */}
              <div className="mt-8 text-center">
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-coral h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(problemsCompleted / 5) * 100}%` }}
                  />
                </div>
                <p className="text-mediumgray">
                  Problem {problemsCompleted} of 5 completed
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <motion.div
            className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-2xl text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-fredoka text-darkgray mb-4">
              Congratulations!
            </h2>
            <p className="text-xl text-mediumgray mb-6">
              You've completed the Number Magic module with a score of {score} points!
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <Button size="lg">
                  Back to Home
                </Button>
              </Link>
              <Button onClick={resetModule} variant="outline" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Play Again
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
