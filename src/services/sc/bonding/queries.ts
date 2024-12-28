import { BigUIntValue, TokenIdentifierValue } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
import { bondingAbi } from '..';
import { scQueryWithContract } from '../query';

// queries
export const fetchAmountOut = async ({
  address,
  amountIn,
  tokenIn
}: {
  address: string;
  tokenIn: string;
  amountIn: string;
}) => {
  const res = await scQueryWithContract(address, bondingAbi, 'getAmountOut', [
    new TokenIdentifierValue(tokenIn),
    new BigUIntValue(amountIn)
  ]);

  if (!res?.firstValue) {
    return '0';
  }

  const rawData = res.firstValue.valueOf() as BigNumber[];
  const data = rawData.toString();

  return data;
};
