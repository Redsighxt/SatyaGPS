import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PlaceValueBlocks from "@/components/interactive/place-value-blocks";
import { ArrowLeft, RotateCcw, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlaceValue() {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 900) + 100);
  const [userNumber, setUserNumber] = useState({ hundreds: 0, tens: 0, ones: 0 });
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const userTotal = userNumber.hundreds * 100 + userNumber.tens * 10 + userNumber.ones;

  const checkAnswer = () => {
    setAttempts(prev => prev + 1);
    const correct = userTotal === targetNumber;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 100);
      setTimeout(() => {
        generateNewProblem();
      }, 2000);
    }
  };

  const generateNewProblem = () => {
    setTargetNumber(Math.floor(Math.random() * 900) + 100);
    setUserNumber({ hundreds: 0, tens: 0, ones: 0 });
    setIsCorrect(null);
    setAttempts(0);
  };

  const updateUserNumber = (place: 'hundreds' | 'tens' | 'ones', value: number) => {
    setUserNumber(prev => ({ ...prev, [place]: Math.max(0, Math.min(9, value)) }));
  };

  const targetBreakdown = {
    hundreds: Math.floor(targetNumber / 100),
    tens: Math.floor((targetNumber % 100) / 10),
    ones: targetNumber % 10
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="bg-lightyellow px-4 py-2 rounded-full">
              <span className="font-semibold text-darkgray">Score: {score}</span>
            </div>
            <div className="bg-turquoise px-4 py-2 rounded-full">
              <span className="font-semibold text-white">Attempts: {attempts}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-fredoka text-white mb-4">
            Number Building
          </h1>
          <p className="text-xl text-white">
            Build numbers with hundreds, tens, and ones blocks!
          </p>
        </motion.div>

        {/* Target Number Challenge */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-fredoka flex items-center space-x-2">
              <Target className="text-coral" />
              <span>Build This Number!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <motion.div 
                className="text-8xl font-bold text-coral"
                key={targetNumber}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {targetNumber}
              </motion.div>
              
              <div className="text-lg text-mediumgray">
                {targetBreakdown.hundreds} hundreds + {targetBreakdown.tens} tens + {targetBreakdown.ones} ones
              </div>

              <div className="flex items-center justify-center space-x-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-darkgray">{userTotal}</div>
                  <div className="text-sm text-mediumgray">Your Number</div>
                </div>
                
                {isCorrect === null && userTotal > 0 && (
                  <Button
                    onClick={checkAnswer}
                    size="lg"
                    className="bg-turquoise hover:bg-teal-500"
                  >
                    Check Answer
                  </Button>
                )}
                
                <Button
                  onClick={generateNewProblem}
                  size="lg"
                  variant="outline"
                >
                  <RotateCcw size={20} className="mr-2" />
                  New Problem
                </Button>
              </div>

              {isCorrect === true && (
                <motion.div 
                  className="text-3xl font-bold text-mint flex items-center justify-center space-x-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Trophy size={32} />
                  <span>Perfect! You built the number correctly!</span>
                </motion.div>
              )}
              
              {isCorrect === false && (
                <motion.div 
                  className="text-2xl font-bold text-coral"
                  initial={{ x: -10 }}
                  animate={{ x: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  Not quite! Try adjusting your blocks.
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Place Value Builder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-fredoka">Build Your Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Hundreds */}
              <div className="text-center">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-fredoka text-darkgray">Hundreds</h4>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateUserNumber('hundreds', userNumber.hundreds - 1)}
                      disabled={userNumber.hundreds <= 0}
                    >
                      -
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateUserNumber('hundreds', userNumber.hundreds + 1)}
                      disabled={userNumber.hundreds >= 9}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-coral to-red-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center">
                  {Array.from({ length: userNumber.hundreds }, (_, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 bg-coral bg-opacity-80 rounded border-2 border-white grid grid-cols-3 gap-0.5 p-1"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      {Array.from({ length: 9 }, (_, j) => (
                        <div key={j} className="bg-white rounded-sm"></div>
                      ))}
                    </motion.div>
                  ))}
                </div>
                <div className="text-2xl font-bold text-coral mt-2">{userNumber.hundreds}</div>
              </div>
              
              {/* Tens */}
              <div className="text-center">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-fredoka text-darkgray">Tens</h4>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateUserNumber('tens', userNumber.tens - 1)}
                      disabled={userNumber.tens <= 0}
                    >
                      -
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateUserNumber('tens', userNumber.tens + 1)}
                      disabled={userNumber.tens >= 9}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-turquoise to-teal-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center">
                  {Array.from({ length: userNumber.tens }, (_, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-3 bg-turquoise bg-opacity-80 rounded border border-white"
                      initial={{ scale: 0, x: -20 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
                <div className="text-2xl font-bold text-turquoise mt-2">{userNumber.tens}</div>
              </div>
              
              {/* Ones */}
              <div className="text-center">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-fredoka text-darkgray">Ones</h4>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateUserNumber('ones', userNumber.ones - 1)}
                      disabled={userNumber.ones <= 0}
                    >
                      -
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateUserNumber('ones', userNumber.ones + 1)}
                      disabled={userNumber.ones >= 9}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-mint to-green-400 rounded-xl p-4 min-h-32 flex flex-wrap gap-1 justify-center">
                  {Array.from({ length: userNumber.ones }, (_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-mint bg-opacity-80 rounded border border-white"
                      initial={{ scale: 0, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    />
                  ))}
                </div>
                <div className="text-2xl font-bold text-mint mt-2">{userNumber.ones}</div>
              </div>
            </div>

            {/* Result Display */}
            <motion.div 
              className="bg-lightyellow rounded-xl p-6 text-center"
              key={userTotal}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-2xl font-fredoka text-darkgray mb-4">Your Number</h4>
              <motion.div 
                className="text-6xl font-bold text-darkgray mb-4"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {userTotal}
              </motion.div>
              <p className="text-lg text-mediumgray">
                {userNumber.hundreds} Hundred{userNumber.hundreds !== 1 ? 's' : ''} + {userNumber.tens} Ten{userNumber.tens !== 1 ? 's' : ''} + {userNumber.ones} One{userNumber.ones !== 1 ? 's' : ''} = {userTotal}
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Free Play Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="font-fredoka">Free Play Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <PlaceValueBlocks />
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
