import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import FractionsQuestion from './questions/FractionsQuestion';
import AlgebraicOperationsQuestion from './questions/AlgebraicOperationsQuestion';
import GeometryQuestion from './questions/GeometryQuestion';
import DataHandlingQuestion from './questions/DataHandlingQuestion';
import PlaceValueQuestion from './questions/PlaceValueQuestion';
import SquaresQuestion from './questions/SquaresQuestion';
import LcmHcfQuestion from './questions/LcmHcfQuestion';
import TimeQuestion from './questions/TimeQuestion';
import DecimalsQuestion from './questions/DecimalsQuestion';

interface ChallengeGameplayProps {
  moduleId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimit: number;
  pointsPerQuestion: number;
  onFinish: (score: number) => void;
}

export default function ChallengeGameplay({
  moduleId,
  difficulty,
  timeLimit,
  pointsPerQuestion,
  onFinish,
}: ChallengeGameplayProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [score, setScore] = useState(0);
  const [answerResult, setAnswerResult] = useState<'correct' | 'incorrect' | null>(null);
  const [questionKey, setQuestionKey] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + pointsPerQuestion);
      setTimeLeft((prevTime) => prevTime + 5); // Add 5 seconds for a correct answer
      setAnswerResult('correct');
    } else {
      setAnswerResult('incorrect');
    }

    // Reset feedback and load next question after a short delay
    setTimeout(() => {
      setAnswerResult(null);
      setQuestionKey(prevKey => prevKey + 1);
    }, 500);
  };

  const renderQuestion = () => {
    const props = {
      key: questionKey,
      onAnswer: handleAnswer,
      difficulty,
    };
    switch (moduleId) {
      case 'fractions':
        return <FractionsQuestion {...props} />;
      case 'algebraic-operations':
        return <AlgebraicOperationsQuestion {...props} />;
      case 'geometry':
        return <GeometryQuestion {...props} />;
      case 'data-handling':
        return <DataHandlingQuestion {...props} />;
      case 'place-value':
        return <PlaceValueQuestion {...props} />;
      case 'squares':
        return <SquaresQuestion {...props} />;
      case 'lcm-hcf':
        return <LcmHcfQuestion {...props} />;
      case 'time':
        return <TimeQuestion {...props} />;
      case 'decimals':
        return <DecimalsQuestion {...props} />;
      default:
        return <div>Unsupported module for challenge: {moduleId}</div>;
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onFinish, score]);

  return (
    <div
      className={`p-8 rounded-lg transition-colors duration-300 ${
        answerResult === 'correct' ? 'bg-green-100' : ''
      } ${answerResult === 'incorrect' ? 'bg-red-100' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Time Left: {timeLeft}s</h2>
        <h2 className="text-2xl font-bold">Score: {score}</h2>
      </div>
      <Progress value={(timeLeft / timeLimit) * 100} className="mb-8" />
      
      {renderQuestion()}
    </div>
  );
} 