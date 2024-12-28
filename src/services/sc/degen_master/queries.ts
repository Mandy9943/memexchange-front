import { adaptAllBondingData } from '@/adapters/master-sc';
import { ISCBoundingData } from '@/types/masterScTypes';
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
  console.log(rawData);
  const data = adaptAllBondingData(rawData);
  console.log(data);

  return data;
};
