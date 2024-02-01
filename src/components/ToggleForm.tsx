'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import autoAnimate from '@formkit/auto-animate';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import Instructions from './Instructions';
import { Button } from './ui/button';
import { Input, InputProps } from './ui/input';
import { Label } from './ui/label';
import { loginToFusionSolar } from '@/lib/huawei-api';
import { Card, CardContent, CardHeader } from './ui/card';

const credentialsSchema = z.object({
  username: z.string({ required_error: 'the username is required' }).min(3),
  password: z.string({ required_error: 'the password is required' }).min(3),
});

type CredentialsType = z.infer<typeof credentialsSchema>;

function ToggleForm() {
  const [current, setCurrent] = useState<'instructions' | 'form'>(
    'instructions',
  );
  const [parent] = useAutoAnimate();
  return (
    <div
      className="flex w-full flex-col items-center justify-center  gap-y-8"
      ref={parent}
    >
      <p className="text-center text-lg sm:text-xl lg:text-3xl">
        {current === 'form'
          ? 'Enter your credentials'
          : 'How I get my credentials?'}
      </p>
      {current === 'instructions' ? <Instructions /> : <CredentialsForm />}
      <p className="text-base">
        {current === 'instructions' ? ' I have my ' : 'how I get my '}
        <Button
          className="my-0 inline px-0 text-base"
          variant="link"
          onClick={() =>
            setCurrent((prev) => (prev === 'form' ? 'instructions' : 'form'))
          }
        >
          credentials
        </Button>
      </p>
    </div>
  );
}
export default ToggleForm;

const CredentialsForm = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CredentialsType>({
    resolver: zodResolver(credentialsSchema),
    mode: 'onBlur',
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginToFusionSolar,
    onError: (error) => {
      const err = error as AxiosError;
      if (err.response?.data === 'time expired') {
        setErrorMsg('Change the the deadline of the northbound account.');
      }
      if (err.response?.data === 'invalid credentials') {
        setErrorMsg('Either username, password or both are incorrect.');
      }
    },
    onSuccess: () => {
      router.push('/plants');
    },
  });

  const [parent] = useAutoAnimate();

  const handleLogin = async ({ password, username }: CredentialsType) => {
    login({ username, password });
  };
  return (
    <form
      className="flex w-full flex-col items-stretch gap-y-4"
      onSubmit={handleSubmit(handleLogin)}
      ref={parent}
    >
      {!!errorMsg && (
        <Card className="w-full bg-red-50 text-center text-red-900 shadow-red-50">
          <CardHeader className="text-lg font-semibold capitalize">
            An error occurred.
          </CardHeader>
          <CardContent>{errorMsg}</CardContent>
        </Card>
      )}
      <InputWithLabel
        {...register('username')}
        type="text"
        labelText="username"
        disabled={isPending}
        error={errors.username?.message}
      />
      <InputWithLabel
        {...register('password')}
        type="password"
        labelText="password"
        disabled={isPending}
        error={errors.password?.message}
      />
      <Button type="submit" disabled={isPending || !isValid}>
        Submit
      </Button>
    </form>
  );
};

interface PropsInput extends InputProps {
  error?: string;
  labelText: string;
}

const InputWithLabel = forwardRef<HTMLInputElement, PropsInput>(
  ({ name, error, labelText, ...props }, ref) => {
    const parent = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      parent.current && autoAnimate(parent.current);
    }, [parent]);
    return (
      <div className="flex flex-col items-stretch gap-y-2" ref={parent}>
        <Label className="capitalize" htmlFor={name}>
          {labelText}:
        </Label>
        <Input ref={ref} name={name} {...props} />
        {error ? <span className="text-sm text-red-600">{error}</span> : null}
      </div>
    );
  },
);

InputWithLabel.displayName = 'InputWithLabel';
