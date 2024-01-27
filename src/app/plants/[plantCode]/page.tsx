import { getDailyData } from '@/lib/huawei-api';
import { FusionSolarDailyData } from '@/types/dailyData';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { Zap, MapPin, PlugZap, Key } from 'lucide-react';

const Charts = dynamic(() => import('@/components/Charts'), { ssr: false });

const mockData: FusionSolarDailyData[] = [
  {
    collectTime: 1704067200000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 7.88,
      selfUsePower: 7.88,
      power_profit: 0,
      perpower_ratio: 1.576,
      reduction_total_co2: 0.004,
      selfProvide: 7.88,
      installed_capacity: 5,
      use_power: 15.6,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 7.72,
    },
  },
  {
    collectTime: 1704153600000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 7.62,
      selfUsePower: 7.62,
      power_profit: 0,
      perpower_ratio: 1.524,
      reduction_total_co2: 0.004,
      selfProvide: 7.62,
      installed_capacity: 5,
      use_power: 13.37,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 5.75,
    },
  },
  {
    collectTime: 1704240000000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 7.31,
      selfUsePower: 7.31,
      power_profit: 0,
      perpower_ratio: 1.462,
      reduction_total_co2: 0.003,
      selfProvide: 7.31,
      installed_capacity: 5,
      use_power: 13.45,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 6.14,
    },
  },
  {
    collectTime: 1704326400000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 6.66,
      selfUsePower: 6.66,
      power_profit: 0,
      perpower_ratio: 1.332,
      reduction_total_co2: 0.003,
      selfProvide: 6.66,
      installed_capacity: 5,
      use_power: 13.22,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 6.56,
    },
  },
  {
    collectTime: 1704412800000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 7.1,
      selfUsePower: 7.1,
      power_profit: 0,
      perpower_ratio: 1.42,
      reduction_total_co2: 0.003,
      selfProvide: 7.1,
      installed_capacity: 5,
      use_power: 13.94,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 6.84,
    },
  },
  {
    collectTime: 1704499200000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 7.64,
      selfUsePower: 7.64,
      power_profit: 0,
      perpower_ratio: 1.528,
      reduction_total_co2: 0.004,
      selfProvide: 7.64,
      installed_capacity: 5,
      use_power: 14.61,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 6.97,
    },
  },
  {
    collectTime: 1704585600000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 6.2,
      selfUsePower: 6.2,
      power_profit: 0,
      perpower_ratio: 1.24,
      reduction_total_co2: 0.003,
      selfProvide: 6.2,
      installed_capacity: 5,
      use_power: 12.33,
      reduction_total_coal: 0.002,
      ongrid_power: 0,
      buyPower: 6.13,
    },
  },
  {
    collectTime: 1704672000000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 7.29,
      selfUsePower: 7.29,
      power_profit: 0,
      perpower_ratio: 1.458,
      reduction_total_co2: 0.003,
      selfProvide: 7.29,
      installed_capacity: 5,
      use_power: 14.1,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 6.81,
    },
  },
  {
    collectTime: 1704758400000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 7,
      selfUsePower: 7,
      power_profit: 0,
      perpower_ratio: 1.4,
      reduction_total_co2: 0.003,
      selfProvide: 7,
      installed_capacity: 5,
      use_power: 16.65,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 9.65,
    },
  },
  {
    collectTime: 1704844800000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 6.45,
      selfUsePower: 6.45,
      power_profit: 0,
      perpower_ratio: 1.29,
      reduction_total_co2: 0.003,
      selfProvide: 6.45,
      installed_capacity: 5,
      use_power: 14.77,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 8.32,
    },
  },
  {
    collectTime: 1704931200000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 8.86,
      selfUsePower: 8.86,
      power_profit: 0,
      perpower_ratio: 1.772,
      reduction_total_co2: 0.004,
      selfProvide: 8.86,
      installed_capacity: 5,
      use_power: 16.94,
      reduction_total_coal: 0.004,
      ongrid_power: 0,
      buyPower: 8.08,
    },
  },
  {
    collectTime: 1705017600000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 8.67,
      selfUsePower: 8.67,
      power_profit: 0,
      perpower_ratio: 1.734,
      reduction_total_co2: 0.004,
      selfProvide: 8.67,
      installed_capacity: 5,
      use_power: 16.84,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 8.17,
    },
  },
  {
    collectTime: 1705104000000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 6.82,
      selfUsePower: 6.82,
      power_profit: 0,
      perpower_ratio: 1.364,
      reduction_total_co2: 0.003,
      selfProvide: 6.82,
      installed_capacity: 5,
      use_power: 13.09,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 6.27,
    },
  },
  {
    collectTime: 1705190400000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 6.61,
      selfUsePower: 6.6,
      power_profit: 0,
      perpower_ratio: 1.322,
      reduction_total_co2: 0.003,
      selfProvide: 6.6,
      installed_capacity: 5,
      use_power: 11.55,
      reduction_total_coal: 0.003,
      ongrid_power: 0.01,
      buyPower: 4.95,
    },
  },
  {
    collectTime: 1705276800000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 9.71,
      selfUsePower: 9.71,
      power_profit: 0,
      perpower_ratio: 1.942,
      reduction_total_co2: 0.005,
      selfProvide: 9.71,
      installed_capacity: 5,
      use_power: 15.94,
      reduction_total_coal: 0.004,
      ongrid_power: 0,
      buyPower: 6.23,
    },
  },
  {
    collectTime: 1705363200000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 1.22,
      selfUsePower: 1.22,
      power_profit: 0,
      perpower_ratio: 0.244,
      reduction_total_co2: 0.001,
      selfProvide: 1.22,
      installed_capacity: 5,
      use_power: 23.45,
      reduction_total_coal: 0,
      ongrid_power: 0,
      buyPower: 22.23,
    },
  },
  {
    collectTime: 1705449600000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 8.49,
      selfUsePower: 8.49,
      power_profit: 0,
      perpower_ratio: 1.698,
      reduction_total_co2: 0.004,
      selfProvide: 8.49,
      installed_capacity: 5,
      use_power: 23.22,
      reduction_total_coal: 0.003,
      ongrid_power: 0,
      buyPower: 14.73,
    },
  },
  {
    collectTime: 1705536000000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 10.37,
      selfUsePower: 10.37,
      power_profit: 0,
      perpower_ratio: 2.074,
      reduction_total_co2: 0.005,
      selfProvide: 10.37,
      installed_capacity: 5,
      use_power: 23.35,
      reduction_total_coal: 0.004,
      ongrid_power: 0,
      buyPower: 12.98,
    },
  },
  {
    collectTime: 1705622400000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 5.179999999999836,
      selfUsePower: 5.179999999999836,
      power_profit: 0,
      perpower_ratio: 1.0359999999999672,
      reduction_total_co2: 0.0024604999999999224,
      selfProvide: 5.179999999999836,
      installed_capacity: 5,
      use_power: 19.9699999999998,
      reduction_total_coal: 0.0020719999999999346,
      ongrid_power: 0,
      buyPower: 14.789999999999964,
    },
  },
  {
    collectTime: 1705708800000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 10.860000000000127,
      selfUsePower: 10.860000000000127,
      power_profit: 0,
      perpower_ratio: 2.1720000000000255,
      reduction_total_co2: 0.005158500000000061,
      selfProvide: 10.860000000000127,
      installed_capacity: 5,
      use_power: 21.590000000000146,
      reduction_total_coal: 0.004344000000000051,
      ongrid_power: 0,
      buyPower: 10.730000000000018,
    },
  },
  {
    collectTime: 1705795200000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 8.059999999999945,
      selfUsePower: 8.059999999999945,
      power_profit: 0,
      perpower_ratio: 1.611999999999989,
      reduction_total_co2: 0.0038284999999999743,
      selfProvide: 8.059999999999945,
      installed_capacity: 5,
      use_power: 18.139999999999873,
      reduction_total_coal: 0.003223999999999978,
      ongrid_power: 0,
      buyPower: 10.079999999999927,
    },
  },
  {
    collectTime: 1705881600000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 9.989999999999782,
      selfUsePower: 9.989999999999782,
      power_profit: 0,
      perpower_ratio: 1.9979999999999563,
      reduction_total_co2: 0.004745249999999896,
      selfProvide: 9.989999999999782,
      installed_capacity: 5,
      use_power: 18.529999999999745,
      reduction_total_coal: 0.003995999999999913,
      ongrid_power: 0,
      buyPower: 8.539999999999964,
    },
  },
  {
    collectTime: 1705968000000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 7.570000000000164,
      selfUsePower: 7.570000000000164,
      power_profit: 0,
      perpower_ratio: 1.5140000000000327,
      reduction_total_co2: 0.0035957500000000776,
      selfProvide: 7.570000000000164,
      installed_capacity: 5,
      use_power: 14.640000000000327,
      reduction_total_coal: 0.003028000000000066,
      ongrid_power: 0,
      buyPower: 7.070000000000164,
    },
  },
  {
    collectTime: 1706054400000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 8.489999999999782,
      selfUsePower: 8.489999999999782,
      power_profit: 0,
      perpower_ratio: 1.6979999999999564,
      reduction_total_co2: 0.004032749999999897,
      selfProvide: 8.489999999999782,
      installed_capacity: 5,
      use_power: 15.459999999999582,
      reduction_total_coal: 0.003395999999999913,
      ongrid_power: 0,
      buyPower: 6.9699999999998,
    },
  },
  {
    collectTime: 1706140800000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 8.930000000000291,
      selfUsePower: 8.930000000000291,
      power_profit: 0,
      perpower_ratio: 1.7860000000000582,
      reduction_total_co2: 0.004241750000000139,
      selfProvide: 8.930000000000291,
      installed_capacity: 5,
      use_power: 16.3400000000006,
      reduction_total_coal: 0.0035720000000001167,
      ongrid_power: 0,
      buyPower: 7.410000000000309,
    },
  },
  {
    collectTime: 1706227200000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 8.759999999999764,
      selfUsePower: 8.759999999999764,
      power_profit: 0,
      perpower_ratio: 1.7519999999999527,
      reduction_total_co2: 0.004160999999999888,
      selfProvide: 8.759999999999764,
      installed_capacity: 5,
      use_power: 17.499999999999545,
      reduction_total_coal: 0.0035039999999999056,
      ongrid_power: 0,
      buyPower: 8.739999999999782,
    },
  },
  {
    collectTime: 1706313600000,
    stationCode: 'NE=35948199',
    dataItemMap: {
      inverter_power: 2.3600000000001273,
      selfUsePower: 2.3600000000001273,
      power_profit: 0,
      perpower_ratio: 0.47200000000002545,
      reduction_total_co2: 0.0011210000000000605,
      selfProvide: 2.3600000000001273,
      installed_capacity: 5,
      use_power: 5.730000000000018,
      reduction_total_coal: 0.000944000000000051,
      ongrid_power: 0,
      buyPower: 3.369999999999891,
    },
  },
];

