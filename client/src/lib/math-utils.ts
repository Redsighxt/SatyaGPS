export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function getFactors(n: number): number[] {
  const factors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

export function getCommonFactors(a: number, b: number): number[] {
  const factorsA = getFactors(a);
  const factorsB = getFactors(b);
  return factorsA.filter(factor => factorsB.includes(factor));
}

export function getMultiples(n: number, count: number = 10): number[] {
  return Array.from({ length: count }, (_, i) => n * (i + 1));
}

export function getCommonMultiples(a: number, b: number, count: number = 10): number[] {
  const multiplesA = getMultiples(a, count * 2);
  const multiplesB = getMultiples(b, count * 2);
  const common = multiplesA.filter(multiple => multiplesB.includes(multiple));
  return common.slice(0, count);
}

export function isPerfectSquare(n: number): boolean {
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}

export function getPerfectSquares(limit: number): number[] {
  const squares = [];
  let i = 1;
  while (i * i <= limit) {
    squares.push(i * i);
    i++;
  }
  return squares;
}

export function generateRandomProblem(type: 'addition' | 'subtraction' | 'multiplication' | 'division', difficulty: 'easy' | 'medium' | 'hard') {
  let min, max;
  
  switch (difficulty) {
    case 'easy':
      min = 1;
      max = type === 'multiplication' ? 5 : 10;
      break;
    case 'medium':
      min = type === 'addition' || type === 'subtraction' ? 10 : 5;
      max = type === 'multiplication' ? 10 : 50;
      break;
    case 'hard':
      min = type === 'addition' || type === 'subtraction' ? 50 : 10;
      max = type === 'multiplication' ? 15 : 100;
      break;
  }

  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;

  let answer;
  let question;

  switch (type) {
    case 'addition':
      answer = a + b;
      question = `${a} + ${b}`;
      break;
    case 'subtraction':
      const larger = Math.max(a, b);
      const smaller = Math.min(a, b);
      answer = larger - smaller;
      question = `${larger} - ${smaller}`;
      break;
    case 'multiplication':
      answer = a * b;
      question = `${a} × ${b}`;
      break;
    case 'division':
      const dividend = a * b; // Ensure clean division
      answer = a;
      question = `${dividend} ÷ ${b}`;
      break;
    default:
      throw new Error('Invalid problem type');
  }

  return { question, answer, operands: [a, b] };
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function calculateScore(timeSpent: number, attempts: number, maxTime: number = 300): number {
  const timeBonus = Math.max(0, (maxTime - timeSpent) / maxTime) * 50;
  const attemptPenalty = Math.max(0, (attempts - 1) * 10);
  return Math.max(10, Math.round(100 + timeBonus - attemptPenalty));
}
