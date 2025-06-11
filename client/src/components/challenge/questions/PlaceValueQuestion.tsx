import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { shuffle } from 'lodash';

interface PlaceValueQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const generateProblem = () => {
    const number = Math.floor(Math.random() * 9000) + 1000; // 4-digit number
    const numberString = number.toString();
    const position = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    const digit = parseInt(numberString[position]);
    const placeValue = Math.pow(10, 3 - position);
    const answer = digit * placeValue;

    const questionText = `In the number ${number}, what is the value of the digit ${digit}?`;

    return { questionText, answer };
};

export default function PlaceValueQuestion({ onAnswer, difficulty }: PlaceValueQuestionProps) {
  const [problem, setProblem] = useState(generateProblem());
  const [options, setOptions] = useState<number[]>([]);

  const setupProblem = () => {
    const newProblem = generateProblem();
    setProblem(newProblem);

    const otherOptions = [newProblem.answer];
    while (otherOptions.length < 4) {
      const randomNumber = Math.floor(Math.random() * 4);
      const randomPlace = Math.pow(10, randomNumber);
      const randomDigit = Math.floor(Math.random() * 9) + 1;
      const randomOption = randomDigit * randomPlace;
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