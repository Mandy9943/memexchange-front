import { network } from '@/config';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_ELROND_CUSTOM_API || network.apiAddress;

const mxApi = axios.create({
  baseURL: BASE_URL
});

export default mxApi;

export const MvxApiBaseUrl = BASE_URL;

export const fetchElrondData = async <T>(req: string): Promise<T> => {
  const res = await mxApi.get<T>(req);
  return res.data;
};
