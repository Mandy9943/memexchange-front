'use client';

import { ZoomableImage } from '@/components/ZoomableImage';
import { useBondingPair } from '@/hooks/useBondingPair';
import { fetchAllBondingData } from '@/services/sc/degen_master/queries';
import { formatTokenI } from '@/utils/mx-utils';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import BondingCurveProgress from '../components/MemeCoins/components/BondingCurveProgress';
import MarketCap from '../components/MemeCoins/components/MarketCap';
import HoldersList from './components/HoldersList/HoldersList';
import LoadingSkeleton from './components/LoadingEffect';
import { Trading } from './components/Trading';
import { TradingChart } from './components/TradingChart';

const CoinPage = () => {
  const { address } = useParams();
  const bondingAddress = address as string;

  const { bondingPair } = useBondingPair(bondingAddress);
  console.log(bondingPair);

  const { data: bondingData, isLoading } = useSWR(
    'master:getAllBondingData',
    fetchAllBondingData
  );

  const scBondingPair = bondingData?.find(
    (bonding) => bonding.address === bondingAddress
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!scBondingPair) {
    return (
      <div className='container mx-auto p-4'>
        <div className='bg-gray-800 rounded-lg p-8 text-center'>
          <h2 className='text-xl font-semibold text-red-400'>
            Bonding pair not found
          </h2>
          <p className='text-gray-400 mt-2'>
            The requested token could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left column with chart */}
          <div className='lg:col-span-2 bg-gray-800 rounded-lg p-4'>
            <TradingChart address={bondingAddress} />
          </div>

          {/* Right column with details */}
          <div className='space-y-4'>
            {/* Token Info Card */}
            <div className='bg-gray-800 rounded-lg p-4 space-y-4'>
              <div className='flex items-center gap-4'>
                {bondingPair?.coin?.imageUrl && (
                  <ZoomableImage
                    src={bondingPair.coin.imageUrl}
                    alt={bondingPair.coin.name}
                  />
                )}
                <div>
                  <h1 className='text-2xl font-bold'>
                    {formatTokenI(scBondingPair.firstTokenId)}
                  </h1>
                  {bondingPair?.coin?.description && (
                    <p className='text-gray-400 text-sm mt-1'>
                      {bondingPair.coin.description}
                    </p>
                  )}
                </div>
              </div>

              <MarketCap bondingAddress={bondingAddress} />
              <BondingCurveProgress bondingAddress={bondingAddress} />
              <div
                className='text-sm text-blue-400 flex gap-2 cursor-pointer'
                onClick={() => {
                  navigator.clipboard.writeText(address as string);
                  toast.success('Address copied to clipboard!');
                }}
              >
                Address: <span className='line-clamp-1'>{address}</span>
              </div>
            </div>

            {/* Trading Component */}
            <Trading
              firstTokenId={scBondingPair.firstTokenId}
              secondTokenId={scBondingPair.secondTokenId}
            />

            <HoldersList
              tokenIdentifier={scBondingPair.firstTokenId}
              contractAddress={bondingAddress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinPage;
