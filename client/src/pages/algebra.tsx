import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DragDropMath from "@/components/interactive/drag-drop-math";
import { useUpdateProgress } from "@/hooks/use-progress";
import { generateRandomProblem, calculateScore } from "@/lib/math-utils";
import { ArrowLeft, Check, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Algebra() {
  const [currentProblem, setCurrentProblem] = useState(generateRandomProblem('addition', 'easy'));
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [problemType, setProblemType] = useState<'addition' | 'subtraction' | 'multiplication' | 'division'>('addition');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  
  const updateProgressMutation = useUpdateProgress();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkAnswer = () => {
    const answer = parseInt(userAnswer);
    const correct = answer === currentProblem.answer;
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);

    if (correct) {
      const newScore = calculateScore(timeSpent, attempts + 1);
      setScore(prev => prev + newScore);
      
      // Update progress
      updateProgressMutation.mutate({
        studentId: 1,
        moduleId: 'algebra',
        score: newScore,
        timeSpent: timeSpent
      });

      // Generate new problem after delay
      setTimeout(() => {
        setCurrentProblem(generateRandomProblem(problemType, difficulty));
        setUserAnswer('');
        setIsCorrect(null);
        setTimeSpent(0);
        setAttempts(0);
      }, 2000);
    }
  };

  const resetProblem = () => {
    setCurrentProblem(generateRandomProblem(problemType, difficulty));
    setUserAnswer('');
    setIsCorrect(null);
    setAttempts(0);
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
            <div className="bg-coral px-4 py-2 rounded-full">
              <span className="font-semibold text-white">Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
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
            Number Magic
          </h1>
          <p className="text-xl text-white">
            Master algebraic operations with interactive learning!
          </p>
        </motion.div>

        {/* Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-fredoka">Problem Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-darkgray mb-2">
                  Operation Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['addition', 'subtraction', 'multiplication', 'division'] as const).map((type) => (
                    <Button
                      key={type}
                      variant={problemType === type ? "default" : "outline"}
                      onClick={() => {
                        setProblemType(type);
                        setCurrentProblem(generateRandomProblem(type, difficulty));
                        setUserAnswer('');
                        setIsCorrect(null);
                      }}
                      className="capitalize"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-darkgray mb-2">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <Button
                      key={level}
                      variant={difficulty === level ? "default" : "outline"}
                      onClick={() => {
                        setDifficulty(level);
                        setCurrentProblem(generateRandomProblem(problemType, level));
                        setUserAnswer('');
                        setIsCorrect(null);
                      }}
                      className="capitalize"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-fredoka">Drag and Drop Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <DragDropMath />
          </CardContent>
        </Card>

        {/* Problem Solving */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-fredoka">Solve the Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <motion.div 
                className="text-6xl font-bold text-darkgray"
                key={currentProblem.question}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {currentProblem.question} = ?
              </motion.div>
              
              <div className="flex items-center justify-center space-x-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-32 h-16 text-3xl text-center border-2 border-gray-300 rounded-lg focus:border-coral focus:outline-none"
                  placeholder="?"
                  disabled={isCorrect === true}
                />
                
                {isCorrect === null && (
                  <Button
                    onClick={checkAnswer}
                    disabled={!userAnswer}
                    size="lg"
                    className="bg-coral hover:bg-red-500"
                  >
                    <Check size={20} />
                  </Button>
                )}
                
                {isCorrect !== null && (
                  <Button
                    onClick={resetProblem}
                    size="lg"
                    variant="outline"
                  >
                    <RotateCcw size={20} />
                  </Button>
                )}
              </div>
              
              {isCorrect === true && (
                <motion.div 
                  className="text-3xl font-bold text-mint flex items-center justify-center space-x-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Trophy size={32} />
                  <span>Correct! Great job!</span>
                </motion.div>
              )}
              
              {isCorrect === false && (
                <motion.div 
                  className="text-2xl font-bold text-coral"
                  initial={{ x: -10 }}
                  animate={{ x: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  Try again! You can do it!
                </motion.div>
              )}
              
              {attempts > 0 && (
                <div className="text-sm text-mediumgray">
                  Attempts: {attempts}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
