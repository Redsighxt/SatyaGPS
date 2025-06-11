interface NumberLineProps {
  value: number;
  max: number;
}

export default function NumberLine({ value, max }: NumberLineProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full h-12 bg-gray-100 rounded-full flex items-center px-2 relative">
      <div 
        className="h-8 bg-coral rounded-full absolute transition-all duration-300 ease-out"
        style={{ width: `calc(${percentage}% - 4px)` }}
      />
      <div 
        className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-coral font-bold text-lg absolute transition-all duration-300 ease-out"
        style={{ left: `calc(${percentage}% - 20px)` }}
      >
        {value}
      </div>
      {Array.from({ length: max + 1 }).map((_, i) => (
        i % 5 === 0 && (
          <div key={i} className="flex-1 text-center relative">
            <div className="h-4 w-0.5 bg-gray-300 mx-auto" />
            <span className="text-xs text-mediumgray absolute -bottom-5 left-1/2 -translate-x-1/2">
              {i}
            </span>
          </div>
        )
      ))}
    </div>
  );
}
