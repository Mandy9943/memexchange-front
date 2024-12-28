'use client';

import { useBondingPair } from '@/hooks/useBondingPair';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import { useGetAmountOut } from '@/hooks/useGetAmountOut';
import { swap } from '@/services/sc/bonding/call';
import { cn } from '@/utils/cn';
import { formatTokenI } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TokenAmount } from './TokenAmount';

interface TradingProps {
  firstTokenId: string;
  secondTokenId: string;
}

type TradeType = 'buy' | 'sell';

interface SwapFormData {
  amount: string;
}

const PERCENTAGE_OPTIONS = [25, 50, 75, 100];

export const Trading = ({ firstTokenId, secondTokenId }: TradingProps) => {
  const { address } = useParams();
  const [activeTab, setActiveTab] = useState<TradeType>('buy');
  const { bondingPair } = useBondingPair(address as string);
  const { accountToken: firstAccountToken } = useGetAccountToken(firstTokenId);
  const { accountToken: secondAccountToken } =
    useGetAccountToken(secondTokenId);
  console.log(firstAccountToken);
  console.log(secondAccountToken);

  console.log(bondingPair);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<SwapFormData>({
    defaultValues: {
      amount: ''
    }
  });

  const amount = watch('amount');

  const [slippage, setSlippage] = useState(0.5); // 0.5% default slippage
  console.log(amount);

  const { amountOut, isLoading: isLoadingAmountOut } = useGetAmountOut(
    address as string,
    amount || '0',
    activeTab === 'buy' ? secondTokenId : firstTokenId
  );

  console.log({
    amountOut: new BigNumber(amountOut || '0').div(10 ** 18).toString()
  });

  const handlePercentageClick = (percentage: number) => {
    const relevantToken =
      activeTab === 'buy' ? secondAccountToken : firstAccountToken;

    if (!relevantToken?.balance || !relevantToken?.decimals) {
      return;
    }

    // Use BigNumber to handle the calculation
    const balance = new BigNumber(relevantToken.balance);
    const decimals = new BigNumber(10).pow(relevantToken.decimals);
    const percentageDecimal = new BigNumber(percentage).div(100);

    // Calculate the exact amount
    const newAmount = balance.multipliedBy(percentageDecimal).div(decimals);

    console.log('Setting new amount:', newAmount.toString()); // Debug log
    setValue('amount', newAmount.toString(), { shouldValidate: true });
  };

  const onSubmit = async (data: SwapFormData) => {
    try {
      const isInitialSwap = bondingPair?.state !== 'Active';
      const tokenIn = activeTab === 'buy' ? secondTokenId : firstTokenId;
      const tokenOut = activeTab === 'buy' ? firstTokenId : secondTokenId;

      // Calculate minimum amount out with slippage
      const minAmountOut = new BigNumber(amountOut)

        .multipliedBy(1 - slippage / 100)
        .toFixed(0);

      console.log({
        minAmountOut
      });

      await swap({
        contract: address as string,
        tokenIn,
        tokenOut,
        amountOut: minAmountOut,
        amountIn: data.amount,
        initialSwap: isInitialSwap
      });
    } catch (error) {
      console.error('Swap failed:', error);
    }
  };

  return (
    <div className='bg-gray-800 rounded-lg p-4 space-y-4'>
      {/* Tabs */}
      <div className='flex gap-2'>
        <button
          className={cn(
            'flex-1 py-2 rounded transition-colors',
            activeTab === 'buy'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          )}
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
        <button
          className={cn(
            'flex-1 py-2 rounded transition-colors',
            activeTab === 'sell'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          )}
          onClick={() => setActiveTab('sell')}
        >
          Sell
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          {/* Display user's balance */}
          <div className='flex justify-end text-sm text-gray-400'>
            Balance:{' '}
            {(() => {
              const relevantToken =
                activeTab === 'buy' ? secondAccountToken : firstAccountToken;
              if (!relevantToken?.balance || !relevantToken?.decimals)
                return '0';

              // Format display balance with fewer decimals for UI
              const balance = new BigNumber(relevantToken.balance)
                .div(new BigNumber(10).pow(relevantToken.decimals))
                .toFormat(6); // Show only 6 decimal places for display

              return balance;
            })()}{' '}
            {formatTokenI(activeTab === 'buy' ? secondTokenId : firstTokenId)}
          </div>

          <TokenAmount
            tokenId={activeTab === 'buy' ? secondTokenId : firstTokenId}
            value={amount}
            onChange={(e) => setValue('amount', e.target.value)}
          />

          {/* Percentage buttons */}
          <div className='grid grid-cols-4 gap-2'>
            {PERCENTAGE_OPTIONS.map((percentage) => (
              <button
                key={percentage}
                type='button'
                className='bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded text-sm'
                onClick={() => handlePercentageClick(percentage)}
              >
                {percentage}%
              </button>
            ))}
          </div>
        </div>

        {/* Estimated output amount */}
        <div className='bg-gray-700 p-3 rounded'>
          <div className='flex justify-between mb-2'>
            <p className='text-sm text-gray-400'>
              You will receive (estimated):
            </p>
            <div className='flex gap-2'>
              <button
                type='button'
                className={cn(
                  'px-2 py-1 rounded text-xs',
                  slippage === 0.5 ? 'bg-green-500' : 'bg-gray-600'
                )}
                onClick={() => setSlippage(0.5)}
              >
                0.5%
              </button>
              <button
                type='button'
                className={cn(
                  'px-2 py-1 rounded text-xs',
                  slippage === 1 ? 'bg-green-500' : 'bg-gray-600'
                )}
                onClick={() => setSlippage(1)}
              >
                1%
              </button>
            </div>
          </div>
          <p className='text-lg font-medium'>
            {isLoadingAmountOut ? (
              'Calculating...'
            ) : (
              <>
                {new BigNumber(amountOut || '0')
                  .div(10 ** 18)
                  .multipliedBy(1 - slippage / 100)
                  .toNumber()
                  .toLocaleString()}{' '}
                {formatTokenI(
                  activeTab === 'buy' ? firstTokenId : secondTokenId
                )}
              </>
            )}
          </p>
        </div>

        <button
          type='submit'
          disabled={isSubmitting || !amount}
          className={cn(
            'w-full py-3 rounded font-medium',
            amount
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          )}
        >
          {isSubmitting ? 'Processing...' : 'Trade'}
        </button>
      </form>
    </div>
  );
};
