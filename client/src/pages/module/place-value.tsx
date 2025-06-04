import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { Link } from 'wouter';
import { PlaceValueBlocks } from '@/components/learning/PlaceValueBlocks';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';

export default function PlaceValue() {
  const [targetNumber, setTargetNumber] = useState(146);
  const [userValue, setUserValue] = useState({ hundreds: 0, tens: 0, ones: 0 });
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [startTime] = useState(Date.now());
  
  const { updateProgress } = useProgress();

  const getUserTotal = () => {
    return userValue.hundreds * 100 + userValue.tens * 10 + userValue.ones;
  };

  const checkAnswer = () => {
    const correct = getUserTotal() === targetNumber;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 20);
      setTimeout(() => {
        generateNewProblem();
      }, 2000);
    }
  };

  const generateNewProblem = () => {
    const hundreds = Math.floor(Math.random() * 9) + 1;
    const tens = Math.floor(Math.random() * 10);
    const ones = Math.floor(Math.random() * 10);
    
    setTargetNumber(hundreds * 100 + tens * 10 + ones);
    setUserValue({ hundreds: 0, tens: 0, ones: 0 });
    setIsCorrect(null);
    setProblemsCompleted(prev => prev + 1);
  };

  const handlePlaceValueChange = (place: 'hundreds' | 'tens' | 'ones', value: number) => {
    setUserValue(prev => ({ ...prev, [place]: value }));
    setIsCorrect(null);
  };

  const resetModule = () => {
    setTargetNumber(146);
    setUserValue({ hundreds: 0, tens: 0, ones: 0 });
    setIsCorrect(null);
    setScore(0);
    setProblemsCompleted(0);
  };

  useEffect(() => {
    if (problemsCompleted >= 5) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      updateProgress('place-value', score, timeSpent, true);
    }
  }, [problemsCompleted, score, startTime, updateProgress]);

  const getDigits = (number: number) => {
    const hundreds = Math.floor(number / 100);
    const tens = Math.floor((number % 100) / 10);
    const ones = number % 10;
    return { hundreds, tens, ones };
  };

  const targetDigits = getDigits(targetNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise via-teal-400 to-green-400">
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
            <h1 className="text-2xl font-fredoka text-darkgray">Number Building</h1>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-xl font-bold text-turquoise">{score}</div>
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
                  Build This Number!
                </h2>
                <motion.div 
                  className="text-6xl font-bold text-darkgray bg-lightyellow rounded-2xl p-6 inline-block"
                  key={targetNumber}
                  initial={{ scale: 1.2, color: "hsl(var(--turquoise))" }}
                  animate={{ scale: 1, color: "hsl(var(--darkgray))" }}
                  transition={{ duration: 0.5 }}
                >
                  {targetNumber}
                </motion.div>
                <p className="text-lg text-mediumgray mt-4">
                  Use the blocks below to build this number!
                </p>
              </div>

              {/* Place Value Blocks */}
              <PlaceValueBlocks
                hundreds={userValue.hundreds}
                tens={userValue.tens}
                ones={userValue.ones}
                onValueChange={handlePlaceValueChange}
              />

              {/* Current Value Display */}
              <div className="bg-lightyellow rounded-xl p-6 text-center mt-8">
                <h4 className="text-2xl font-fredoka text-darkgray mb-4">Your Number</h4>
                <motion.div 
                  className="text-4xl font-bold text-darkgray mb-4"
                  animate={{
                    color: getUserTotal() === targetNumber ? "hsl(var(--mint))" : "hsl(var(--darkgray))"
                  }}
                >
                  {getUserTotal()}
                </motion.div>
                <p className="text-lg text-mediumgray mb-4">
                  {userValue.hundreds} Hundred{userValue.hundreds !== 1 ? 's' : ''} + {userValue.tens} Ten{userValue.tens !== 1 ? 's' : ''} + {userValue.ones} One{userValue.ones !== 1 ? 's' : ''} = {getUserTotal()}
                </p>
                
                <Button 
                  onClick={checkAnswer}
                  disabled={getUserTotal() === 0}
                  className="bg-turquoise hover:bg-teal-500"
                >
                  Check Answer
                </Button>
              </div>

              {/* Hint Section */}
              <div className="bg-gray-50 rounded-xl p-6 mt-6">
                <h4 className="text-lg font-fredoka text-darkgray mb-4 text-center">Hint</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-coral">{targetDigits.hundreds}</div>
                    <div className="text-sm text-mediumgray">Hundreds</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-turquoise">{targetDigits.tens}</div>
                    <div className="text-sm text-mediumgray">Tens</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-mint">{targetDigits.ones}</div>
                    <div className="text-sm text-mediumgray">Ones</div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              {isCorrect !== null && (
                <motion.div
                  className={`text-center p-4 rounded-2xl mt-6 ${
                    isCorrect ? 'bg-mint text-white' : 'bg-red-400 text-white'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-xl font-bold">Perfect! You built the number correctly!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl font-bold">
                          Not quite right. You have {getUserTotal()}, but you need {targetNumber}
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Progress */}
              <div className="mt-8 text-center">
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-turquoise h-3 rounded-full"
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
            <div className="text-6xl mb-4">🏗️</div>
            <h2 className="text-3xl font-fredoka text-darkgray mb-4">
              Amazing Building Skills!
            </h2>
            <p className="text-xl text-mediumgray mb-6">
              You've mastered place value with a score of {score} points!
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <Button size="lg">
                  Back to Home
                </Button>
              </Link>
              <Button onClick={resetModule} variant="outline" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Build Again
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
