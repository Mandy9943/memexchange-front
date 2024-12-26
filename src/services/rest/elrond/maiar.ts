import { IMexPair } from '@/types/scTypes';
import { fetchElrondData } from '.';

export const fetchSwapRate = async ([baseId, quoteId]: [
  string,
  string
]): Promise<IMexPair> => {
  const data = await fetchElrondData<IMexPair>(
    `/mex/pairs/${baseId}/${quoteId}`
  );
  return data;
};

export const fetchMaiarPairs = async (): Promise<IMexPair[]> => {
  const data = await fetchElrondData<IMexPair[]>('mex/pairs');
  return data;
};
