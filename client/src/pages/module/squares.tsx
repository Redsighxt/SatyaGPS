import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { Link } from 'wouter';
import { SquareGrid } from '@/components/learning/SquareGrid';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';

export default function Squares() {
  const [currentProblem, setCurrentProblem] = useState({ number: 3, type: 'square' as 'square' | 'root' });
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [startTime] = useState(Date.now());
  const [showGridAnimation, setShowGridAnimation] = useState(false);
  
  const { updateProgress } = useProgress();

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
      updateProgress('squares', score, timeSpent, true);
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
    <div className="min-h-screen bg-gradient-to-br from-plum via-purple-400 to-indigo-400">
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
            <h1 className="text-2xl font-fredoka text-darkgray">Square World</h1>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-xl font-bold text-plum">{score}</div>
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
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-fredoka text-darkgray mb-4">
                  {currentProblem.type === 'square' 
                    ? `What is ${currentProblem.number} squared?`
                    : `What is the square root of ${currentProblem.number}?`
                  }
                </h2>
                <div className="bg-lightyellow rounded-2xl p-6 mb-6">
                  <div className="text-4xl font-bold text-darkgray">
                    {currentProblem.type === 'square' 
                      ? `${currentProblem.number}² = ?`
                      : `√${currentProblem.number} = ?`
                    }
                  </div>
                </div>
                <p className="text-lg text-mediumgray">
                  {currentProblem.type === 'square' 
                    ? 'A square means multiplying a number by itself'
                    : 'Square root means finding which number multiplied by itself gives this result'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Visual Grid */}
                <div className="space-y-6">
                  <h3 className="text-xl font-fredoka text-darkgray text-center">
                    Visual Representation
                  </h3>
                  
                  <div className="flex justify-center">
                    <SquareGrid 
                      size={currentProblem.type === 'square' ? currentProblem.number : Math.sqrt(currentProblem.number)}
                      interactive={false}
                      showAnimation={showGridAnimation}
                    />
                  </div>

                  {/* Pattern Explanation */}
                  <div className="bg-lightyellow rounded-xl p-4">
                    <h4 className="font-semibold text-darkgray mb-2">Pattern:</h4>
                    {currentProblem.type === 'square' ? (
                      <div className="space-y-2">
                        <p className="text-mediumgray">
                          {currentProblem.number} × {currentProblem.number} = {currentProblem.number}²
                        </p>
                        <p className="text-mediumgray">
                          This creates a {currentProblem.number} × {currentProblem.number} square grid
                        </p>
                        <p className="text-mediumgray">
                          Total squares = {currentProblem.number * currentProblem.number}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-mediumgray">
                          We need to find which number × itself = {currentProblem.number}
                        </p>
                        <p className="text-mediumgray">
                          {Math.sqrt(currentProblem.number)} × {Math.sqrt(currentProblem.number)} = {currentProblem.number}
                        </p>
                        <p className="text-mediumgray">
                          So √{currentProblem.number} = {Math.sqrt(currentProblem.number)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Answer Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-fredoka text-darkgray text-center">
                    Choose Your Answer
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {generateAnswerOptions().map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => checkAnswer(answer)}
                        disabled={userAnswer !== null}
                        className="h-16 bg-plum text-white font-bold text-xl rounded-2xl hover:bg-purple-500 transition-colors disabled:opacity-50"
                      >
                        {answer}
                      </button>
                    ))}
                  </div>

                  {userAnswer !== null && (
                    <motion.div
                      className="text-center p-4 bg-lightyellow rounded-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-2xl font-bold text-darkgray">
                        Your Answer: {userAnswer}
                      </div>
                    </motion.div>
                  )}

                  {/* Interactive Grid Builder */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-darkgray mb-4 text-center">
                      Try Building It!
                    </h4>
                    <div className="flex justify-center">
                      <SquareGrid 
                        size={currentProblem.type === 'square' ? currentProblem.number : Math.sqrt(currentProblem.number)}
                        interactive={true}
                        onComplete={(size) => checkAnswer(size * size)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Sequence Helper */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-fredoka text-darkgray text-center mb-4">
                  Square Number Sequence
                </h4>
                <div className="flex justify-center flex-wrap gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <motion.div
                      key={num}
                      className={`text-center p-3 rounded-xl ${
                        (currentProblem.type === 'square' && num === currentProblem.number) ||
                        (currentProblem.type === 'root' && num * num === currentProblem.number)
                          ? 'bg-plum text-white' 
                          : 'bg-white border-2 border-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="font-bold">{num}²</div>
                      <div className="text-sm">{num * num}</div>
                    </motion.div>
                  ))}
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
                        <span className="text-xl font-bold">
                          Perfect! {currentProblem.type === 'square' 
                            ? `${currentProblem.number}² = ${correctAnswer}`
                            : `√${currentProblem.number} = ${correctAnswer}`
                          }
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl font-bold">
                          Try again! The answer is {correctAnswer}
                        </span>
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
                    className="bg-plum h-3 rounded-full"
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
            <div className="text-6xl mb-4">🟩</div>
            <h2 className="text-3xl font-fredoka text-darkgray mb-4">
              You're a Square Master!
            </h2>
            <p className="text-xl text-mediumgray mb-6">
              You've conquered squares and square roots with a score of {score} points!
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <Button size="lg">
                  Back to Home
                </Button>
              </Link>
              <Button onClick={resetModule} variant="outline" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Square Again
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
