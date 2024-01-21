import { getDailyData } from '@/lib/huawei-api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Params {
  params: {
    plantCode: string;
  };
}

async function PlantDetails({ params }: Params) {
  const token = cookies().get('xsrf-token')?.value;

  if (!token) {
    redirect('/');
  }

  const data = await getDailyData({
    token,
    stationCodes: params.plantCode.replace('%3D', '='),
    collectTime: new Date(2024, 0, 1).getTime(),
  });

  if (data.data.failCode === 305) {
    redirect('/');
  }

  if (data.data.failCode === 407) {
    return (
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-center text-lg font-semibold">To many requests</h2>
        <p className="text-gray-500">Please wait one minute and try later...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] space-y-12 ">
      <ol className="list-disc">
        {data.data.data.map((m) => (
          <li key={m.collectTime}>{JSON.stringify(m.dataItemMap)}</li>
        ))}
      </ol>
    </div>
  );
}
export default PlantDetails;