interface Params {
  params: {
    plantCode: string;
  };
}

async function PlantDetails({ params }: Params) {
  // const token = cookies().get('xsrf-token')?.value;

  // if (!token) {
  //   redirect('/');
  // }

  // const data = await getDailyData({
  //   token,
  //   stationCodes: params.plantCode.replace('%3D', '='),
  //   collectTime: new Date(2024, 0, 1).getTime(),
  // });

  // if (data.data.failCode === 305) {
  //   redirect('/');
  // }

  // if (data.data.failCode === 407) {
  //   return (
  //     <div className="flex flex-col items-center gap-y-4">
  //       <h2 className="text-center text-lg font-semibold">To many requests</h2>
  //       <p className="text-gray-500">Please wait one minute and try later...</p>
  //     </div>
  //   );
  // }

  const p = {
    capacity: 3,
    plantAddress: 'Casablanca',
    gridConnectionDate: 'Sat Jan 27 2024 16:29:37 GMT+0100 (GMT+01:00',
    plantCode: 'testcode',
  };

  return (
    <div className="w-full max-w-[1440px] space-y-12 ">
      <div className="flex items-start justify-between gap-x-8">
        <div className="flex flex-1 flex-col items-start gap-y-6">
          <h2 className="text-5xl font-bold">Solar Installation Name</h2>
          <div className="flex flex-col items-start gap-y-2">
            <div className="flex items-center gap-x-1 text-gray-500">
              <Zap className="h-5 w-4" />
              Capacity: {p.capacity}kWp.
            </div>
            <div className="flex items-center gap-x-1 text-gray-500">
              <MapPin className="h-5 w-4" />
              Address: {p.plantAddress}.
            </div>
            <div className="flex items-center gap-x-1 text-gray-500">
              <PlugZap className="h-5 w-4" />
              Connected to grid on: {format(p.gridConnectionDate, 'PP')}.
            </div>
            <div className="flex items-center gap-x-1 text-gray-500">
              <Key className="h-5 w-4" />
              Plant id: {p.plantCode}
            </div>
          </div>
        </div>
        <Charts dailyData={mockData} />
      </div>

      {/* <ol className="list-disc">
        {mockData.map((m) => (
          <li key={m.collectTime}>{JSON.stringify(m.dataItemMap)}</li>
        ))}
      </ol> */}
    </div>
  );
}
export default PlantDetails;
