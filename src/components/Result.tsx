import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface Props {
  value: number;
  title: string;
  unit: string;
  Icon: LucideIcon;
}

function Result({ value, unit, title, Icon }: Props) {
  const t = useTranslations();
  return (
    <div className="flex w-auto items-center justify-start gap-x-6 shadow-sm lg:gap-x-4 lg:shadow-none">
      <Icon className="h-8 w-8 text-primary" />
      <div
        className={cn(
          'flex h-full scale-100 flex-col items-stretch justify-between gap-y-0',
          {
            'gap-y-2 text-primary md:scale-110 md:items-center': unit === 'MAD',
          },
        )}
      >
        <span className="text-sm font-semibold text-gray-500">
          {t(`SinglePlant.report.energy.${title}.key`)}:
        </span>
        <p className="text-lg font-bold">
          {value.toFixed(2)} {t(`SinglePlant.report.energy.${title}.unit`)}.
        </p>
      </div>
    </div>
  );
}
export default Result;
