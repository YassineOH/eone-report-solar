'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from './ui/select';
import { MONTHS, MONTHS_AR, MONTHS_FR, allYears } from '@/lib/years-months';

interface Props {
  gridConnectionDate: string;
  lang: 'ar' | 'fr' | 'en';
}

type SetDate =
  | { type: 'month'; value: string }
  | {
      type: 'year';
      value: string;
    };

function ChooseMonth({ gridConnectionDate, lang }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const startingYear = new Date(gridConnectionDate).getFullYear();
  const startingMonth = new Date(gridConnectionDate).getUTCMonth();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getUTCMonth();

  const month = searchParams.get('m') ?? currentMonth.toString();
  const year = searchParams.get('y') ?? currentYear.toString();

  const handleGettingData = ({ type, value }: SetDate) => {
    const params = new URLSearchParams(searchParams);

    if (type === 'month') {
      params.set('m', value);
      params.set('y', year);
    } else if (type === 'year') {
      params.set('m', month);
      params.set('y', value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  if (year === currentYear.toString() && Number(month) > currentMonth) {
    handleGettingData({ value: currentMonth.toString(), type: 'month' });
  }
  if (year === startingYear.toString() && Number(month) < startingMonth) {
    console.log('it should run here');

    handleGettingData({ value: startingMonth.toString(), type: 'month' });
  }

  const months = lang === 'ar' ? MONTHS_AR : lang === 'fr' ? MONTHS_FR : MONTHS;

  return (
    <div className="flex w-full items-center justify-evenly">
      <Select
        onValueChange={(value) => handleGettingData({ value, type: 'year' })}
        defaultValue={year}
      >
        <SelectTrigger className="w-36 md:w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {allYears(startingYear).map((y) => (
            <SelectItem key={y} value={y + ''}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => handleGettingData({ value, type: 'month' })}
        defaultValue={month}
      >
        <SelectTrigger className="w-36 md:w-40">
          <SelectValue placeholder="month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((m) => (
            <SelectItem
              key={m.value}
              value={m.value + ''}
              disabled={
                (startingYear + '' === year && m.value < startingMonth) ||
                (currentYear + '' === year && m.value > currentMonth)
              }
            >
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export default ChooseMonth;
