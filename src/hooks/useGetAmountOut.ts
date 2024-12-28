import { fetchAmountOut } from '@/services/sc/bonding/queries';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

export const useGetAmountOut = (
  address: string,
  amountIn: string,
  tokenIn: string
) => {
  const swrKey =
    address && amountIn && tokenIn && new BigNumber(amountIn).gt(0)
      ? `bonding:getAmountOut:${address}:${amountIn}:${tokenIn}`
      : null;

  const { data, error, isLoading, mutate } = useSWR(swrKey, async () => {
    return fetchAmountOut({
      address,
      amountIn: new BigNumber(amountIn).multipliedBy(10 ** 18).toString(),
      tokenIn
    });
  });

  return {
    amountOut: data || '',
    error,
    isLoading,
    mutate
  };
};
