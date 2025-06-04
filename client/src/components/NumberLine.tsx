interface NumberLineProps {
  value: number;
  max: number;
  min?: number;
}

export default function NumberLine({ value, max, min = 0 }: NumberLineProps) {
  const position = ((value - min) / (max - min)) * 100;

  return (
    <div className="bg-gray-100 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-mediumgray">{min}</span>
        <span className="text-sm font-semibold text-mediumgray">{max}</span>
      </div>
      <div className="relative bg-skyblue rounded-full h-3">
        <div 
          className="absolute top-0 w-6 h-6 bg-coral rounded-full -mt-1.5 shadow-lg cursor-pointer hover:scale-110 transition-transform"
          style={{ left: `calc(${position}% - 12px)` }}
        />
        {value > min && (
          <div 
            className="absolute top-0 w-6 h-6 bg-turquoise rounded-full -mt-1.5 shadow-lg cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `calc(${((value - min) / 2 / (max - min)) * 100}% - 12px)` }}
          />
        )}
      </div>
      <div className="text-center mt-2">
        <span className="text-lg font-bold text-darkgray">{value}</span>
      </div>
    </div>
  );
}
