import { FusionSolarDailyData } from '@/types/dailyData';
import { format } from 'date-fns';

export const getFormattedDailyData = (data: FusionSolarDailyData[]) => {
  const month = new Date(data[0].collectTime).getUTCMonth();
  const year = new Date(data[0].collectTime).getUTCMonth();
  const day = Number(format(data[0].collectTime, 'd'));

  const theLastDay = new Date(year, month + 1, 0).getDate();

  const formattedArr = [];
  for (let i = 1; i <= theLastDay; i++) {
    if (
      i >= day &&
      data[i - day] !== undefined &&
      format(data[i - day].collectTime, 'd') === i.toString()
    ) {
      formattedArr.push({
        name: format(data[i - day].collectTime, 'd'),
        consumption:
          (data[i - day].dataItemMap?.use_power || 0).toFixed(2) || 0,
        grid: (data[i - day].dataItemMap?.buyPower || 0).toFixed(2),
        solar: (data[i - day].dataItemMap?.inverter_power || 0).toFixed(2),
      });
    } else {
      formattedArr.push({
        name: i + '',
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
    (acc, curr) => acc + (curr.dataItemMap?.use_power || 0),
    0,
  );
  const gridEnergy = data.reduce(
    (acc, curr) => acc + (curr.dataItemMap?.buyPower || 0),
    0,
  );
  const solarPower = data.reduce(
    (acc, curr) => acc + (curr.dataItemMap?.inverter_power || 0),
    0,
  );

  const solarPowerConsumed = data.reduce(
    (acc, curr) => acc + (curr.dataItemMap?.selfUsePower || 0),
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
