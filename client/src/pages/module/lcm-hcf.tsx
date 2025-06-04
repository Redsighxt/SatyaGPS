import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { Link } from 'wouter';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';

export default function LcmHcf() {
  const [currentProblem, setCurrentProblem] = useState({ num1: 6, num2: 9, type: 'HCF' as 'HCF' | 'LCM' });
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [startTime] = useState(Date.now());
  
  const { updateProgress } = useProgress();

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
      updateProgress('lcm-hcf', score, timeSpent, true);
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
            <h1 className="text-2xl font-fredoka text-darkgray">Number Families</h1>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-xl font-bold text-skyblue">{score}</div>
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
                  Find the {currentProblem.type === 'HCF' ? 'Highest Common Factor' : 'Lowest Common Multiple'}
                </h2>
                <div className="bg-lightyellow rounded-2xl p-6 mb-6">
                  <div className="text-4xl font-bold text-darkgray">
                    {currentProblem.type} of {currentProblem.num1} and {currentProblem.num2}
                  </div>
                </div>
                <p className="text-lg text-mediumgray">
                  {currentProblem.type === 'HCF' 
                    ? 'Find the largest number that divides both numbers equally'
                    : 'Find the smallest number that both numbers can divide into equally'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Visual Representation */}
                <div className="space-y-6">
                  <h3 className="text-xl font-fredoka text-darkgray text-center">
                    {currentProblem.type === 'HCF' ? 'Common Factors' : 'Common Multiples'}
                  </h3>
                  
                  {currentProblem.type === 'HCF' ? (
                    <div className="space-y-4">
                      <div className="bg-coral bg-opacity-20 rounded-xl p-4">
                        <h4 className="font-semibold text-darkgray mb-2">Factors of {currentProblem.num1}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {factors1.map(factor => (
                            <motion.div
                              key={factor}
                              className={`px-3 py-1 rounded-full text-white font-semibold ${
                                commonFactors.includes(factor) ? 'bg-coral' : 'bg-gray-400'
                              }`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: factors1.indexOf(factor) * 0.1 }}
                            >
                              {factor}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-skyblue bg-opacity-20 rounded-xl p-4">
                        <h4 className="font-semibold text-darkgray mb-2">Factors of {currentProblem.num2}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {factors2.map(factor => (
                            <motion.div
                              key={factor}
                              className={`px-3 py-1 rounded-full text-white font-semibold ${
                                commonFactors.includes(factor) ? 'bg-skyblue' : 'bg-gray-400'
                              }`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: factors2.indexOf(factor) * 0.1 }}
                            >
                              {factor}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-mint bg-opacity-20 rounded-xl p-4">
                        <h4 className="font-semibold text-darkgray mb-2">Common Factors:</h4>
                        <div className="flex flex-wrap gap-2">
                          {commonFactors.map(factor => (
                            <motion.div
                              key={factor}
                              className="px-3 py-1 rounded-full bg-mint text-white font-semibold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: commonFactors.indexOf(factor) * 0.2 }}
                            >
                              {factor}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-coral bg-opacity-20 rounded-xl p-4">
                        <h4 className="font-semibold text-darkgray mb-2">Multiples of {currentProblem.num1}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {multiples1.slice(0, 8).map(multiple => (
                            <motion.div
                              key={multiple}
                              className={`px-3 py-1 rounded-full text-white font-semibold ${
                                commonMultiples.includes(multiple) ? 'bg-coral' : 'bg-gray-400'
                              }`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: multiples1.indexOf(multiple) * 0.1 }}
                            >
                              {multiple}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-skyblue bg-opacity-20 rounded-xl p-4">
                        <h4 className="font-semibold text-darkgray mb-2">Multiples of {currentProblem.num2}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {multiples2.slice(0, 8).map(multiple => (
                            <motion.div
                              key={multiple}
                              className={`px-3 py-1 rounded-full text-white font-semibold ${
                                commonMultiples.includes(multiple) ? 'bg-skyblue' : 'bg-gray-400'
                              }`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: multiples2.indexOf(multiple) * 0.1 }}
                            >
                              {multiple}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-mint bg-opacity-20 rounded-xl p-4">
                        <h4 className="font-semibold text-darkgray mb-2">Common Multiples:</h4>
                        <div className="flex flex-wrap gap-2">
                          {commonMultiples.slice(0, 5).map(multiple => (
                            <motion.div
                              key={multiple}
                              className="px-3 py-1 rounded-full bg-mint text-white font-semibold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: commonMultiples.indexOf(multiple) * 0.2 }}
                            >
                              {multiple}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Answer Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-fredoka text-darkgray text-center">
                    Choose Your Answer
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {currentProblem.type === 'HCF' 
                      ? commonFactors.concat([correctAnswer + 1, correctAnswer - 1])
                          .filter((val, index, arr) => arr.indexOf(val) === index && val > 0)
                          .sort(() => Math.random() - 0.5)
                          .slice(0, 4)
                          .map((answer, index) => (
                            <button
                              key={index}
                              onClick={() => checkAnswer(answer)}
                              disabled={userAnswer !== null}
                              className="h-16 bg-skyblue text-white font-bold text-xl rounded-2xl hover:bg-blue-500 transition-colors disabled:opacity-50"
                            >
                              {answer}
                            </button>
                          ))
                      : commonMultiples.slice(0, 4).map((answer, index) => (
                          <button
                            key={index}
                            onClick={() => checkAnswer(answer)}
                            disabled={userAnswer !== null}
                            className="h-16 bg-skyblue text-white font-bold text-xl rounded-2xl hover:bg-blue-500 transition-colors disabled:opacity-50"
                          >
                            {answer}
                          </button>
                        ))
                    }
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
                          Excellent! The {currentProblem.type} is {correctAnswer}!
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl font-bold">
                          Try again! The {currentProblem.type} is {correctAnswer}
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
                    className="bg-skyblue h-3 rounded-full"
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
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h2 className="text-3xl font-fredoka text-darkgray mb-4">
              You Found All the Number Families!
            </h2>
            <p className="text-xl text-mediumgray mb-6">
              You've mastered LCM and HCF with a score of {score} points!
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <Button size="lg">
                  Back to Home
                </Button>
              </Link>
              <Button onClick={resetModule} variant="outline" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Explore Again
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
