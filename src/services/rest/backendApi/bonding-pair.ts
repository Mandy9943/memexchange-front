import { BondingPair } from '@/types/bondingPairsTypes';
import { fetchAxios } from '.';

export const getBondingPairs = (limit: number = 20, offset: number = 0) => {
  return fetchAxios<{
    items: BondingPair[];
    total: number;
    hasMore: boolean;
  }>(`/bonding-pairs?limit=${limit}&offset=${offset}`);
};

export const getBondingPairByAddress = (address: string) => {
  return fetchAxios<BondingPair>(`/bonding-pairs/${address}`);
};
