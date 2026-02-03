interface Props {
  percentage: number;
}

export default function MatchProgress({ percentage }: Props) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>Match Score</span>
        <span>{percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded h-3">
        <div
          className="h-3 rounded bg-black"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
