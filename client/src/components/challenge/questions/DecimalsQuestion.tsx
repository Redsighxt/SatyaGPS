import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { shuffle } from 'lodash';

interface DecimalsQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const generateProblem = () => {
    const denominator = Math.random() > 0.5 ? 10 : 100;
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    const answer = parseFloat((numerator / denominator).toFixed(2));
    
    const questionText = `What is ${numerator}/${denominator} as a decimal?`;

    return { questionText, answer };
};

export default function DecimalsQuestion({ onAnswer, difficulty }: DecimalsQuestionProps) {
  const [problem, setProblem] = useState(generateProblem());
  const [options, setOptions] = useState<number[]>([]);

  const setupProblem = () => {
    const newProblem = generateProblem();
    setProblem(newProblem);

    const otherOptions = [newProblem.answer];
    while (otherOptions.length < 4) {
      const randomDenominator = Math.random() > 0.5 ? 10 : 100;
      const randomNumerator = Math.floor(Math.random() * (randomDenominator - 1)) + 1;
      const randomOption = parseFloat((randomNumerator / randomDenominator).toFixed(2));
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
      <h3 className="text-2xl font-bold mb-4">{problem.questionText}</h3>
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