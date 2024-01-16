import { LoginResponse } from '@/types/login';
import axios from 'axios';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { data, headers } = await axios.post<LoginResponse>(
      'https://eu5.fusionsolar.huawei.com/thirdData/login',
      {
        userName: body.username,
        systemCode: body.password,
      },
    );

    if (data.success === false && data.failCode === 20400) {
      return new Response('invalid credentials', { status: 401 });
    }
    if (data.success === false && data.failCode === 20003) {
      return new Response('time expired', { status: 401 });
    }

    const token = headers['xsrf-token'];
    return new Response('login success', {
      headers: {
        'xsrf-token': token,
      },
    });
  } catch (error) {
    console.log(error);

    throw new Response('Something went wrong, please try later', {
      status: 500,
    });
  }
}
