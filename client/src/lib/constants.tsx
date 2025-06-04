import { Rocket, Plus, Layers, GitBranch, Grid3X3 } from "lucide-react";

export const MODULES = [
  {
    id: 'algebraic-operations',
    title: 'Number Magic',
    description: 'Learn addition, subtraction, multiplication and division with fun animations!',
    icon: Plus,
    color: 'coral',
    gradient: 'from-coral to-red-400',
    path: '/module/algebraic-operations'
  },
  {
    id: 'place-value',
    title: 'Number Building',
    description: 'Build big numbers with ones, tens, and hundreds blocks!',
    icon: Layers,
    color: 'turquoise',
    gradient: 'from-turquoise to-teal-400',
    path: '/module/place-value'
  },
  {
    id: 'lcm-hcf',
    title: 'Number Families',
    description: 'Discover how numbers are related and find their common friends!',
    icon: GitBranch,
    color: 'skyblue',
    gradient: 'from-skyblue to-blue-400',
    path: '/module/lcm-hcf'
  },
  {
    id: 'squares',
    title: 'Square World',
    description: 'Create perfect squares and discover their magical roots!',
    icon: Grid3X3,
    color: 'plum',
    gradient: 'from-plum to-purple-400',
    path: '/module/squares'
  }
];

export const BADGE_TYPES = {
  FIRST_COMPLETE: 'first_complete',
  PERFECT_SCORE: 'perfect_score',
  SPEED_DEMON: 'speed_demon',
  PRACTICE_MASTER: 'practice_master',
  STREAK_KEEPER: 'streak_keeper'
};

export const BADGE_ICONS = {
  [BADGE_TYPES.FIRST_COMPLETE]: '🎉',
  [BADGE_TYPES.PERFECT_SCORE]: '⭐',
  [BADGE_TYPES.SPEED_DEMON]: '⚡',
  [BADGE_TYPES.PRACTICE_MASTER]: '🏆',
  [BADGE_TYPES.STREAK_KEEPER]: '🔥'
};
