import { ChainID } from '@/config';
import { Aggregator, ChainId } from '@ashswap/ash-sdk-js/out';
import axios from 'axios';
import { selectedSwapConfig } from './ashConfig';
const BASE_URL =
  process.env.NEXT_PUBLIC_ASHSWAP_API_URL || selectedSwapConfig.apiUrl;

const axiosAshswap = axios.create({
  baseURL: BASE_URL
});

export default axiosAshswap;

export const fetchAggregatorData = async <T>(req: string): Promise<T> => {
  const res = await axiosAshswap.get<T>(req);
  return res.data;
};

export const integrator =
  'erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn'; // your fee wallet address

export const agService = new Aggregator({
  chainId: ChainID as ChainId.Mainnet | ChainId.Devnet,
  protocol: integrator
});
