import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { shuffle } from 'lodash';

interface FractionsQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const FractionVisual = ({ numerator, denominator }: { numerator: number; denominator: number }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold mb-2">{numerator}/{denominator}</div>
      <div className="w-48 h-12 bg-gray-200 rounded-lg flex">
        {Array.from({ length: denominator }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-full border-r-2 border-gray-300 last:border-r-0 ${i < numerator ? 'bg-coral' : ''}`}
            style={{ width: `${100 / denominator}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default function FractionsQuestion({ onAnswer }: FractionsQuestionProps) {
  const [problem, setProblem] = useState<{
    n1: number;
    d1: number;
    n2: number;
    d2: number;
    answer: number;
    options: number[];
  } | null>(null);

  useEffect(() => {
    generateProblem();
  }, []);

  const generateProblem = () => {
    const d = Math.floor(Math.random() * 5) + 4; // 4 to 8
    let n1 = Math.floor(Math.random() * (d - 1)) + 1;
    let n2 = Math.floor(Math.random() * (d - 1)) + 1;
    while (n1 === n2) {
      n2 = Math.floor(Math.random() * (d - 1)) + 1;
    }

    const val1 = n1 / d;
    const val2 = n2 / d;
    const correctAnswer = val1 > val2 ? n1 : n2;

    const options = shuffle([
      correctAnswer,
      n1 === correctAnswer ? n2 : n1,
    ]);

    setProblem({ n1, d1: d, n2, d2: d, answer: correctAnswer, options });
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">Which fraction is bigger?</h3>
      <div className="flex justify-around items-center mb-8">
        <FractionVisual numerator={problem.n1} denominator={problem.d1} />
        <div className="text-4xl font-bold text-gray-400">OR</div>
        <FractionVisual numerator={problem.n2} denominator={problem.d2} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {problem.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option === problem.answer)}
            className="h-20 text-2xl"
          >
            {option}/{problem.d1}
          </Button>
        ))}
      </div>
    </div>
  );
} 