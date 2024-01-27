import { FusionSolarDailyData } from '@/types/dailyData';
import { format } from 'date-fns';

export const getFormattedDailyData = (data: FusionSolarDailyData[]) => {
  const formattedArr = [];
  for (let i = 0; i < 32; i++) {
    if (data[i] !== undefined) {
      formattedArr.push({
        name: format(data[i].collectTime, 'd'),
        consumption: data[i].dataItemMap.use_power.toFixed(2),
        grid: data[i].dataItemMap.buyPower.toFixed(2),
        solar: data[i].dataItemMap.inverter_power.toFixed(2),
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
