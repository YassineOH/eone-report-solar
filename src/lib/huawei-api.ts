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
