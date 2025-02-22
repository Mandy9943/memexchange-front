import { adminAddress } from '@/config';
import { isValidAddress } from '@/utils/mx-utils';
import {
  Address,
  AddressValue,
  BooleanValue,
  BytesValue
} from '@multiversx/sdk-core/out';
import { interactions } from '../interactions';
export const createCoin = async (
  coin: {
    name: string;
    symbol: string;
    creatorBuy: boolean;
    description: string;
    imageUrl: string;
  },
  newCoinFee: string,
  referrerAddress?: string | null
) => {
  const referralAddress = referrerAddress
    ? isValidAddress(referrerAddress)
      ? referrerAddress
      : adminAddress
    : adminAddress;

  return interactions.master.EGLDPayment({
    functionName: 'createNewToken',
    realValue: newCoinFee,
    arg: [
      BytesValue.fromUTF8(coin.name),
      BytesValue.fromUTF8(coin.symbol),
      new BooleanValue(coin.creatorBuy),
      BytesValue.fromUTF8(coin.description),
      BytesValue.fromUTF8(coin.imageUrl),
      new AddressValue(new Address(referralAddress))
    ],
    gasL: 200_000_000
  });
};
