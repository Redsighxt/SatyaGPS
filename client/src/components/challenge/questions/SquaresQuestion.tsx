import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { shuffle } from 'lodash';

interface SquaresQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const generateProblem = () => {
    const number = Math.floor(Math.random() * 12) + 1; // 1 to 12
    const answer = number * number;
    return { number, answer };
};

export default function SquaresQuestion({ onAnswer, difficulty }: SquaresQuestionProps) {
  const [problem, setProblem] = useState(generateProblem());
  const [options, setOptions] = useState<number[]>([]);

  const setupProblem = () => {
    const newProblem = generateProblem();
    setProblem(newProblem);

    const otherOptions = [newProblem.answer];
    while (otherOptions.length < 4) {
      const randomBase = Math.floor(Math.random() * 12) + 1;
      const randomOption = randomBase * randomBase;
      if (!otherOptions.includes(randomOption)) {
        otherOptions.push(randomOption);
      }
    }
    setOptions(shuffle(otherOptions));
  };

  useEffect(() => {
    setupProblem();
  }, []);

  const handleAnswer = (selectedAnswer: number) => {
    onAnswer(selectedAnswer === problem.answer);
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">What is {problem.number}²?</h3>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {options.map((option, index) => (
          <Button key={index} onClick={() => handleAnswer(option)} className="h-20 text-xl">
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
} 