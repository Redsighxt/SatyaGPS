import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { shuffle } from 'lodash';

// Copied from client/src/pages/module/time.tsx
const AnalogClock = ({ hour, minute }: { hour: number; minute: number }) => {
  const minuteDeg = minute * 6;
  const hourDeg = hour * 30 + minute * 0.5;

  return (
    <div className="w-64 h-64 border-8 border-gray-700 rounded-full relative bg-white">
      {/* Clock Numbers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i + 1) * 30;
        const x = 50 + 40 * Math.sin((angle * Math.PI) / 180);
        const y = 50 - 40 * Math.cos((angle * Math.PI) / 180);
        return (
          <div
            key={i}
            className="absolute text-xl font-bold text-gray-800"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {i + 1}
          </div>
        );
      })}
      {/* Hour Hand */}
      <motion.div
        className="h-16 w-1.5 bg-gray-800 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom"
        style={{ rotate: hourDeg }}
      />
      {/* Minute Hand */}
      <motion.div
        className="h-24 w-1 bg-gray-600 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom"
        style={{ rotate: minuteDeg }}
      />
      {/* Center Circle */}
      <div className="w-4 h-4 bg-gray-900 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

interface TimeQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

function generateRandomTime() {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 12) * 5; // 0, 5, 10, ..., 55
    return { hour, minute };
}

function formatTime(hour: number, minute: number) {
    return `${hour.toString()}:${minute.toString().padStart(2, '0')}`;
}

export default function TimeQuestion({ onAnswer, difficulty }: TimeQuestionProps) {
  const [time, setTime] = useState({ hour: 3, minute: 15 });
  const [options, setOptions] = useState<string[]>([]);

  const generateProblem = () => {
    const newTime = generateRandomTime();
    setTime(newTime);

    const correctOption = formatTime(newTime.hour, newTime.minute);
    const otherOptions = [correctOption];
    while (otherOptions.length < 4) {
      const randomTime = generateRandomTime();
      const formattedTime = formatTime(randomTime.hour, randomTime.minute);
      if (!otherOptions.includes(formattedTime)) {
        otherOptions.push(formattedTime);
      }
    }
    
    setOptions(shuffle(otherOptions));
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleAnswer = (selectedTime: string) => {
    const correctTime = formatTime(time.hour, time.minute);
    onAnswer(selectedTime === correctTime);
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">What time is it?</h3>
      <div className="flex justify-center items-center mb-8">
        <AnalogClock hour={time.hour} minute={time.minute} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <Button key={option} onClick={() => handleAnswer(option)} className="h-20 text-xl">
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
} 