'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { useTranslations } from 'next-intl';

const points = ['p1', 'p2', 'p3', 'p4', 'p5'] as const;

function Instructions() {
  const t = useTranslations('Home');

  return (
    <>
      <ol className="hidden w-auto list-decimal flex-col items-start justify-start gap-y-4 px-4 lg:flex">
        <li>
          {t.rich('instruction.1', {
            fusion: (website) => (
              <Link
                href="https://eu5.fusionsolar.huawei.com/unisso/login.action?decision=1&actionErrors=465&service=%2Funisess%2Fv1%2Fauth%3Fservice%3D%252Fnetecowebext%252Fhome%252Findex.html#/LOGIN"
                target="_blank"
                className="text-primary underline"
              >
                {website}
              </Link>
            ),
          })}
        </li>
        <li>
          {t.rich('instruction.2', {
            bold: (b) => <strong>{b}</strong>,
          })}
          {/* <strong>
            {' '}
            System &gt; Company Management &gt; Northbound Management
          </strong>
          . */}
        </li>
        <li>
          {t('instruction.3.title')}
          <ul className="flex list-disc flex-col items-start justify-start gap-y-1 pl-4">
            {points.map((p) => (
              <li key={p}>{t(`instruction.3.${p}.value`)}</li>
            ))}
          </ul>
        </li>
        <li>
          {t('instruction.4.title')}
          <ul className="flex list-disc flex-col items-start justify-start gap-y-1 pl-4">
            {points.map((p) => (
              <li key={p}>{t(`instruction.4.${p}.value`)}</li>
            ))}
          </ul>
        </li>
      </ol>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="block lg:hidden">{t('instruction.howBtn')}</Button>
        </DialogTrigger>
        <DialogContent className="mx-auto w-11/12 rounded-md">
          <ol className="flex w-auto list-decimal flex-col items-start justify-start gap-y-4 px-4">
            <li>
              {t.rich('instruction.1', {
                fusion: (website) => (
                  <Link
                    href="https://eu5.fusionsolar.huawei.com/unisso/login.action?decision=1&actionErrors=465&service=%2Funisess%2Fv1%2Fauth%3Fservice%3D%252Fnetecowebext%252Fhome%252Findex.html#/LOGIN"
                    target="_blank"
                    className="text-primary underline"
                  >
                    {website}
                  </Link>
                ),
              })}
            </li>
            <li>
              {t.rich('instruction.2', {
                bold: (b) => <strong>{b}</strong>,
              })}
              {/* <strong>
            {' '}
            System &gt; Company Management &gt; Northbound Management
          </strong>
          . */}
            </li>
            <li>
              {t('instruction.3.title')}

              <ul className="flex list-disc flex-col items-start justify-start gap-y-1 pl-4">
                {points.map((p) => (
                  <li key={p}>{t(`instruction.3.${p}.value`)}</li>
                ))}
              </ul>
            </li>
            <li>
              {t('instruction.4.title')}
              <ul className="flex list-disc flex-col items-start justify-start gap-y-1 pl-4">
                {points.map((p) => (
                  <li key={p}>{t(`instruction.4.${p}.value`)}</li>
                ))}
              </ul>
            </li>
          </ol>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default Instructions;
