import { modules, ModuleInfo } from './modules';
import { generateRandomProblem as generateAlgebraProblem } from './math-utils';

export function getDailyChallenge(): { module: ModuleInfo, problem: any } {
  // Use the date to get a consistent "random" module for the day
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const module = modules[dayOfYear % modules.length];
  
  // For now, we'll just generate an algebra problem.
  // This could be expanded to pull problems from different modules.
  const problem = generateAlgebraProblem('addition', 'easy');
  
  return { module, problem };
} 