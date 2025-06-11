import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

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

export default function TimeModule() {
  const [time, setTime] = useState({ hour: 3, minute: 30 });
  const [answer, setAnswer] = useState('');

  const isCorrect = answer === `${time.hour}:${String(time.minute).padStart(2, '0')}`;

  const generateTime = () => {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 12) * 5;
    setTime({ hour, minute });
    setAnswer('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-sky-400 to-blue-500 p-8">
      <Link href="/">
        <Button variant="secondary" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Clock Masters</h1>
        <p className="text-gray-600 mb-8">What time is it on the clock?</p>

        <div className="flex justify-center mb-8">
          <AnalogClock hour={time.hour} minute={time.minute} />
        </div>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-48 h-16 text-3xl text-center border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
          placeholder="HH:MM"
        />

        {answer && (
          <motion.div
            className={`text-2xl font-bold p-4 rounded-lg mt-6 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {isCorrect ? 'Correct! You are a time wizard!' : 'Not quite. Check the hands again!'}
          </motion.div>
        )}

        <Button onClick={generateTime} className="mt-8">Next Clock</Button>
        <Link href={`/module/time/challenge`}>
          <Button className="mt-8 ml-4">Start Challenge</Button>
        </Link>
      </div>
    </div>
  );
} 