import { bondingContractAbi } from '@/localConstants/globals';
import { BigUIntValue, TokenIdentifierValue } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
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
  const res = await scQueryWithContract(
    address,
    bondingContractAbi,
    'getAmountOut',
    [new TokenIdentifierValue(tokenIn), new BigUIntValue(amountIn)]
  );

  const rawData = res.firstValue?.valueOf() as BigNumber[];

  const data = rawData.toString();

  return data;
};
