import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Instructions from '@/components/Instructions';
import ToggleForm from '@/components/ToggleForm';

export default function Home() {
  return (
    <div className="flex h-full w-full max-w-[1440px] flex-col  items-center justify-between gap-y-12 lg:gap-y-20  xl:flex-row xl:items-start">
      <header className="flex flex-1 flex-col justify-center gap-y-10 px-6 lg:px-16 xl:gap-y-12 xl:px-8 ">
        <h1 className="w-full text-center text-3xl font-bold lg:text-6xl">
          Download the report of your solar plants
        </h1>
        <div className="flex w-full flex-col items-center gap-y-4">
          <p className="text-lg font-light uppercase text-gray-400 sm:text-xl lg:text-3xl">
            powered by
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
