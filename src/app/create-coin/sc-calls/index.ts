import { interactions } from '@/services/sc/interactions';
import { BooleanValue, BytesValue } from '@multiversx/sdk-core/out';

export const createCoin = async (
  coin: {
    name: string;
    symbol: string;
    creatorBuy: boolean;
    description: string;
    imageUrl: string;
  },
  newCoinFee: number
) => {
  return interactions.master.EGLDPayment({
    functionName: 'createNewToken',
    value: newCoinFee,
    arg: [
      BytesValue.fromUTF8(coin.name),
      BytesValue.fromUTF8(coin.symbol),
      new BooleanValue(coin.creatorBuy),
      BytesValue.fromUTF8(coin.description),
      BytesValue.fromUTF8(coin.imageUrl)
    ],
    gasL: 200_000_000
  });
};
