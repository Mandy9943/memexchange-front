import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBondingPair } from '@/hooks/useBondingPair';
import { getBondingPairs } from '@/services/rest/backendApi/bonding-pair';
import { BondingPair } from '@/types/bondingPairsTypes';
import { formatAddress } from '@/utils/mx-utils';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { trendingBondingAddress } from '../../const';
import Header from '../Header';
import BondingCurveProgress from './components/BondingCurveProgress';
import MarketCap from './components/MarketCap';

function MemeCoins() {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data: bondingPairs, isLoading } = useSWR(
    [`/bonding-pairs`, offset],
    () => getBondingPairs(limit, offset)
  );

  const {
    bondingPair,
    isLoading: isLoadingBondingPair,
    error: errorBondingPair
  } = useBondingPair(trendingBondingAddress);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  const handleShare = (e: React.MouseEvent, coin: BondingPair) => {
    e.preventDefault();
    const message = `Check out ${coin.coin?.name} on MemExchange!\n\n`;
    const url = `${window.location.origin}/meme-coins/${coin.address}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        message
      )}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };
  console.log(bondingPairs);

  return (
    <div className=''>
      <Header />

      {bondingPairs && bondingPairs.items.length > 0 && (
        <div className='flex-1'>
          {/* Trending Coin */}
          {!errorBondingPair && bondingPair && (
            <div className='mb-4 sm:mb-8 px-4 sm:px-0'>
              <Link href={`/meme-coins/${bondingPair?.address}`}>
                <Card className='bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-blue-900/90 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-400/50 p-3 sm:p-4 transition-all overflow-hidden relative w-full sm:max-w-xl mx-auto rounded-xl shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-1'>
                  <div className='absolute -right-16 sm:-right-14 top-4 sm:top-6 rotate-45 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-12 py-0.5 sm:py-1 text-xs sm:text-sm font-bold text-white shadow-lg'>
                    🔥 TRENDING
                  </div>
                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    {isLoadingBondingPair ? (
                      <>
                        <div className='relative self-center sm:self-auto'>
                          <div className='w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-lg bg-purple-800/30 animate-pulse'></div>
                        </div>
                        <div className='flex-1 text-center sm:text-left space-y-2'>
                          <div className='h-6 w-32 bg-purple-800/30 rounded animate-pulse'></div>
                          <div className='h-4 w-full max-w-[280px] bg-purple-800/30 rounded animate-pulse'></div>
                          <div className='h-12 w-full bg-purple-800/30 rounded animate-pulse mt-2'></div>
                          <div className='h-4 w-full bg-purple-800/30 rounded animate-pulse mt-2'></div>
                        </div>
                      </>
                    ) : (
                      <>
                        {bondingPair?.coin && (
                          <div className='relative self-center sm:self-auto'>
                            <div className='absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur-lg opacity-40 animate-pulse'></div>
                            <Image
                              src={bondingPair.coin.imageUrl}
                              alt={bondingPair.coin.name}
                              width={90}
                              height={90}
                              className='w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-lg relative z-10 ring-2 ring-purple-400/30'
                              quality={100}
                            />
                          </div>
                        )}
                        <div className='flex-1 text-center sm:text-left'>
                          <p className='text-base sm:text-lg font-bold bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 text-transparent bg-clip-text'>
                            {bondingPair?.coin?.name}
                          </p>
                          {bondingPair?.coin?.description && (
                            <p className='text-purple-100/80 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2'>
                              {bondingPair.coin.description}
                            </p>
                          )}
                          <div className='mt-2 sm:mt-3 bg-purple-900/30 rounded-lg p-1.5 sm:p-2'>
                            <MarketCap
                              bondingAddress={bondingPair?.address || ''}
                            />
                          </div>
                          <div className='mt-2'>
                            <BondingCurveProgress
                              bondingAddress={bondingPair?.address || ''}
                              isFinished={bondingPair?.state === 'Finished'}
                              removeText
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {/* Regular Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full'>
            {bondingPairs.items.map((coin, idx) => (
              <Link href={`/meme-coins/${coin.address}`} key={idx}>
                <Card
                  key={idx}
                  className={`bg-neutral-800 border h-full border-neutral-700 hover:border-neutral-600 p-3 sm:p-4 transition-all overflow-hidden relative
                    `}
                >
                  <div className='flex flex-col h-full'>
                    <div className='flex gap-2 flex-1 sm:gap-4'>
                      {coin.coin && (
                        <Image
                          src={coin.coin?.imageUrl}
                          alt={coin.coin?.name}
                          width={100}
                          height={100}
                          className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-md'
                          quality={100}
                        />
                      )}
                      <div className='flex-1'>
                        <div className='flex flex-1 text-white flex-col w-full'>
                          <div>
                            <p className='text-base sm:text-lg font-semibold'>
                              {coin.coin?.name}
                            </p>
                            {coin.coin?.description && (
                              <p className='text-gray-400 text-sm mt-2 max-w-md mx-auto break-words line-clamp-5'>
                                {coin.coin.description
                                  .split(/\s+/)
                                  .map((word, index) => {
                                    if (word.match(/^(https?:\/\/[^\s]+)/)) {
                                      return (
                                        <a
                                          key={index}
                                          href={word}
                                          target='_blank'
                                          rel='noopener noreferrer'
                                          className='text-blue-400 hover:text-blue-300 hover:underline inline-block break-all align-bottom mr-2'
                                          title={word}
                                          onClick={(e) => e.stopPropagation()}
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
                          <div className='mb-1'>
                            <MarketCap bondingAddress={coin.address} />
                          </div>
                          <BondingCurveProgress
                            bondingAddress={coin.address}
                            isFinished={coin.state === 'Finished'}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='mt-2 flex items-center justify-between text-xs border-t border-neutral-700 pt-2'>
                      <div className='flex items-center gap-1.5 text-neutral-400'>
                        <div className='w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center text-[10px]'>
                          👤
                        </div>
                        <span className='hidden sm:inline'>
                          {formatAddress(coin.creator.address)}
                        </span>
                        <span className='sm:hidden'>
                          {formatAddress(coin.creator.address, 3, 5)}
                        </span>
                        <span className='text-neutral-500'>•</span>
                        <span>
                          {formatDistanceToNow(new Date(coin.createdAt))} ago
                        </span>
                      </div>

                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-neutral-400 hover:text-white hover:bg-neutral-600 h-7 px-2'
                        onClick={(e) => handleShare(e, coin)}
                      >
                        <svg
                          viewBox='0 0 24 24'
                          className='w-3.5 h-3.5 fill-current'
                          aria-hidden='true'
                        >
                          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}

            {/* Pagination Controls */}
            <div className='flex justify-center mt-4 mb-8'>
              {bondingPairs.hasMore && (
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  variant='outline'
                  className='text-white hover:bg-neutral-700'
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemeCoins;
