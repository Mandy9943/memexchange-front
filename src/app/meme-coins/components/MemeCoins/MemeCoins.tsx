import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getBondingPairs } from '@/services/rest/backendApi/bonding-pair';
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

  return (
    <div className=''>
      <Header />

      {bondingPairs && bondingPairs.items.length > 0 && (
        <div className='flex-1'>
          <div className='flex flex-col gap-4 sm:gap-8 w-full'>
            {bondingPairs.items.map((coin, idx) => (
              <Link href={`/meme-coins/${coin.address}`} key={idx}>
                <Card
                  key={idx}
                  className='bg-neutral-800 border border-neutral-700 p-3 sm:p-4 hover:bg-neutral-700 transition-all'
                >
                  <div className='flex items-center gap-2 sm:gap-4'>
                    {coin.coin && (
                      <Image
                        src={coin.coin?.imageUrl}
                        alt={coin.coin?.name}
                        width={100}
                        height={100}
                        className='w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]'
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
                            <p className='text-xs sm:text-sm text-neutral-400 mt-1 line-clamp-2 break-words break-all'>
                              {coin.coin.description.length > 100
                                ? `${coin.coin.description.substring(
                                    0,
                                    100
                                  )}...`
                                : coin.coin.description}
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
                          {coin.address}
                        </p>
                      </div>
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
