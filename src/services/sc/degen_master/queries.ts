import { adaptAllBondingData } from '@/adapters/degenMasterAdapter';
import { ISCBoundingData } from '@/types/degenMasterTypes';
import { scQuery } from '../query';

// queries
export const fetchNewTokenFee = async () => {
  const res = await scQuery('master', 'getNewTokenFee');

  console.log(res);
  return res.firstValue?.valueOf().toString();
};

// queries
export const fetchAllBondingData = async () => {
  const res = await scQuery('master', 'getAllBondingData');

  const rawData = res.firstValue?.valueOf() as ISCBoundingData[];

  const data = adaptAllBondingData(rawData);

  return data;
};
