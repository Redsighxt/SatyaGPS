import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { shuffle } from 'lodash';

interface LcmHcfQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
};

const generateProblem = () => {
    const n1 = Math.floor(Math.random() * 10) + 2;
    const n2 = Math.floor(Math.random() * 10) + 2;
    const isLcm = Math.random() > 0.5;
    const answer = isLcm ? lcm(n1, n2) : gcd(n1, n2);
    const questionText = `What is the ${isLcm ? 'LCM' : 'HCF'} of ${n1} and ${n2}?`;
    
    return { questionText, answer };
};

export default function LcmHcfQuestion({ onAnswer, difficulty }: LcmHcfQuestionProps) {
  const [problem, setProblem] = useState(generateProblem());
  const [options, setOptions] = useState<number[]>([]);

  const setupProblem = () => {
    const newProblem = generateProblem();
    setProblem(newProblem);

    const otherOptions = [newProblem.answer];
    while (otherOptions.length < 4) {
      const randomN1 = Math.floor(Math.random() * 10) + 2;
      const randomN2 = Math.floor(Math.random() * 10) + 2;
      const randomIsLcm = Math.random() > 0.5;
      const randomOption = randomIsLcm ? lcm(randomN1, randomN2) : gcd(randomN1, randomN2);

      if (!otherOptions.includes(randomOption)) {
        otherOptions.push(randomOption);
      }
    }
    setOptions(shuffle(otherOptions));
  };

  useEffect(() => {
    setupProblem();
  }, [difficulty]);

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