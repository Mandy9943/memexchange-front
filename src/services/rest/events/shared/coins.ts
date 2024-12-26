import { CoinOwnerType } from '@/types/services.type';
import { eventsApi } from '..';

export const getCoinOwner = async (coinId: string): Promise<CoinOwnerType> => {
  const { data } = await eventsApi.get<CoinOwnerType>(
    `/coins/owner?coinIdentifier=${coinId}`
  );
  return data;
};
