import Image from 'next/image';
import ToggleForm from '@/components/ToggleForm';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="flex h-full w-full max-w-[1440px] flex-col items-center justify-between gap-x-12 gap-y-12 lg:gap-y-20 xl:flex-row  xl:items-start rtl:xl:flex-row-reverse">
      <header className="flex flex-1 flex-col justify-center gap-y-10 px-6 lg:px-16 xl:gap-y-12 xl:px-8">
        <h1 className="w-full text-center text-3xl font-bold lg:text-6xl">
          {t('title')}
        </h1>
        <div className="flex w-full flex-col items-center gap-y-4">
          <p className="text-lg font-light uppercase text-gray-400 sm:text-xl lg:text-3xl">
            {t('poweredBy')}
          </p>
          <Image
            alt="e-one logo"
            src="logo.svg"
            width={280}
            height={61.34}
            className="w-40 lg:w-60 xl:w-[280px]"
          />
        </div>
      </header>
      <div className=" w-4/5 flex-1 xl:w-full">
        <ToggleForm />
      </div>
    </div>
  );
}
