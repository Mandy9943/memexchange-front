import { tokensID } from '@/config';
import { BigUIntValue, TokenIdentifierValue } from '@multiversx/sdk-core/out';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { bondingAbi } from '..';
import { SmartContractInteraction } from '../call';

export const swap = async ({
  contract,
  tokenIn,
  tokenOut,
  amountOut,
  amountIn /* Amount in is a normal number like 0.5 1 or 2 */,
  initialSwap
}: {
  contract: string;
  tokenIn: string;
  tokenOut: string;
  amountOut: string;
  amountIn: string;
  initialSwap?: boolean;
}): Promise<SendTransactionReturnType> => {
  const interaction = new SmartContractInteraction(contract, bondingAbi);

  const args = [
    new TokenIdentifierValue(tokenOut),
    new BigUIntValue(amountOut)
  ];

  if (tokenIn === tokensID.egld) {
    console.log('wrapEgldAndEsdtTranfer');

    return interaction.wrapEgldAndEsdtTranfer({
      functionName: initialSwap ? 'initialSwap' : 'swap',
      arg: args,
      value: amountIn,
      gasL: initialSwap ? 30_000_000 : 400_000_000
    });
  } else {
    return interaction.ESDTTransfer({
      functionName: initialSwap ? 'initialSwap' : 'swap',
      arg: args,
      token: {
        collection: tokenIn,
        decimals: 18
      },
      value: amountIn,
      gasL: initialSwap ? 30_000_000 : 400_000_000
    });
  }
};

export const issueLpToken = async ({ contract }: { contract: string }) => {
  const interaction = new SmartContractInteraction(contract, bondingAbi);
  return interaction.scCall({
    functionName: 'enableSwap',
    gasL: 160_000_000
  });
};

export const setLocalRoles = async ({ contract }: { contract: string }) => {
  const interaction = new SmartContractInteraction(contract, bondingAbi);
  return interaction.scCall({
    functionName: 'configXexchange',
    gasL: 100_000_000
  });
};
