'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from './ui/select';
import { MONTHS, allYears } from '@/lib/years-months';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface Props {
  gridConnectionDate: string;
}

function ChooseMonth({ gridConnectionDate }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [year, setYear] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  const handleGettingData = () => {
    const params = new URLSearchParams(searchParams);

    params.set('m', month + '');
    params.set('y', year + '');
    replace(`${pathname}?${params.toString()}`);
  };

  const startingYear = new Date(gridConnectionDate).getFullYear();
  const startingMonth = new Date(gridConnectionDate).getUTCMonth();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getUTCMonth();

  return (
    <div className="flex w-full items-center justify-evenly ">
      <Select onValueChange={(v) => setYear(v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="year" />
        </SelectTrigger>
        <SelectContent>
          {allYears(startingYear).map((y) => (
            <SelectItem key={y} value={y + ''}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(v) => setMonth(v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m) => (
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
      <Button className="w-40" onClick={handleGettingData}>
        Get Data <ArrowRight />
      </Button>
    </div>
  );
}
export default ChooseMonth;
