'use client';

import { Progress } from '@/components/ui/progress';
import {
  fetchAllBondingData,
  fetchMaxSecondTokenReserve
} from '@/services/sc/degen_master/queries';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

const BondingCurveProgress = ({
  bondingAddress,
  isFinished
}: {
  bondingAddress: string;
  isFinished: boolean;
}) => {
  const {
    data: maxSecondTokenReserveReq,
    isLoading: isLoadingMaxSecondTokenReserve
  } = useSWR(`master::getMaxSecondTokenReserve`, fetchMaxSecondTokenReserve);

  const maxSecondTokenReserve = maxSecondTokenReserveReq || new BigNumber(0);

  const { data: bondingData, isLoading: isLoadingBondingData } = useSWR(
    'master:getAllBondingData',
    fetchAllBondingData
  );

  const bondingPair = bondingData?.find(
    (bonding) => bonding.address === bondingAddress
  );

  const secondTokenReserve = new BigNumber(
    bondingPair?.secondTokenReserve || 0
  );

  const progress = secondTokenReserve
    .div(maxSecondTokenReserve)
    .multipliedBy(100)
    .toNumber();

  const isLoading = isLoadingMaxSecondTokenReserve || isLoadingBondingData;

  if (isLoading) {
    return (
      <div>
        <p className='text-xs text-muted-foreground mb-1'>Loading...</p>
        <Progress value={0} className='bg-neutral-100/50 mb-2 animate-pulse' />
      </div>
    );
  }
  const progressValue = progress > 100 || isFinished ? 100 : progress;
  return (
    <>
      <div className='w-full'>
        <p className='text-xs text-muted-foreground mb-1'>
          Bonding curve: {progressValue.toLocaleString()}%
        </p>
        <Progress value={progressValue} className='bg-neutral-700/50 mb-2' />
      </div>
    </>
  );
};

export default BondingCurveProgress;
