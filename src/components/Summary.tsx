import { getMonthData } from '@/lib/formatData';
import { FusionSolarDailyData } from '@/types/dailyData';

import {
  Cable,
  Percent,
  PercentCircle,
  Sun,
  Trees,
  UtilityPole,
  Coins,
  CalendarCheck,
} from 'lucide-react';
import Result from './Result';

interface Props {
  dailyData: FusionSolarDailyData[];
  totalPower: number;
  rate?: string;
}

function Summary({ dailyData, totalPower, rate }: Props) {
  const data = getMonthData(dailyData);

  const results = [
    {
      value: data.solarPowerConsumed,
      title: 'solarPowerConsumed',
      unit: 'kWh',
      Icon: Sun,
    },
    {
      value: data.gridEnergy,
      title: 'gridEnergy',
      unit: 'kWh',
      Icon: UtilityPole,
    },
    {
      value: data.totalConsumption,
      title: 'totalConsumption',
      unit: 'kWh',
      Icon: Cable,
    },
    {
      value: data.coverage,
      title: 'coverage',
      unit: '%',
      Icon: Percent,
    },
    {
      value: data.autoProductionPercentage,
      title: 'autoProductionPercentage',
      unit: '%',
      Icon: PercentCircle,
    },

    {
      value: data.savedCO2,
      title: 'savedCO2',
      unit: 'To',
      Icon: Trees,
    },
  ];

  const financialResults = [];
  if (rate !== undefined) {
    financialResults.push(
      {
        title: 'totalSaving',
        unit: 'MAD',
        value: Number(rate) * totalPower,
        Icon: Coins,
      },
      {
        title: 'monthlySaving',
        unit: 'MAD',
        value: data.solarPowerConsumed * Number(rate),
        Icon: CalendarCheck,
      },
    );
  }

  return (
    <div className="mb-12 flex w-auto flex-col items-stretch gap-y-8 lg:w-full xl:w-4/5">
      <div className="grid w-full grid-cols-1 items-stretch gap-y-2 md:mb-0 md:grid-cols-2  lg:grid-cols-3 lg:gap-y-4 ">
        {results.map((r) => (
          <Result {...r} key={r.title} />
        ))}
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-y-2 px-0 lg:flex-row lg:px-6">
        {financialResults.length > 1 &&
          financialResults.map((r) => <Result {...r} key={r.title} />)}
      </div>
    </div>
  );
}
export default Summary;
