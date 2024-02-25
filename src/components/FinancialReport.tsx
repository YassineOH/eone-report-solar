'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const formSchema = z.object({
  rate: z.coerce
    .number({
      invalid_type_error: 'the price should be a valid number',
    })
    .min(0.001, { message: 'the price should at least more than 0.01' }),
});

type FormType = z.infer<typeof formSchema>;

function FinancialReport() {
  const t = useTranslations();
  const [parent] = useAutoAnimate();
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: { rate: 0 },
  });
  const calculateRoi = ({ rate }: FormType) => {
    const params = new URLSearchParams(searchParams);

    params.set('rate', rate + '');

    replace(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(status) => {
        if (status === true) {
          setOpen(true);
          return;
        }
        setOpen(false);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          {t('SinglePlant.report.finance.button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('SinglePlant.report.finance.title')}</DialogTitle>
        </DialogHeader>
        <form
          className="flex w-full flex-col items-stretch gap-y-4 px-8"
          onSubmit={handleSubmit(calculateRoi)}
        >
          <div
            className="flex w-full flex-col items-stretch gap-y-1"
            ref={parent}
          >
            <div className="grid w-full grid-cols-2 items-center gap-x-1">
              <Label>{t('SinglePlant.report.finance.price')}:</Label>
              <Input placeholder="Ex: 1.59" {...register('rate')} />
            </div>
            {errors.rate?.message && (
              <span className="text-sm italic text-red-500">
                {errors.rate.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={!isValid}>
            {t('SinglePlant.report.finance.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default FinancialReport;
