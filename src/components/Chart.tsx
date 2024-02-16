'use client';
import { getFormattedDailyData } from '@/lib/formatData';
import { FusionSolarDailyData } from '@/types/dailyData';
import { useTranslations } from 'next-intl';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  dailyData: FusionSolarDailyData[];
}

function Chart({ dailyData }: Props) {
  const t = useTranslations();
  const data = getFormattedDailyData(dailyData);
  return (
    <div className="hidden w-full md:block">
      <ResponsiveContainer height={200}>
        <BarChart data={data} width={700} height={200}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="consumption"
            name={t('SinglePlant.chart.consumption')}
            fill="#dac1a3"
          />
          <Bar
            dataKey="grid"
            stackId="production"
            name={t('SinglePlant.chart.grid')}
            fill="#d29e63"
          />
          <Bar
            dataKey="solar"
            stackId="production"
            name={t('SinglePlant.chart.solar')}
            fill="#04b9ad"
          />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default Chart;
