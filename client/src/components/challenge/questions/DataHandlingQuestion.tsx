import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { shuffle } from 'lodash';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataHandlingQuestionProps {
  onAnswer: (isCorrect: boolean) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const generateChartData = () => {
  const labels = ['Apples', 'Oranges', 'Bananas', 'Grapes'];
  const data = labels.map(() => Math.floor(Math.random() * 20) + 5);
  return { labels, data };
};

export default function DataHandlingQuestion({ onAnswer, difficulty }: DataHandlingQuestionProps) {
  const [chartData, setChartData] = useState(generateChartData());
  const [question, setQuestion] = useState<{ text: string, answerLabel: string, options: string[] }>({ text: '', answerLabel: '', options: [] });

  const generateProblem = () => {
    const newChartData = generateChartData();
    setChartData(newChartData);

    const isMaxQuestion = Math.random() > 0.5;
    const targetValue = isMaxQuestion ? Math.max(...newChartData.data) : Math.min(...newChartData.data);
    const answerLabel = newChartData.labels[newChartData.data.indexOf(targetValue)];
    
    const otherOptions = newChartData.labels.filter(label => label !== answerLabel);
    const finalOptions = shuffle([answerLabel, ...shuffle(otherOptions).slice(0, 3)]);

    setQuestion({
      text: `Which fruit is the ${isMaxQuestion ? 'most' : 'least'} popular?`,
      answerLabel,
      options: finalOptions
    });
  };

  useEffect(() => {
    generateProblem();
  }, [difficulty]);

  const handleAnswer = (selectedLabel: string) => {
    onAnswer(selectedLabel === question.answerLabel);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Favorite Fruits' },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [{
      label: 'Number of Students',
      data: chartData.data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1
    }],
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">{question.text}</h3>
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <Bar options={chartOptions} data={data} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {question.options.map((option, index) => (
          <Button key={index} onClick={() => handleAnswer(option)} className="h-20 text-xl">
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
} 