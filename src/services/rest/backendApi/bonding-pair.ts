import { BondingPair } from '@/types/bondingPairsTypes';
import { fetchAxios } from '.';

export const getBondingPairs = () => {
  return fetchAxios<BondingPair[]>('/bonding-pairs');
};

export const getBondingPairByAddress = (address: string) => {
  return fetchAxios<BondingPair>(`/bonding-pairs/${address}`);
};
