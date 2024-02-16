'use client';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { NextIntlClientProvider, useTimeZone } from 'next-intl';

function Providers({
  children,
  locale,
  some,
  ...props
}: ThemeProviderProps & { locale: string; some: string }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={JSON.parse(some)}
      timeZone="Africa/Casablanca"
    >
      <NextThemesProvider {...props}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextThemesProvider>
    </NextIntlClientProvider>
  );
}
export default Providers;
