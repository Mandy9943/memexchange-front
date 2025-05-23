'use client';

import { ZoomableImage } from '@/components/ZoomableImage';
import { useBondingPair } from '@/hooks/useBondingPair';
import { fetchAllBondingData } from '@/services/sc/degen_master/queries';
import { formatTokenI } from '@/utils/mx-utils';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import BondingCurveProgress from '../components/MemeCoins/components/BondingCurveProgress';
import MarketCap from '../components/MemeCoins/components/MarketCap';
import HoldersList from './components/HoldersList/HoldersList';
import LoadingSkeleton from './components/LoadingEffect';
import { TradeHistory } from './components/TradeHistory';
import { Trading } from './components/Trading';
import { TradingChart } from './components/TradingChart';

const MemeCoinClientPage = () => {
  const { address } = useParams();
  const bondingAddress = address as string;

  const { bondingPair } = useBondingPair(bondingAddress);

  const { data: bondingData, isLoading } = useSWR(
    'master:getAllBondingData',
    fetchAllBondingData
  );

  const scBondingPair = bondingData?.find(
    (bonding) => bonding.address === bondingAddress
  );

  const [activeTab, setActiveTab] = useState('trades');

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
      <div className='w-full mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left column with chart */}
          {bondingPair?.firstToken && (
            <div className='lg:col-span-2 bg-gray-800 rounded-lg p-4 flex flex-col gap-4'>
              <TradingChart tokenIdentifier={bondingPair?.firstToken} />

              <div className='flex flex-col gap-4'>
                <div className='flex gap-2 border-b border-gray-700'>
                  <button
                    onClick={() => setActiveTab('trades')}
                    className={`px-4 py-2 font-medium ${
                      activeTab === 'trades'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Trade History
                  </button>
                  <button
                    onClick={() => setActiveTab('holders')}
                    className={`px-4 py-2 font-medium ${
                      activeTab === 'holders'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Holders
                  </button>
                </div>

                {activeTab === 'trades' ? (
                  <TradeHistory tokenIdentifier={bondingPair.firstToken} />
                ) : (
                  <HoldersList
                    tokenIdentifier={scBondingPair.firstTokenId}
                    contractAddress={bondingAddress}
                    dev={bondingPair.creator.address}
                  />
                )}
              </div>
            </div>
          )}

          {/* Right column with details */}
          <div className='space-y-4'>
            {/* Token Info Card */}
            <div className='bg-gray-800 rounded-lg p-4 space-y-4'>
              <div className='flex flex-col items-center gap-4'>
                {bondingPair?.coin?.imageUrl && (
                  <div className='w-32 h-32'>
                    <ZoomableImage
                      src={bondingPair.coin.imageUrl}
                      alt={bondingPair.coin.name}
                    />
                  </div>
                )}
                <div className='text-center'>
                  <h1 className='text-2xl font-bold'>
                    {formatTokenI(scBondingPair.firstTokenId)}
                  </h1>
                  {bondingPair?.coin?.description && (
                    <p className='text-gray-400 text-sm mt-2 max-w-md mx-auto break-words'>
                      {bondingPair.coin.description
                        .split(/\s+/)
                        .map((word, index) => {
                          if (word.match(/^(https?:\/\/[^\s]+)/)) {
                            return (
                              <a
                                key={index}
                                href={word}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-400 hover:text-blue-300 hover:underline inline-block max-w-[200px] truncate align-bottom'
                                title={word}
                              >
                                {word}{' '}
                              </a>
                            );
                          }
                          return word + ' ';
                        })}
                    </p>
                  )}
                </div>
              </div>

              <MarketCap bondingAddress={bondingAddress} />
              <BondingCurveProgress
                bondingAddress={bondingAddress}
                isFinished={bondingPair?.state === 'Finished'}
              />
              <div
                className='text-sm text-green-400 flex gap-2 cursor-pointer overflow-hidden'
                onClick={() => {
                  navigator.clipboard.writeText(address as string);
                  toast.success('Address copied to clipboard!');
                }}
              >
                <span className='flex-shrink-0'>Address:</span>
                <span className='truncate'>{address}</span>
              </div>
            </div>

            {/* Trading Component */}
            {bondingPair?.state === 'Finished' ? (
              <div className='bg-gray-800 rounded-lg p-4'>
                <div className='text-center'>
                  <h3 className='text-xl font-semibold text-yellow-400 mb-2'>
                    Trading Disabled
                  </h3>
                  <p className='text-gray-400'>
                    This token has been migrated to xExchange. Please visit
                    xExchange to trade this token.
                  </p>
                </div>
              </div>
            ) : (
              <Trading
                firstTokenId={scBondingPair.firstTokenId}
                secondTokenId={scBondingPair.secondTokenId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemeCoinClientPage;
