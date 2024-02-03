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
  numberOfMonth: number;
  rate?: string;
  cost?: string;
}

function Summary({ dailyData, totalPower, cost, rate, numberOfMonth }: Props) {
  const data = getMonthData(dailyData);

  const results = [
    {
      value: data.solarPowerConsumed,
      title: 'Solar Production',
      unit: 'kWh',
      Icon: Sun,
    },
    {
      value: data.gridEnergy,
      title: 'Grid Energy',
      unit: 'kWh',
      Icon: UtilityPole,
    },
    {
      value: data.totalConsumption,
      title: 'Consumption',
      unit: 'kWh',
      Icon: Cable,
    },
    {
      value: data.coverage,
      title: 'Coverage',
      unit: '%',
      Icon: Percent,
    },
    {
      value: data.autoProductionPercentage,
      title: 'Auto-consumption Ratio',
      unit: '%',
      Icon: PercentCircle,
    },

    {
      value: data.savedCO2,
      title: '  Saved CO2 Emission',
      unit: 'To',
      Icon: Trees,
    },
  ];

  const financialResults = [];
  const monthlyPower = totalPower / numberOfMonth;
  if (cost !== undefined && rate !== undefined) {
    financialResults.push(
      {
        title: 'Total saving',
        unit: 'MAD',
        value: Number(rate) * totalPower,
        Icon: Coins,
      },
      {
        title: 'The remaining estimated of ROI',
        unit: 'Month',
        value:
          (Number(cost) - Number(rate) * totalPower) /
          (monthlyPower * Number(rate)),
        Icon: CalendarCheck,
      },
    );
  }

  return (
    <div className="mb-12 flex w-auto flex-col items-stretch gap-y-8 lg:w-full xl:w-4/5">
      <div className="grid w-full grid-cols-1 items-stretch gap-y-2 md:mb-0 md:grid-cols-2  lg:grid-cols-3 lg:gap-y-0 ">
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
