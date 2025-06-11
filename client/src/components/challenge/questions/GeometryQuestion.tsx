import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { shuffle } from 'lodash';

interface GeometryQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const shapes = [
    { name: 'Circle', component: <div className="w-24 h-24 bg-coral rounded-full" /> },
    { name: 'Square', component: <div className="w-24 h-24 bg-coral" /> },
    { name: 'Rectangle', component: <div className="w-32 h-20 bg-coral" /> },
    { name: 'Triangle', component: <div className="w-0 h-0 border-l-[50px] border-l-transparent border-b-[100px] border-b-coral border-r-[50px] border-r-transparent" /> },
];

export default function GeometryQuestion({ onAnswer, difficulty }: GeometryQuestionProps) {
  const [correctShape, setCorrectShape] = useState(shapes[0]);
  const [options, setOptions] = useState<typeof shapes>([]);

  const generateProblem = () => {
    const newCorrectShape = shapes[Math.floor(Math.random() * shapes.length)];
    setCorrectShape(newCorrectShape);

    const otherOptions = shapes.filter(s => s.name !== newCorrectShape.name);
    const shuffledOptions = shuffle([newCorrectShape, ...shuffle(otherOptions).slice(0, 3)]);
    setOptions(shuffledOptions);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleAnswer = (shapeName: string) => {
    onAnswer(shapeName === correctShape.name);
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">What shape is this?</h3>
      <div className="flex justify-center items-center h-40 mb-8">
        {correctShape.component}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((shape) => (
          <Button key={shape.name} onClick={() => handleAnswer(shape.name)} className="h-20 text-xl">
            {shape.name}
          </Button>
        ))}
      </div>
    </div>
  );
} 