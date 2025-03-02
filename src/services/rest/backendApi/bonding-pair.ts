import { BondingPair } from '@/types/bondingPairsTypes';
import { fetchAxios } from '.';

export const getBondingPairs = (limit: number = 20, offset: number = 0) => {
  return fetchAxios<{
    items: BondingPair[];
    total: number;
    hasMore: boolean;
  }>(`/bonding-pairs?limit=${limit}&offset=${offset}`);
};

export const searchBondingPairs = (params: {
  query?: string;
  creator?: string;
  state?: string;
  limit?: number;
  offset?: number;
}) => {
  const queryParams = new URLSearchParams();

  if (params.query) queryParams.append('query', params.query);
  if (params.creator) queryParams.append('creator', params.creator);
  if (params.state) queryParams.append('state', params.state);
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.offset) queryParams.append('offset', params.offset.toString());

  return fetchAxios<{
    items: BondingPair[];
    total: number;
    hasMore: boolean;
  }>(`/bonding-pairs/search?${queryParams.toString()}`);
};

export const getBondingPairByAddress = (address: string) => {
  return fetchAxios<BondingPair>(`/bonding-pairs/${address}`);
};
