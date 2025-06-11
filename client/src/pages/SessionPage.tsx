import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import FractionsQuestion from '@/components/challenge/questions/FractionsQuestion';
import AlgebraicOperationsQuestion from '@/components/challenge/questions/AlgebraicOperationsQuestion';
import GeometryQuestion from '@/components/challenge/questions/GeometryQuestion';
import DataHandlingQuestion from '@/components/challenge/questions/DataHandlingQuestion';
import PlaceValueQuestion from '../components/challenge/questions/PlaceValueQuestion';
import SquaresQuestion from '@/components/challenge/questions/SquaresQuestion';
import LcmHcfQuestion from '../components/challenge/questions/LcmHcfQuestion';
import TimeQuestion from '@/components/challenge/questions/TimeQuestion';
import DecimalsQuestion from '@/components/challenge/questions/DecimalsQuestion';

const useQuery = () => {
  return new URLSearchParams(window.location.search);
};

export default function SessionPage() {
  const query = useQuery();
  const modules = query.get('modules')?.split(',') || [];
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerResult, setAnswerResult] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 10);
      setAnswerResult('correct');
    } else {
      setAnswerResult('incorrect');
    }

    setTimeout(() => {
      setAnswerResult(null);
      setCurrentModuleIndex((prevIndex) => (prevIndex + 1) % modules.length);
    }, 500);
  };

  if (modules.length === 0) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">No modules selected</h1>
        <Link href="/">
          <Button className="mt-4">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const currentModuleId = modules[currentModuleIndex];

  const renderQuestion = () => {
    const props = {
      onAnswer: handleAnswer,
      difficulty: 'beginner' as const,
    };
    switch (currentModuleId) {
      case 'fractions':
        return <FractionsQuestion {...props} />;
      case 'number-magic':
        return <AlgebraicOperationsQuestion {...props} />;
      case 'geometry':
        return <GeometryQuestion {...props} />;
      case 'data-handling':
        return <DataHandlingQuestion {...props} />;
      case 'number-building':
        return <PlaceValueQuestion {...props} />;
      case 'square-world':
        return <SquaresQuestion {...props} />;
      case 'number-families':
        return <LcmHcfQuestion {...props} />;
      case 'time':
        return <TimeQuestion {...props} />;
      case 'decimals':
        return <DecimalsQuestion {...props} />;
      default:
        return <div>Unsupported module: {currentModuleId}</div>;
    }
  };

  return (
    <div
      className={`p-8 transition-colors duration-300 ${
        answerResult === 'correct' ? 'bg-green-100' : ''
      } ${answerResult === 'incorrect' ? 'bg-red-100' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Focus Session</h1>
        <div className="text-2xl font-bold">Score: {score}</div>
        <Link href="/">
          <Button variant="destructive">Stop Session</Button>
        </Link>
      </div>
      <div>{renderQuestion()}</div>
    </div>
  );
} 