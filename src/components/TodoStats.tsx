import { Progress } from "./ui/progress";

interface TodoStatsProps {
  completedCount: number;
  totalCount: number;
}
export function TodoStats({ completedCount, totalCount }: TodoStatsProps) {
  const percentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
  return (
    <div className="mt-6 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">Progress</p>
        <span className="text-sm font-semibold text-gray-900">
          {completedCount}/{totalCount}
        </span>
      </div>
      <Progress value={percentage} className="w-full h-2" />
      <p className="text-xs text-gray-500 text-right">
        {Math.round(percentage)}% completed
      </p>
    </div>
  );
}
