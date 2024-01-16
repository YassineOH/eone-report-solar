'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import autoAnimate from '@formkit/auto-animate';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Instructions from './Instructions';
import { Button } from './ui/button';
import { Input, InputProps } from './ui/input';
import { Label } from './ui/label';

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
          ? 'Enter you credentials'
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
  const { register } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  return (
    <form className="flex w-full flex-col items-stretch gap-y-4">
      <InputWithLabel
        {...register('username')}
        type="text"
        labelText="username"
      />
      <InputWithLabel
        {...register('password')}
        type="password"
        labelText="password"
      />
      <Button type="submit">Submit</Button>
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
