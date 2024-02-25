import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { getPlants } from '@/lib/huawei-api';
import { cookies } from 'next/headers';
import { Link } from '@/navigation';
import { redirect } from 'next/navigation';
import { Key, MapPin, PlugZap, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { enUS, fr, arMA } from 'date-fns/locale';

export const metadata: Metadata = {
  title: 'E-one | Plants',
  description:
    'generate and download the report of your solar plant using our next.js app',
  keywords: ['eone', 'solar', 'huawei', 'yassine ofqir-hamma'],
};

async function Plants({
  params: { locale },
}: {
  params: { locale: 'en' | 'ar' | 'fr' };
}) {
  const token = cookies().get('xsrf-token')?.value;

  const t = await getTranslations('plants');
  if (!token) {
    redirect('/');
  }

  const data = await getPlants({
    token,
  });

  if (data.data.failCode === 305) {
    redirect('/');
  }

  if (data.data.failCode === 407) {
    return (
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-center text-lg font-semibold">
          {t('error.title')}
        </h2>
        <p className="text-gray-500"> {t('error.text')}.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] space-y-12 ">
      <h2 className="text-semibold text-center text-3xl md:text-4xl xl:text-5xl">
        {t('title')}
      </h2>
      <div className="grid grid-cols-1 gap-4 px-12 md:grid-cols-2 xl:grid-cols-3">
        {data.data.data.list.map((p) => {
          const encodedData = encodeURIComponent(
            JSON.stringify({
              plantName: p.plantName,
              capacity: p.capacity,
              gridConnectionDate: p.gridConnectionDate,
              plantAddress: p.plantAddress,
            }),
          );

          return (
            <Card key={p.plantCode} className="min-w-36 ">
              <CardHeader>
                <CardTitle>{p.plantName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start gap-y-2">
                  <div className="flex items-center gap-x-1 text-sm text-gray-500 dark:text-gray-300">
                    <Zap className="h-5 w-4" />
                    {t('card.capacity')}: {p.capacity}{' '}
                    {locale === 'ar' ? 'كيلو واط' : 'kW'}.
                  </div>
                  <div className="flex items-center gap-x-1 text-sm text-gray-500 dark:text-gray-300">
                    <MapPin className="h-5 w-4" />
                    {t('card.address')}: {p.plantAddress}.
                  </div>
                  <div className="flex items-center gap-x-1 text-sm text-gray-500 dark:text-gray-300">
                    <PlugZap className="h-5 w-4" />
                    {t('card.time')}:{' '}
                    {format(p.gridConnectionDate, 'PP', {
                      locale:
                        locale === 'ar' ? arMA : locale === 'fr' ? fr : enUS,
                    })}
                    .
                  </div>
                  <div className="flex items-center gap-x-1 text-sm text-gray-500 dark:text-gray-300">
                    <Key className="h-5 w-4" />
                    {t('card.id')}: {p.plantCode}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/plants/${p.plantCode}?plantInfo=${encodedData}`}
                  className={buttonVariants({ variant: 'secondary' })}
                  prefetch={false}
                >
                  {t('card.button')}
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
export default Plants;
