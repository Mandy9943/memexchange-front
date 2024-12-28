import axios from 'axios';
const BASE_URL =
  (process.env.NEXT_PUBLIC_FRONTED_URL || 'http://localhost:3000') + '/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

export const fetchAxios = async <T>(req: string): Promise<T> => {
  const res = await axiosInstance.get<T>(req);
  return res.data;
};

export default axiosInstance;
