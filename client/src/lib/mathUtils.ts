export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

export const getFactors = (n: number): number[] => {
  const factors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }
  return factors;
};

export const isPerfectSquare = (n: number): boolean => {
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
};

export const generateAdditionProblem = (max: number = 20) => {
  const num1 = Math.floor(Math.random() * max) + 1;
  const num2 = Math.floor(Math.random() * (max - num1)) + 1;
  return { num1, num2, answer: num1 + num2 };
};

export const generateSubtractionProblem = (max: number = 20) => {
  const answer = Math.floor(Math.random() * max) + 1;
  const num2 = Math.floor(Math.random() * answer) + 1;
  const num1 = answer + num2;
  return { num1, num2, answer };
};

export const generateMultiplicationProblem = (max: number = 10) => {
  const num1 = Math.floor(Math.random() * max) + 1;
  const num2 = Math.floor(Math.random() * max) + 1;
  return { num1, num2, answer: num1 * num2 };
};

export const generatePlaceValueNumber = () => {
  const hundreds = Math.floor(Math.random() * 10);
  const tens = Math.floor(Math.random() * 10);
  const ones = Math.floor(Math.random() * 10);
  return { hundreds, tens, ones, total: hundreds * 100 + tens * 10 + ones };
};
