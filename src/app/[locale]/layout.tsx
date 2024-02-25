import type { Metadata } from 'next';
import { Inter, Rubik } from 'next/font/google';
import '../globals.css';
import Providers from '@/components/Providers';
import { cn } from '@/lib/utils';
import { ControlButtons } from '@/components/ControlButtons';
import { useMessages } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });
const rubik = Rubik({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'E-one report generator',
  description:
    'generate and download the report of your solar plant using our next.js app',
  keywords: ['eone', 'solar', 'huawei', 'yassine ofqir-hamma'],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: 'en' | 'ar' | 'fr' };
}) {
  const messages = useMessages();
  return (
    <html lang={params.locale} dir={params.locale === 'ar' ? 'rtl' : 'ltr'}>
      <link rel="icon" href="/logo.ico" sizes="any" />
      <body
        className={params.locale === 'ar' ? rubik.className : inter.className}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          locale={params.locale}
          some={JSON.stringify(messages)}
        >
          <main
            className={cn(
              'mt-20 flex flex-col items-center justify-start gap-y-12 lg:mt-10 lg:gap-y-28',
            )}
          >
            <div className="hidden h-10 w-full justify-between lg:flex">
              <div className="h-full w-60 bg-primary"></div>
              <div className="flex items-start gap-x-4">
                <ControlButtons />
                <div className="h-full w-60 bg-primary"></div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center lg:hidden">
              <ControlButtons />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
