import axios from 'axios';
const BASE_URL =
  (process.env.NEXT_PUBLIC_FRONTED_URL || 'http://localhost:3000') + '/api';

export const serverAxiosJeetdex = axios.create({
  baseURL: BASE_URL
});
const axiosJeetdex = axios.create({
  baseURL: BASE_URL
});

export const fetchAxiosJeetdex = async <T>(req: string): Promise<T> => {
  const res = await axiosJeetdex.get<T>(req);
  return res.data;
};

export default axiosJeetdex;
