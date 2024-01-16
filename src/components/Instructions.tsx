'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';

function Instructions() {
  return (
    <>
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
            <li>Deadline</li>
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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="block lg:hidden">See how</Button>
        </DialogTrigger>
        <DialogContent className="mx-auto w-11/12 rounded-md">
          <ol className="flex w-auto list-decimal flex-col items-start justify-start gap-y-4 px-4">
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
        </DialogContent>
      </Dialog>
    </>
  );
}
export default Instructions;
