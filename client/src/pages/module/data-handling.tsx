import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Apples', count: 12 },
  { name: 'Bananas', count: 18 },
  { name: 'Oranges', count: 7 },
  { name: 'Grapes', count: 15 },
  { name: 'Pears', count: 5 },
];

export default function DataHandlingModule() {
  const [question, setQuestion] = useState({ text: 'Which fruit is the most popular?', answer: 'Bananas' });
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = selected === question.answer;

  const generateQuestion = () => {
    const questions = [
      { text: 'Which fruit is the most popular?', answer: 'Bananas' },
      { text: 'Which fruit is the least popular?', answer: 'Pears' },
      { text: `How many Apples are there?`, answer: '12' },
      { text: `How many more Bananas are there than Oranges?`, answer: '11' }
    ];
    const newQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(newQuestion);
    setSelected(null);
  };

  const getAnswerOptions = () => {
    const options = [question.answer];
    const fruitNames = data.map(d => d.name);
    const fruitCounts = data.map(d => d.count.toString());

    let allPossibleAnswers: string[];
    if (question.text.includes("popular")) {
      allPossibleAnswers = fruitNames;
    } else if (question.text.includes("How many")) {
      allPossibleAnswers = fruitCounts;
    } else {
       allPossibleAnswers = [...fruitNames, ...fruitCounts];
    }

    while (options.length < 4) {
      const randomOption = allPossibleAnswers[Math.floor(Math.random() * allPossibleAnswers.length)];
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-rose-300 to-amber-300 p-8">
      <Link href="/">
        <Button variant="secondary" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Chart Champions</h1>
        <p className="text-gray-600 mb-8">Answer the question based on the bar chart.</p>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#fb923c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="my-8">
          <p className="text-xl font-semibold">{question.text}</p>
          <div className="flex justify-center gap-4 mt-4">
            {getAnswerOptions().map(option => (
              <Button key={option} onClick={() => setSelected(option)}>{option}</Button>
            ))}
          </div>
        </div>

        {selected && (
          <motion.div
            className={`text-2xl font-bold p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {isCorrect ? 'Correct! Great job reading the chart!' : 'Not quite. Look closer!'}
          </motion.div>
        )}

        <Button onClick={generateQuestion} className="mt-8">Next Question</Button>
        <Link href={`/module/data-handling/challenge`}>
          <Button className="mt-8 ml-4">Start Challenge</Button>
        </Link>
      </div>
    </div>
  );
} 