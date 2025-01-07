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
        <div className='flex flex-col gap-8'>
          {bondingPairs.items.map((coin, idx) => (
            <Link href={`/meme-coins/${coin.address}`} key={idx}>
              <Card
                key={idx}
                className='bg-neutral-800 border border-neutral-700 p-4 hover:bg-neutral-700 transition-all'
              >
                <div className='flex items-center gap-4'>
                  {coin.coin && (
                    <Image
                      src={coin.coin?.imageUrl}
                      alt={coin.coin?.name}
                      width={100}
                      height={100}
                    />
                  )}
                  <div className='flex flex-1 text-white flex-col'>
                    <div>
                      <p className='text-lg font-semibold'>{coin.coin?.name}</p>
                    </div>
                    <div className='mb-1'>
                      <MarketCap bondingAddress={coin.address} />
                    </div>
                    <BondingCurveProgress bondingAddress={coin.address} />

                    <p className='text-sm text-muted-foreground'>
                      {coin.address}
                    </p>
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
      )}
    </div>
  );
}

export default MemeCoins;
