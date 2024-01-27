import { getDailyData } from '@/lib/huawei-api';
import { FusionSolarDailyData } from '@/types/dailyData';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { Zap, MapPin, PlugZap, Key } from 'lucide-react';
import ChooseMonth from '@/components/ChooseMonth';

import { number, string, z } from 'zod';
import Summary from '@/components/Summary';

const Chart = dynamic(() => import('@/components/Chart'), { ssr: false });

const plantSchema = z.object({
  plantName: string(),
  capacity: number(),
  gridConnectionDate: string(),
  plantAddress: string(),
});

interface Params {
  params: {
    plantCode: string;
  };
  searchParams: {
    m?: string;
    y?: string;
    plantInfo: string;
  };
}

async function PlantDetails({ params, searchParams }: Params) {
  const plantInfo = JSON.parse(searchParams.plantInfo);
  const result = plantSchema.safeParse(plantInfo);

  if (result.success === false) {
    redirect('/plants');
  }
  const p = result.data;

  const year = Number(searchParams.y) || new Date().getFullYear();
  const month = Number(searchParams.m) || new Date().getUTCMonth();

  const token = cookies().get('xsrf-token')?.value;

  if (!token) {
    redirect('/');
  }

  const data = await getDailyData({
    token,
    stationCodes: params.plantCode.replace('%3D', '='),
    collectTime: new Date(year, month, 1).getTime(),
  });

  if (data.data.failCode === 305) {
    redirect('/');
  }

  if (data.data.failCode === 407) {
    return (
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-center text-lg font-semibold">To many requests</h2>
        <p className="text-gray-500">Please wait one minute and try later...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] space-y-12 ">
      <div className="flex items-start justify-between gap-x-8">
        <div className="flex flex-col items-stretch gap-y-6">
          <h1 className="text-5xl font-bold">{p.plantName} </h1>
          <div className="flex flex-col items-start gap-y-2">
            <div className="flex items-center gap-x-1 text-gray-500">
              <Zap className="h-5 w-4" />
              Capacity: {p.capacity}kWp.
            </div>
            <div className="flex items-center gap-x-1 text-gray-500">
              <MapPin className="h-5 w-4" />
              Address: {p.plantAddress}.
            </div>
            <div className="flex items-center gap-x-1 text-gray-500">
              <PlugZap className="h-5 w-4" />
              Connected to grid on: {format(p.gridConnectionDate, 'PP')}.
            </div>
            <div className="flex items-center gap-x-1 text-gray-500">
              <Key className="h-5 w-4" />
              Plant id: {params.plantCode.replace('%3D', '=')}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-start gap-y-12">
          <ChooseMonth gridConnectionDate={p.gridConnectionDate} />
          <h2 className="text-2xl font-semibold">
            Report for: {format(new Date(year, month, 1), 'LLLL, u')}{' '}
          </h2>

          <Summary dailyData={data.data.data} />
          <Chart dailyData={data.data.data} />
        </div>
      </div>
    </div>
  );
}
export default PlantDetails;
