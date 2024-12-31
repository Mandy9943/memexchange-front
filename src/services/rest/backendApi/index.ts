import axios, { AxiosRequestConfig } from 'axios';
const BASE_URL =
  (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000') + '/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

export const fetchAxios = async <T>(
  req: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await axiosInstance.get<T>(req, config);
  return res.data;
};

export default axiosInstance;
