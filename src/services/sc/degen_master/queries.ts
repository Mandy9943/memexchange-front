import { adaptAllBondingData } from '@/adapters/master-sc';
import { ISCBoundingData } from '@/types/masterScTypes';
import BigNumber from 'bignumber.js';
import { scQuery } from '../query';

// queries
export const fetchNewTokenFee = async () => {
  const res = await scQuery('master', 'getNewTokenFee');

  if (!res?.firstValue) {
    return '0';
  }
  return res.firstValue.valueOf().toString();
};

// queries
export const fetchAllBondingData = async () => {
  const res = await scQuery('master', 'getAllBondingData');

  if (!res?.firstValue) {
    return [];
  }

  const rawData = res.firstValue.valueOf() as ISCBoundingData[];
  const data = adaptAllBondingData(rawData);

  return data;
};

export const fetchMaxSecondTokenReserve = async (): Promise<BigNumber> => {
  const res = await scQuery('master', 'getMaxSecondTokenReserve');
  console.log(res);

  if (!res?.firstValue) {
    return new BigNumber(0);
  }

  return res.firstValue.valueOf() as BigNumber;
};
