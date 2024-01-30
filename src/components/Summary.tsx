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

interface Props {
  dailyData: FusionSolarDailyData[];
}

function Summary({ dailyData }: Props) {
  const data = getMonthData(dailyData);
  return (
    <div className="grid w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:w-4/5">
      <div className="flex w-full items-center justify-start gap-x-4">
        <Sun className="h-7 w-7 text-primary" />
        <div className="flex h-full flex-col items-stretch justify-between">
          <span className="text-sm font-semibold text-gray-500">
            Solar Production:
          </span>
          <p className="text-lg font-bold">
            {data.solarPowerConsumed.toFixed(2)} kWh.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-x-4">
        <UtilityPole className="h-7 w-7 text-primary" />
        <div className="flex h-full flex-col items-stretch justify-between">
          <span className="text-sm font-semibold text-gray-500">
            Grid Energy:
          </span>
          <p className="text-lg font-bold">{data.gridEnergy.toFixed(2)} kWh.</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-x-4">
        <Cable className="h-7 w-7 text-primary" />

        <div className="flex h-full flex-col items-stretch justify-between">
          <span className="text-sm font-semibold text-gray-500">
            Consumption:
          </span>
          <p className="text-lg font-bold">
            {data.totalConsumption.toFixed(2)} kWh.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-x-4">
        <Percent className="h-7 w-7 text-primary" />

        <div className="flex h-full flex-col items-stretch justify-between">
          <span className="text-sm font-semibold text-gray-500">Coverage:</span>
          <p className="text-lg font-bold">{data.coverage.toFixed(2)} %.</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-x-4">
        <PercentCircle className="h-7 w-7 text-primary" />

        <div className="flex h-full flex-col items-stretch justify-between">
          <span className="text-sm font-semibold text-gray-500">
            Auto-consumption Ratio:
          </span>
          <p className="text-lg font-bold">
            {data.autoProductionPercentage.toFixed(2)} %.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-x-4">
        <Trees className="h-7 w-7 text-primary" />

        <div className="flex h-full flex-col items-stretch justify-between">
          <span className="text-sm font-semibold text-gray-500">
            Saved CO<sub>2</sub> Emission:
          </span>
          <p className="text-lg font-bold">{data.savedCO2.toFixed(2)} To.</p>
        </div>
      </div>
    </div>
  );
}
export default Summary;
