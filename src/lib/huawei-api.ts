import axios from 'axios';
import { cache } from 'react';
import { DailyData } from '@/types/dailyData';
import { ReLOGIN, ToManyRequest } from '@/types/login';
import { Plants } from '@/types/plants';
import { PlantData } from '@/types/plantData';

export const loginToFusionSolar = async ({
  password,
  username,
}: {
  password: string;
  username: string;
}) => {
  return axios.post('http://localhost:3000/api/login', {
    username,
    password,
  });
};

export const getPlants = cache(({ token }: { token: string }) => {
  return axios.post<Plants | ReLOGIN | ToManyRequest>(
    'https://eu5.fusionsolar.huawei.com/thirdData/stations',
    {
      pageNo: 1,
    },
    {
      headers: {
        'xsrf-token': token,
        'Content-Type': 'application/json',
      },
    },
  );
});

export const getDailyData = ({
  token,
  stationCodes,
  collectTime,
}: {
  token: string;
  stationCodes: string;
  collectTime: number;
}) => {
  return axios.post<DailyData | ReLOGIN | ToManyRequest>(
    'https://eu5.fusionsolar.huawei.com/thirdData/getKpiStationDay',
    {
      stationCodes,
      collectTime,
    },
    {
      headers: {
        'xsrf-token': token,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getDailyData2 = async ({
  token,
  stationCodes,
  collectTime,
}: {
  token: string;
  stationCodes: string;
  collectTime: number;
}): Promise<DailyData | ReLOGIN | ToManyRequest> => {
  const data = await fetch(
    'https://eu5.fusionsolar.huawei.com/thirdData/getKpiStationDay',
    {
      body: JSON.stringify({
        collectTime,
        stationCodes,
      }),
      headers: {
        'xsrf-token': token,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 * 8 },
      method: 'POST',
    },
  );

  return data.json();
};

export const getPlantData = async ({
  token,
  stationCodes,
}: {
  token: string;
  stationCodes: string;
}): Promise<PlantData | ReLOGIN | ToManyRequest> => {
  const data = await fetch(
    'https://eu5.fusionsolar.huawei.com/thirdData/getStationRealKpi',
    {
      body: JSON.stringify({
        stationCodes,
      }),
      headers: {
        'xsrf-token': token,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 * 8 },
      method: 'POST',
    },
  );

  return data.json();
};
