import { ReLOGIN } from '@/types/login';
import { Plants } from '@/types/plants';
import axios from 'axios';

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

export const getPlants = ({ token }: { token: string }) => {
  return axios.post<Plants | ReLOGIN>(
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
};
