import { getMonthData } from '@/lib/formatData';
import { FusionSolarDailyData } from '@/types/dailyData';

import {
  Cable,
  Percent,
  PercentCircle,
  Sun,
  Trees,
  UtilityPole,
} from 'lucide-react';
import Result from './Result';

interface Props {
  dailyData: FusionSolarDailyData[];
  totalPower: number;
  rate?: string;
  cost?: string;
}

function Summary({ dailyData, totalPower, cost, rate }: Props) {
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

  return (
    <div className="flex w-auto flex-col items-stretch gap-y-4 lg:w-full xl:w-4/5">
      <div className="mb-12 grid w-full grid-cols-1 items-stretch gap-y-2 md:mb-0 md:grid-cols-2  lg:grid-cols-3 lg:gap-y-0 ">
        {results.map((r) => (
          <Result {...r} key={r.title} />
        ))}
      </div>
      <div className="flex flex-col items-center justify-between px-6 lg:flex-row"></div>
    </div>
  );
}
export default Summary;
