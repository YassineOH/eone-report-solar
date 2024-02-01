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

const formSchema = z.object({
  rate: z.coerce
    .number({
      invalid_type_error: 'the price should be a valid number',
    })
    .min(0.001, { message: 'the price should at least more than 0.01' }),
  cost: z.coerce
    .number({
      invalid_type_error: 'the cost should be a valid number',
    })
    .min(14500, { message: 'the cost should at least more than 15000' }),
});

type FormType = z.infer<typeof formSchema>;

function FinancialReport() {
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
    defaultValues: { cost: 0, rate: 0 },
  });
  const calculateRoi = ({ cost, rate }: FormType) => {
    const params = new URLSearchParams(searchParams);

    params.set('cost', cost + '');
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
        <Button variant="outline">include financial report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Financial report</DialogTitle>
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
              <Label>Electricity Price:</Label>
              <Input placeholder="Ex: 1.59" {...register('rate')} />
            </div>
            {errors.rate?.message && (
              <span className="text-sm italic text-red-500">
                {errors.rate.message}
              </span>
            )}
          </div>
          <div
            className="flex w-full flex-col items-stretch gap-y-1"
            ref={parent}
          >
            <div className="grid w-full grid-cols-2 items-center gap-x-1">
              <Label>The cost of the plant :</Label>
              <Input placeholder="Ex: 500000" {...register('cost')} />
            </div>
            {errors.cost?.message && (
              <span className="text-sm italic text-red-500">
                {errors.cost.message}
              </span>
            )}
          </div>
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default FinancialReport;
