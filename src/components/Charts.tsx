'use client';
import { getFormattedDailyData } from '@/lib/formatData';
import { FusionSolarDailyData } from '@/types/dailyData';
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

function Charts({ dailyData }: Props) {
  const data = getFormattedDailyData(dailyData);
  return (
    <div className="w-full">
      <ResponsiveContainer height={200}>
        <BarChart data={data} width={700} height={200}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="consumption" name="total consumption" fill="#8884d8" />
          <Bar dataKey="grid" stackId="production" name="grid" fill="#82ca9d" />
          <Bar
            dataKey="solar"
            stackId="production"
            name="solar"
            fill="#82339d"
          />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default Charts;
