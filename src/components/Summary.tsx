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
    <div className="flex w-auto flex-col items-stretch gap-y-4 lg:w-full xl:w-4/5">
      <div className="mb-12 grid w-full grid-cols-1 items-stretch gap-y-2 md:mb-0 md:grid-cols-2  lg:grid-cols-3 lg:gap-y-0 ">
        <div className="flex w-full items-center justify-start gap-x-6 shadow-sm lg:gap-x-4 lg:shadow-none">
          <Sun className="h-8 w-8 text-primary" />
          <div className="flex h-full flex-col items-stretch justify-between gap-y-1">
            <span className="text-sm font-semibold text-gray-500">
              Solar Production:
            </span>
            <p className="text-lg font-bold">
              {data.solarPowerConsumed.toFixed(2)} kWh.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-start gap-x-6 shadow-sm lg:gap-x-4 lg:shadow-none">
          <UtilityPole className="h-8 w-8 text-primary" />
          <div className="flex h-full flex-col items-stretch justify-between gap-y-1">
            <span className="text-sm font-semibold text-gray-500">
              Grid Energy:
            </span>
            <p className="text-lg font-bold">
              {data.gridEnergy.toFixed(2)} kWh.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-start gap-x-6 shadow-sm lg:gap-x-4 lg:shadow-none">
          <Cable className="h-8 w-8 text-primary" />

          <div className="gap-y12 flex h-full flex-col items-stretch justify-between">
            <span className="text-sm font-semibold text-gray-500">
              Consumption:
            </span>
            <p className="text-lg font-bold">
              {data.totalConsumption.toFixed(2)} kWh.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-start gap-x-6 shadow-sm lg:gap-x-4 lg:shadow-none">
          <Percent className="h-8 w-8 text-primary" />

          <div className="flex h-full flex-col items-stretch justify-between gap-y-1">
            <span className="text-sm font-semibold text-gray-500">
              Coverage:
            </span>
            <p className="text-lg font-bold">{data.coverage.toFixed(2)} %.</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-start gap-x-6 shadow-sm lg:gap-x-4 lg:shadow-none">
          <PercentCircle className="h-8 w-8 text-primary" />

          <div className="flex h-full flex-col items-stretch justify-between gap-y-1">
            <span className="text-sm font-semibold text-gray-500">
              Auto-consumption Ratio:
            </span>
            <p className="text-lg font-bold">
              {data.autoProductionPercentage.toFixed(2)} %.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-start gap-x-6 shadow-sm lg:gap-x-4 lg:shadow-none">
          <Trees className="h-8 w-8 text-primary" />

          <div className="gap-y12 flex h-full flex-col items-stretch justify-between">
            <span className="text-sm font-semibold text-gray-500">
              Saved CO<sub>2</sub> Emission:
            </span>
            <p className="text-lg font-bold">{data.savedCO2.toFixed(2)} To.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Summary;
