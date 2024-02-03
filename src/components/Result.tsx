import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  value: number;
  title: string;
  unit: string;
  Icon: LucideIcon;
}

function Result({ value, unit, title, Icon }: Props) {
  return (
    <div className="flex w-full items-center justify-start gap-x-6 shadow-sm lg:gap-x-4 lg:shadow-none">
      <Icon className="h-8 w-8 text-primary" />
      <div
        className={cn(
          'flex h-full scale-100 flex-col items-stretch justify-between gap-y-1',
          {
            'gap-y-2 text-primary md:scale-110 md:items-center':
              unit === 'MAD' || unit === 'Month',
          },
        )}
      >
        <span className="text-sm font-semibold text-gray-500">{title}:</span>
        <p className="text-lg font-bold">
          {value.toFixed(2)} {unit}.
        </p>
      </div>
    </div>
  );
}
export default Result;
