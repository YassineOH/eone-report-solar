import { cookies } from 'next/headers';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Zap, MapPin, PlugZap, Key, ArrowLeftFromLine } from 'lucide-react';
import { format } from 'date-fns';
import { number, string, z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { enUS, fr, arMA } from 'date-fns/locale';

import { redirect } from 'next/navigation';
import { getDailyData2, getPlantData } from '@/lib/huawei-api';
import ChooseMonth from '@/components/ChooseMonth';

import { Link } from '@/navigation';
import Summary from '@/components/Summary';
import FinancialReport from '@/components/FinancialReport';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFRapport from '@/pdf/Rapport';

const Chart = dynamic(() => import('@/components/Chart'), { ssr: false });
const DownloadButton = dynamic(() => import('@/components/DownloadButton'), {
  ssr: false,
});

const plantSchema = z.object({
  plantName: string(),
  capacity: number(),
  gridConnectionDate: string(),
  plantAddress: string(),
});

interface Params {
  params: {
    plantCode: string;
    locale: 'en' | 'ar' | 'fr';
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
  const t = await getTranslations();

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
        <ChooseMonth
          gridConnectionDate={p.gridConnectionDate}
          lang={params.locale}
        />
        <h2 className="text-center text-lg font-semibold">
          {t('SinglePlant.error.title')}{' '}
        </h2>
        <h3>
          Report for:{' '}
          {format(new Date(year, month, 1), 'LLLL, u', {
            locale:
              params.locale === 'ar'
                ? arMA
                : params.locale === 'fr'
                  ? fr
                  : enUS,
          })}{' '}
        </h3>
        <p className="text-gray-500">{t('SinglePlant.error.text')}.</p>
        <FinancialReport />
      </div>
    );
  }

  const plantStatus =
    plantData.data[0].dataItemMap.real_health_state === 3
      ? t('SinglePlant.status.working')
      : plantData.data[0].dataItemMap.real_health_state === 1
        ? t('SinglePlant.status.offline')
        : t('SinglePlant.status.faulty');

  const plantHealth =
    plantData.data[0].dataItemMap.real_health_state === 3
      ? 3
      : plantData.data[0].dataItemMap.real_health_state === 1
        ? 1
        : 2;
  const totalPower = plantData.data[0].dataItemMap.total_power;
  const numberOfMonth =
    (new Date().getTime() -
      new Date(result.data.gridConnectionDate).getTime()) /
    (1000 * 60 * 60 * 24 * 30);
  return (
    <div className="w-full max-w-[1440px] space-y-12">
      <div className="flex flex-col items-center justify-between gap-x-8 gap-y-12 divide-y px-12 lg:flex-row lg:items-start lg:gap-y-0 lg:divide-y-0">
        <div className="flex flex-col items-stretch gap-y-6">
          <div className="w-full">
            <Link
              href="/plants"
              className={buttonVariants({
                variant: 'link',
                className: 'flex items-center justify-start gap-x-2',
              })}
            >
              <ArrowLeftFromLine />
              {t('SinglePlant.back')}
            </Link>
          </div>
          <h1 className="text-center text-2xl font-bold md:text-3xl lg:text-inherit xl:text-5xl">
            {p.plantName}
          </h1>
          <div className="flex items-center justify-center gap-x-2">
            <p className="text-semibold">{t('SinglePlant.status.title')}</p>
            <Badge
              variant={
                plantHealth === 3
                  ? 'default'
                  : plantHealth === 1
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
              {t('SinglePlant.info.capacity')}: {p.capacity}{' '}
              {params.locale === 'ar' ? 'كيلو واط' : 'kW'}.
            </div>
            <div className="flex items-center gap-x-1  text-sm text-gray-500 lg:text-base">
              <MapPin className="h-5 w-4" />
              {t('SinglePlant.info.address')}: {p.plantAddress}.
            </div>
            <div className="flex items-center gap-x-1  text-sm text-gray-500 lg:text-base">
              <PlugZap className="h-5 w-4" />
              {t('SinglePlant.info.time')}:
              {format(p.gridConnectionDate, 'PP', {
                locale:
                  params.locale === 'ar'
                    ? arMA
                    : params.locale === 'fr'
                      ? fr
                      : enUS,
              })}
            </div>
            <div className="flex items-center gap-x-1 text-sm text-gray-500 lg:text-base">
              <Key className="h-5 w-4" />
              {t('SinglePlant.info.id')}: {params.plantCode.replace('%3D', '=')}
            </div>
          </div>
          <FinancialReport />
          <div className="flex w-full flex-col items-center gap-y-4">
            <p className="text-lg font-light uppercase text-gray-400 sm:text-base lg:text-xl">
              {t('SinglePlant.poweredBy')}
            </p>
            <Image
              alt="e-one logo"
              src="../../logo.svg"
              width={280}
              height={61.34}
              className="w-40 lg:w-60 xl:w-[280px]"
            />
          </div>
          <div className="flex w-full items-center justify-center py-1">
            <DownloadButton
              dailyData={data.data}
              plantInfo={result.data}
              time={new Date(year, month, 2).getTime()}
              text={t('SinglePlant.download')}
            />
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-start gap-y-6  pt-12 lg:gap-y-12 lg:pt-0">
          <ChooseMonth
            gridConnectionDate={p.gridConnectionDate}
            lang={params.locale}
          />
          <h2 className="text-lg font-semibold  lg:text-2xl">
            {t('SinglePlant.report.title')}:{' '}
            {format(new Date(year, month, 2), 'LLLL, u', {
              locale:
                params.locale === 'ar'
                  ? arMA
                  : params.locale === 'fr'
                    ? fr
                    : enUS,
            })}
          </h2>
          {data.data.length === 0 ? (
            <div>
              <h2 className="text-center text-lg font-semibold">
                {t('SinglePlant.report.empty')}
              </h2>
            </div>
          ) : (
            <>
              <Summary
                dailyData={data.data}
                cost={cost}
                rate={rate}
                totalPower={totalPower}
                numberOfMonth={numberOfMonth}
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
