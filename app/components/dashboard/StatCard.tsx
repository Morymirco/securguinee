import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export default function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg transition-all hover:shadow-xl">
      <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
        {title}
      </h3>
      <div className="flex items-baseline gap-4">
        <p className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
          {value}
        </p>
        <span className={`flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-success' : 'text-error'
        }`}>
          {trend === 'up' ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          {change}
        </span>
      </div>
    </div>
  );
} 