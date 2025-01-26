'use client';

import { Progress } from '@/components/ui/progress';
import { fetchAllBondingData } from '@/services/sc/degen_master/queries';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

const maxMarketCap = 4000 * 10 ** 6;

const BondingCurveProgress = ({
  bondingAddress
}: {
  bondingAddress: string;
}) => {
  const { data: bondingData } = useSWR(
    'master:getAllBondingData',
    fetchAllBondingData
  );

  const bondingPair = bondingData?.find(
    (bonding) => bonding.address === bondingAddress
  );

  const marketCap = new BigNumber(bondingPair?.marketCap || 0);

  const progress = marketCap.div(maxMarketCap).multipliedBy(100).toNumber();

  return (
    <>
      <div>
        <p className='text-xs text-muted-foreground mb-1'>
          Bonding curve: {progress.toLocaleString()}%
        </p>
        <Progress value={progress} className='bg-neutral-700/50 mb-2' />
      </div>
    </>
  );
};

export default BondingCurveProgress;
