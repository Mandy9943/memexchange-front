import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getBondingPairs } from '@/services/rest/backendApi/bonding-pair';
import { BondingPair } from '@/types/bondingPairsTypes';
import { Share } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
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

  return (
    <div className=''>
      <Header />

      {bondingPairs && bondingPairs.items.length > 0 && (
        <div className='flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full'>
            {bondingPairs.items.map((coin, idx) => (
              <Link href={`/meme-coins/${coin.address}`} key={idx}>
                <Card
                  key={idx}
                  className='bg-neutral-800 border border-neutral-700 hover:border-neutral-600 p-3 sm:p-4  transition-all overflow-hidden'
                >
                  <div className='flex flex-col h-full'>
                    <div className='flex gap-2 sm:gap-4'>
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
                                          className='text-blue-400 hover:text-blue-300 hover:underline inline-block max-w-[100px] sm:max-w-[200px] truncate align-bottom'
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

                          <p className='text-xs sm:text-sm text-muted-foreground break-all'>
                            <span className='hidden sm:inline'>
                              {coin.address}
                            </span>
                            <span className='sm:hidden'>
                              {coin.address.substring(0, 8)}...
                              {coin.address.substring(coin.address.length - 8)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='mt-2 flex justify-end'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-neutral-400 hover:text-white hover:bg-neutral-600'
                        onClick={(e) => handleShare(e, coin)}
                      >
                        <Share className='w-4 h-4 mr-2' />
                        Share on X
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
