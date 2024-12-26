import { tokensID } from '@/config';
import { isValidNumber } from '@/utils/numbers';
import { SorSwapResponse } from '@ashswap/ash-sdk-js/out';
import axiosAshswap, { agService } from '.';

export const fetchAggregateOld = async ({
  from,
  to,
  amount
}: {
  from: string;
  to: string;
  amount: string;
}): Promise<SorSwapResponse> => {
  if (!isValidNumber(amount)) {
    throw new Error('Invalid amount');
  }

  const fromTokenI = from === tokensID.egld ? tokensID.wegld : from;
  const toTokenI = to === tokensID.egld ? tokensID.wegld : to;

  const res = await axiosAshswap.get<SorSwapResponse>('/aggregate', {
    params: {
      from: fromTokenI,
      to: toTokenI,
      amount
    }
  });
  return res.data;
};
export const fetchAggregate = async ({
  from,
  to,
  amount
}: {
  from: string;
  to: string;
  amount: string;
}): Promise<(SorSwapResponse & { warning: string }) | undefined> => {
  if (!isValidNumber(amount)) {
    throw new Error('Invalid amount');
  }

  const sorswap = await agService.getPaths(from, to, amount);

  return sorswap as (SorSwapResponse & { warning: string }) | undefined;
};
