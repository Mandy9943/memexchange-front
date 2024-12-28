import { getBondingPairByAddress } from '@/services/rest/backendApi/bonding-pair';
import useSWR from 'swr';

export const useBondingPair = (bondingAddress: string) => {
  const { data, isLoading, error } = useSWR(
    `/bonding-pairs/${bondingAddress}`,
    () => getBondingPairByAddress(bondingAddress)
  );

  return {
    bondingPair: data,
    isLoading,
    error
  };
};
