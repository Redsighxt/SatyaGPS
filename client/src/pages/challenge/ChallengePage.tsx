import { useState } from 'react';
import { Link, useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ChallengeGameplay from '@/components/challenge/ChallengeGameplay';
import axios from 'axios';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

const difficultySettings = {
  beginner: { timeLimit: 60, points: 10 },
  intermediate: { timeLimit: 45, points: 20 },
  advanced: { timeLimit: 30, points: 30 },
};

export default function ChallengePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [, setLocation] = useLocation();

  const handleFinish = async (score: number) => {
    setFinalScore(score);
    setIsFinished(true);
    try {
      await axios.post('/api/challenge-scores', {
        moduleId,
        score,
      });
    } catch (error) {
      console.error('Failed to save challenge score', error);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
        <Card className="text-center w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-fredoka">Challenge Complete!</CardTitle>
            <CardDescription>You did a great job!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-6xl font-bold mb-4">{finalScore}</p>
            <p className="text-xl text-gray-600 mb-8">points</p>
            <Link href={`/module/${moduleId}`}>
              <Button className="mb-4 w-full">Back to Learning</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" className="w-full">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedDifficulty) {
    return (
      <ChallengeGameplay
        moduleId={moduleId!}
        difficulty={selectedDifficulty}
        timeLimit={difficultySettings[selectedDifficulty].timeLimit}
        pointsPerQuestion={difficultySettings[selectedDifficulty].points}
        onFinish={handleFinish}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-fredoka">Challenge Mode: {moduleId}</CardTitle>
            <CardDescription>Select your difficulty level to begin.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(difficultySettings) as Difficulty[]).map((level) => (
              <Button
                key={level}
                variant="outline"
                className="h-24 text-xl"
                onClick={() => setSelectedDifficulty(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </CardContent>
        </Card>
        <div className="text-center mt-6">
          <Link href={`/module/${moduleId}`}>
            <Button variant="secondary">Back to Learning</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 