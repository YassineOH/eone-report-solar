import { FusionSolarDailyData } from '@/types/dailyData';
import { format } from 'date-fns';

export const getFormattedDailyData = (data: FusionSolarDailyData[]) => {
  const formattedArr = [];
  for (let i = 0; i < 31; i++) {
    if (data[i] !== undefined) {
      formattedArr.push({
        name: format(data[i].collectTime, 'd'),
        consumption: data[i].dataItemMap.use_power.toFixed(2) || 0,
        grid: data[i].dataItemMap.buyPower.toFixed(2),
        solar: data[i].dataItemMap.inverter_power.toFixed(2),
      });
    } else {
      formattedArr.push({
        name: i + 1 + '',
        consumption: 0,
        grid: 0,
        solar: 0,
      });
    }
  }
  return formattedArr;
};

export const getMonthData = (data: FusionSolarDailyData[]) => {
  const totalConsumption = data.reduce(
    (acc, curr) => acc + curr.dataItemMap.use_power,
    0,
  );
  const gridEnergy = data.reduce(
    (acc, curr) => acc + curr.dataItemMap.buyPower,
    0,
  );
  const solarPower = data.reduce(
    (acc, curr) => acc + curr.dataItemMap.inverter_power,
    0,
  );

  const solarPowerConsumed = data.reduce(
    (acc, curr) => acc + curr.dataItemMap.selfUsePower,
    0,
  );

  return {
    solarPowerConsumed,
    autoProductionPercentage: (solarPowerConsumed / solarPower) * 100,
    totalConsumption,
    gridEnergy,
    savedCO2: (solarPowerConsumed * 0.712) / 1000,
    coverage: (solarPowerConsumed / gridEnergy) * 100,
  };
};
