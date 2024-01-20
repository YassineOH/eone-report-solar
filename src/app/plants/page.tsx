import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPlants } from '@/lib/huawei-api';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MapPin, Zap } from 'lucide-react';

async function Plants() {
  const token = cookies().get('xsrf-token')?.value;

  if (!token) {
    redirect('/');
  }

  const data = await getPlants({
    token,
  });

  if (data.data.message === 'USER_MUST_RELOGIN') {
    redirect('/');
  }

  return (
    <div className="w-full max-w-[1440px] space-y-12 ">
      <h2 className="text-semibold text-center text-5xl">Choose your plant</h2>
      <div className="grid grid-cols-1 gap-4 px-12 md:grid-cols-2 xl:grid-cols-3">
        {data.data.data.list.map((p) => (
          <Card key={p.plantCode} className="min-w-36 ">
            <CardHeader>
              <CardTitle>{p.plantName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start gap-y-2">
                <div className="flex items-center gap-x-1 text-sm text-gray-500">
                  <Zap className="h-5 w-4" /> Capacity: {p.capacity}kWp.
                </div>
                <div className="flex items-center gap-x-1 text-sm text-gray-500">
                  <MapPin className="h-5 w-4" /> Address: {p.plantAddress}.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/" className={buttonVariants({ variant: 'link' })}>
                See the details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Plants;
