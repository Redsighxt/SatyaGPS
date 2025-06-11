import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function DecimalsModule() {
  const [problem, setProblem] = useState({ num1: 1.25, num2: 2.5, answer: 3.75 });
  const [userAnswer, setUserAnswer] = useState('');

  const isCorrect = parseFloat(userAnswer) === problem.answer;

  const generateProblem = () => {
    const num1 = parseFloat((Math.random() * 5).toFixed(2));
    const num2 = parseFloat((Math.random() * 5).toFixed(2));
    setProblem({ num1, num2, answer: parseFloat((num1 + num2).toFixed(2)) });
    setUserAnswer('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 p-8">
      <Link href="/">
        <Button variant="secondary" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Decimal Dash</h1>
        <p className="text-gray-600 mb-8">Add the decimal numbers!</p>
        
        <div className="text-5xl font-bold text-gray-700 mb-6">
          {problem.num1} + {problem.num2}
        </div>

        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-48 h-16 text-3xl text-center border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          placeholder="Answer"
        />

        {userAnswer && (
          <motion.div
            className={`text-2xl font-bold p-4 rounded-lg mt-6 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {isCorrect ? 'Correct! Awesome!' : 'Keep trying!'}
          </motion.div>
        )}
        
        <Button onClick={generateProblem} className="mt-8">New Problem</Button>
        <Link href={`/module/decimals/challenge`}>
          <Button className="mt-8 ml-4">Start Challenge</Button>
        </Link>
      </div>
    </div>
  );
} 