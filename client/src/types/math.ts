export interface MathProblem {
  id: string;
  type: 'addition' | 'subtraction' | 'multiplication' | 'division';
  num1: number;
  num2: number;
  answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PlaceValueProblem {
  id: string;
  hundreds: number;
  tens: number;
  ones: number;
  total: number;
}

export interface LCMHCFProblem {
  id: string;
  num1: number;
  num2: number;
  lcm: number;
  hcf: number;
}

export interface SquareProblem {
  id: string;
  number: number;
  square: number;
  isSquareRoot: boolean;
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GameState {
  currentLevel: number;
  score: number;
  lives: number;
  timeRemaining: number;
  isCompleted: boolean;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  lastAttempt: Date;
}
