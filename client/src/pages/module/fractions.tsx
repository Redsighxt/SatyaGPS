import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const FractionVisual = ({ numerator, denominator }: { numerator: number; denominator: number }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-12 bg-gray-200 rounded-lg flex">
        {Array.from({ length: denominator }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-full border-r-2 border-gray-300 last:border-r-0 ${i < numerator ? 'bg-coral' : ''}`}
            style={{ width: `${100 / denominator}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="text-2xl font-bold mt-2">{numerator}/{denominator}</div>
    </div>
  );
};

export default function FractionsModule() {
  const [problem, setProblem] = useState({ n1: 1, d1: 4, n2: 2, d2: 4, answer: 'n2/d2' });
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = selected === problem.answer;

  const generateProblem = () => {
    let d1 = Math.floor(Math.random() * 5) + 3; // 3 to 7
    let n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
    let d2 = d1;
    let n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
    while (n1 === n2) {
      n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
    }

    setProblem({ n1, d1, n2, d2, answer: n1 > n2 ? 'n1/d1' : 'n2/d2' });
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-teal-400 to-blue-400 p-8">
      <Link href="/">
        <Button variant="secondary" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Fractions Fun</h1>
        <p className="text-gray-600 mb-8">Click on the bigger fraction!</p>

        <div className="flex justify-around items-center mb-8">
          <div onClick={() => setSelected('n1/d1')} className="cursor-pointer p-4 rounded-lg hover:bg-gray-100">
            <FractionVisual numerator={problem.n1} denominator={problem.d1} />
          </div>
          <div className="text-4xl font-bold text-gray-400">VS</div>
          <div onClick={() => setSelected('n2/d2')} className="cursor-pointer p-4 rounded-lg hover:bg-gray-100">
            <FractionVisual numerator={problem.n2} denominator={problem.d2} />
          </div>
        </div>

        {selected && (
          <motion.div
            className={`text-2xl font-bold p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {isCorrect ? 'Correct! Well done!' : 'Not quite, try again!'}
          </motion.div>
        )}

        <Button onClick={generateProblem} className="mt-8">Next Problem</Button>
        <Link href={`/module/fractions/challenge`}>
          <Button className="mt-8 ml-4">Start Challenge</Button>
        </Link>
      </div>
    </div>
  );
} 