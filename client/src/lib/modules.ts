export interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  color: string;
}

export const modules: ModuleInfo[] = [
  {
    id: "number-magic",
    title: "Number Magic",
    description: "Master basic algebraic operations.",
    path: "/module/number-magic",
    icon: "PlusSquare",
    color: "from-coral to-red-400"
  },
  {
    id: "number-families",
    title: "Number Families",
    description: "Discover HCF and LCM.",
    path: "/module/number-families",
    icon: "Users",
    color: "from-skyblue to-blue-400"
  },
  {
    id: "number-building",
    title: "Number Building",
    description: "Understand place values.",
    path: "/module/number-building",
    icon: "Building",
    color: "from-turquoise to-teal-400"
  },
  {
    id: "square-world",
    title: "Square World",
    description: "Learn about squares and roots.",
    path: "/module/square-world",
    icon: "Box",
    color: "from-plum to-purple-400"
  },
  {
    id: "fractions",
    title: "Fractions Fun",
    description: "Visually compare fractions.",
    path: "/module/fractions",
    icon: "PieChart",
    color: "from-green-300 to-blue-400"
  },
  {
    id: "decimals",
    title: "Decimal Dash",
    description: "Practice decimal addition.",
    path: "/module/decimals",
    icon: "Dot",
    color: "from-yellow-300 to-orange-400"
  },
  {
    id: "geometry",
    title: "Shape Shifters",
    description: "Explore area and perimeter.",
    path: "/module/geometry",
    icon: "Square",
    color: "from-indigo-300 to-pink-400"
  },
  {
    id: "data-handling",
    title: "Chart Champions",
    description: "Read and interpret bar charts.",
    path: "/module/data-handling",
    icon: "BarChart3",
    color: "from-red-200 to-amber-300"
  },
  {
    id: "time",
    title: "Clock Masters",
    description: "Learn to read the time.",
    path: "/module/time",
    icon: "Clock",
    color: "from-cyan-200 to-blue-500"
  }
];

export const learningModules = [
  { id: 'number-magic', name: 'Number Magic' },
  { id: 'number-building', name: 'Number Building' },
  { id: 'number-families', name: 'Number Families' },
  { id: 'square-world', name: 'Square World' },
  { id: 'fractions', name: 'Fractions' },
  { id: 'decimals', name: 'Decimals' },
  { id: 'geometry', name: 'Geometry' },
  { id: 'data-handling', name: 'Data Handling' },
  { id: 'time', name: 'Time' },
]; 