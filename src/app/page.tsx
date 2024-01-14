import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh - 40px)] mt-40 flex flex-col items-center justify-start gap-y-12 lg:mt-10 lg:gap-y-48">
      <div className="hidden h-10 w-full justify-between lg:flex">
        <div className="h-full w-40 bg-primary"></div>
        <div className="h-full w-40 bg-primary"></div>
      </div>
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-y-12 lg:gap-y-20  xl:flex-row">
        <header className="flex flex-1 flex-col justify-center gap-y-10 px-6 lg:px-16 xl:gap-y-12 xl:px-8 ">
          <h1 className="w-full text-center text-3xl font-bold lg:text-6xl">
            Generate & Download the report of your solar plants
          </h1>
          <div className="flex w-full flex-col items-center gap-y-4">
            <p className="text-3xl font-light uppercase text-gray-400 ">
              powered by
            </p>
            <Image alt="e-one logo" src="logo.svg" width={280} height={61.34} />
          </div>
        </header>
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-y-8">
          <p className="text-3xl">How I get my credentials?</p>
          <ol className="hidden w-auto list-decimal flex-col items-start justify-start gap-y-4 px-4 lg:flex">
            <li>
              Head to{' '}
              <Link
                href="https://eu5.fusionsolar.huawei.com/unisso/login.action?decision=1&actionErrors=465&service=%2Funisess%2Fv1%2Fauth%3Fservice%3D%252Fnetecowebext%252Fhome%252Findex.html#/LOGIN"
                target="_blank"
                className="text-primary underline"
              >
                FusionSolar
              </Link>{' '}
              website and login.
            </li>
            <li>
              Go{' '}
              <strong>
                {' '}
                System &gt; Company Management &gt; Northbound Management
              </strong>
              .
            </li>
            <li>
              Click Add and fill-in the following informations:
              <ul className="flex list-disc flex-col items-start justify-start gap-y-1 pl-4">
                <li>System name</li>
                <li>Date</li>
                <li>User Name</li>
                <li>Password</li>
                <li>Associated</li>
              </ul>
            </li>
            <li>
              Select all the type of data in the following options: :
              <ul className="flex list-disc flex-col items-start justify-start gap-y-1 pl-4">
                <li>Plant list</li>
                <li>Yearly data</li>
                <li>Monthly data</li>
                <li>Daily data</li>
              </ul>
            </li>
          </ol>
          <Button className="block lg:hidden">See how</Button>
          <p className="text-base">
            I have my{' '}
            <Button className="my-0 inline px-0 text-base" variant="link">
              credentials
            </Button>
          </p>
        </div>
      </div>
    </main>
  );
}
