'use client';
import { fetchAllBondingData } from '@/services/sc/degen_master/queries';
import BigNumber from 'bignumber.js';
import useSwr from 'swr';
const MarketCap = ({ bondingAddress }: { bondingAddress: string }) => {
  const { data: bondingData, isLoading } = useSwr(
    'master:getAllBondingData',
    fetchAllBondingData
  );

  const bondingPair = bondingData?.find(
    (bonding) => bonding.address === bondingAddress
  );

  if (isLoading) {
    return (
      <p className='text-xs text-green-500 '>
        <div className='animate-pulse bg-gray-400 rounded px-2 w-20 h-3'></div>
      </p>
    );
  }
  return (
    <p className='text-xs text-green-500 '>
      Market Cap: ${' '}
      {new BigNumber(bondingPair?.marketCap || 0)
        .div(1e6)
        .toNumber()
        .toLocaleString()}
    </p>
  );
};

export default MarketCap;
