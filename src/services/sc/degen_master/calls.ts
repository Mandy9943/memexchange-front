import { BooleanValue, BytesValue } from '@multiversx/sdk-core/out';
import { interactions } from '../interactions';

export const newToken = async (
  name: string,
  ticker: string,
  fee: string,
  id: string,
  amountToBuy: string
) => {
  const buyArgs: any[] = [
    BytesValue.fromUTF8(name),
    BytesValue.fromUTF8(ticker),
    BytesValue.fromUTF8(id)
  ];
  if (amountToBuy === '' || amountToBuy === '0') {
    buyArgs.push(new BooleanValue(false));
  } else {
    buyArgs.push(new BooleanValue(true));
  }

  return interactions.degenMaster.EGLDPayment({
    functionName: 'newToken',
    arg: buyArgs,
    realValue: fee,
    gasL: 200000000
  });
};
