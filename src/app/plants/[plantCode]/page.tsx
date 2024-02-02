import { cookies } from 'next/headers';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Zap, MapPin, PlugZap, Key } from 'lucide-react';
import { format } from 'date-fns';
import { number, string, z } from 'zod';

import { redirect } from 'next/navigation';
import { getDailyData2, getPlantData } from '@/lib/huawei-api';
import ChooseMonth from '@/components/ChooseMonth';

import Summary from '@/components/Summary';
import FinancialReport from '@/components/FinancialReport';
import { Badge } from '@/components/ui/badge';

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
    cost?: string;
    rate?: string;
  };
}

export const revalidate = 3600 * 8;

async function PlantDetails({ params, searchParams }: Params) {
  const token = cookies().get('xsrf-token')?.value;

  if (!token) {
    redirect('/');
  }

  const plantInfo = JSON.parse(searchParams.plantInfo);
  const result = plantSchema.safeParse(plantInfo);

  if (result.success === false) {
    redirect('/plants');
  }

  const p = result.data;
  const year = searchParams.y
    ? Number(searchParams.y)
    : new Date().getFullYear();
  const month = searchParams.m
    ? Number(searchParams.m)
    : new Date().getUTCMonth();

  const cost = searchParams.cost;
  const rate = searchParams.rate;

  const plantData = await getPlantData({
    token,
    stationCodes: params.plantCode.replace('%3D', '='),
  });

  const data = await getDailyData2({
    token,
    stationCodes: params.plantCode.replace('%3D', '='),
    collectTime: new Date(year, month, 1).getTime(),
  });

  if (data.failCode === 305 || plantData.failCode === 305) {
    redirect('/');
  }

  if (data.failCode === 407 || plantData.failCode === 407) {
    return (
      <div className="flex flex-col items-center gap-y-4">
        <ChooseMonth gridConnectionDate={p.gridConnectionDate} />
        <h2 className="text-center text-lg font-semibold">To many requests</h2>
        <h3>Report for: {format(new Date(year, month, 1), 'LLLL, u')} </h3>
        <p className="text-gray-500">Please wait one minute and try later...</p>
        <FinancialReport />
      </div>
    );
  }

  const plantStatus =
    plantData.data[0].dataItemMap.real_health_state === 3
      ? 'WORKING'
      : plantData.data[0].dataItemMap.real_health_state === 1
        ? 'OFFLINE'
        : 'FAULTY';
  const totalPower = plantData.data[0].dataItemMap.total_power;
  return (
    <div className="w-full max-w-[1440px] space-y-12">
      <div className="flex flex-col items-center justify-between gap-x-8 gap-y-12 divide-y px-12 lg:flex-row lg:items-start lg:gap-y-0 lg:divide-y-0">
        <div className="flex flex-col items-stretch gap-y-6">
          <h1 className="text-center text-2xl font-bold md:text-3xl lg:text-inherit xl:text-5xl">
            {p.plantName}{' '}
          </h1>
          <div className="flex items-center justify-center gap-x-2">
            <p className="text-semibold">Current status of the plant:</p>
            <Badge
              variant={
                plantStatus === 'WORKING'
                  ? 'default'
                  : plantStatus === 'OFFLINE'
                    ? 'secondary'
                    : 'destructive'
              }
            >
              {plantStatus}
            </Badge>
          </div>
          <div className="flex flex-col items-start gap-y-2 border-b-0 lg:border-b">
            <div className="flex items-center gap-x-1  text-sm text-gray-500 lg:text-base">
              <Zap className="h-5 w-4" />
              Capacity: {p.capacity}kWp.
            </div>
            <div className="flex items-center gap-x-1  text-sm text-gray-500 lg:text-base">
              <MapPin className="h-5 w-4" />
              Address: {p.plantAddress}.
            </div>
            <div className="flex items-center gap-x-1  text-sm text-gray-500 lg:text-base">
              <PlugZap className="h-5 w-4" />
              Connected to grid on: {format(p.gridConnectionDate, 'PP')}.
            </div>
            <div className="flex items-center gap-x-1  text-sm text-gray-500 lg:text-base">
              <Key className="h-5 w-4" />
              Plant id: {params.plantCode.replace('%3D', '=')}
            </div>
          </div>
          <FinancialReport />
          <div className="flex w-full flex-col items-center gap-y-4">
            <p className="text-lg font-light uppercase text-gray-400 sm:text-base lg:text-xl">
              powered by
            </p>
            <Image
              alt="e-one logo"
              src="../logo.svg"
              width={280}
              height={61.34}
              className="w-40 lg:w-60 xl:w-[280px]"
            />
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-start gap-y-6  pt-12 lg:gap-y-12 lg:pt-0">
          <ChooseMonth gridConnectionDate={p.gridConnectionDate} />
          <h2 className="text-lg font-semibold  lg:text-2xl">
            Report for: {format(new Date(year, month, 2), 'LLLL, u')}{' '}
          </h2>
          {data.data.length === 0 ? (
            <div>
              <h2 className="text-center text-lg font-semibold">
                There&apos;s no records for this month{' '}
              </h2>
            </div>
          ) : (
            <>
              <Summary
                dailyData={data.data}
                cost={cost}
                rate={rate}
                totalPower={totalPower}
              />
              <Chart dailyData={data.data} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default PlantDetails;
