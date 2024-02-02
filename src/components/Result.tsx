import { LucideIcon } from 'lucide-react';

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
      <div className="flex h-full flex-col items-stretch justify-between gap-y-1">
        <span className="text-sm font-semibold text-gray-500">{title}:</span>
        <p className="text-lg font-bold">
          {value.toFixed(2)} {unit}.
        </p>
      </div>
    </div>
  );
}
export default Result;
