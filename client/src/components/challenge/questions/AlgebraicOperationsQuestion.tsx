import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { shuffle } from 'lodash';

interface AlgebraicOperationsQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function AlgebraicOperationsQuestion({ onAnswer, difficulty }: AlgebraicOperationsQuestionProps) {
  const [problem, setProblem] = useState<{
    question: string;
    answer: number;
    options: number[];
  } | null>(null);

  useEffect(() => {
    generateProblem();
  }, [difficulty]);

  const generateProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    if (operation === '+') {
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * 9) + 1;
      answer = num1 + num2;
    } else if (operation === '-') {
      num1 = Math.floor(Math.random() * 10) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    } else { // operation === '*'
      num1 = Math.floor(Math.random() * 5) + 2;
      num2 = Math.floor(Math.random() * 5) + 2;
      answer = num1 * num2;
    }
    
    const question = `${num1} ${operation} ${num2}`;
    const options = generateOptions(answer);

    setProblem({ question, answer, options });
  };

  const generateOptions = (correctAnswer: number) => {
    const options = new Set<number>();
    options.add(correctAnswer);
    while (options.size < 4) {
      const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
      if (wrongAnswer !== correctAnswer) {
        options.add(wrongAnswer);
      }
    }
    return shuffle(Array.from(options));
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">What's the answer?</h3>
      <div className="text-5xl font-bold text-gray-700 mb-6">
        {problem.question}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {problem.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option === problem.answer)}
            className="h-20 text-2xl"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
} 