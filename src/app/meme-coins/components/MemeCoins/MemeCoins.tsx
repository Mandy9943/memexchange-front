import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useBondingPair } from '@/hooks/useBondingPair';
import {
  getBondingPairs,
  searchBondingPairs
} from '@/services/rest/backendApi/bonding-pair';
import { BondingPair } from '@/types/bondingPairsTypes';
import { formatAddress } from '@/utils/mx-utils';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { trendingBondingAddress } from '../../const';
import Header from '../Header';
import BondingCurveProgress from './components/BondingCurveProgress';
import MarketCap from './components/MarketCap';

function MemeCoins() {
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setOffset(0); // Reset pagination when search changes
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Effect for state filter changes
  useEffect(() => {
    setOffset(0); // Reset pagination when filter changes
  }, [stateFilter]);

  // Determine if we should use search or regular fetch
  const shouldUseSearch = debouncedQuery !== '' || stateFilter !== '';

  // Regular bonding pairs fetch
  const { data: regularBondingPairs, isLoading: isLoadingRegular } = useSWR(
    !shouldUseSearch ? [`/bonding-pairs`, offset] : null,
    () => getBondingPairs(limit, offset),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false
    }
  );

  // Search bonding pairs fetch
  const { data: searchResults, isLoading: isLoadingSearch } = useSWR(
    shouldUseSearch
      ? [`/bonding-pairs/search`, debouncedQuery, stateFilter, offset]
      : null,
    () => {
      return searchBondingPairs({
        query: debouncedQuery,
        state: stateFilter || undefined,
        limit,
        offset
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false
    }
  );

  // Combined data
  const bondingPairs = shouldUseSearch ? searchResults : regularBondingPairs;
  const isLoading = shouldUseSearch ? isLoadingSearch : isLoadingRegular;

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

  const handleClearFilters = () => {
    setSearchQuery('');
    setStateFilter('');
    setOffset(0);
  };

  return (
    <div className=''>
      <Header />

      {/* Search and Filter Bar */}
      <div className='mb-6 px-4 sm:px-0 max-w-5xl mx-auto'>
        <div className='bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 rounded-lg p-4 shadow-lg'>
          <div className='flex flex-col sm:flex-row gap-3'>
            <div className='flex-1 relative'>
              <Input
                type='text'
                placeholder='Search by name, address, or token...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 pr-10'
              />
              {searchQuery && (
                <button
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white'
                  onClick={() => setSearchQuery('')}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18'></line>
                    <line x1='6' y1='6' x2='18' y2='18'></line>
                  </svg>
                </button>
              )}
            </div>
            <div className='w-full sm:w-48'>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className='bg-neutral-900 border-neutral-700 text-white'>
                  <SelectValue placeholder='Filter by state' />
                </SelectTrigger>
                <SelectContent className='bg-neutral-800 border-neutral-700 text-white'>
                  {/* <SelectItem value=''>All States</SelectItem> */}
                  <SelectItem value='Active'>Active</SelectItem>
                  <SelectItem value='Finished'>Finished</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(searchQuery || stateFilter) && (
              <Button
                variant='outline'
                onClick={handleClearFilters}
                className='border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white'
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && !bondingPairs && (
        <div className='flex justify-center items-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
        </div>
      )}

      {/* No Results State */}
      {bondingPairs && bondingPairs.items.length === 0 && (
        <div className='text-center py-12 px-4'>
          <div className='bg-neutral-800/50 border border-neutral-700 rounded-lg p-8 max-w-md mx-auto'>
            <div className='text-5xl mb-4'>🔍</div>
            <h3 className='text-xl font-semibold text-white mb-2'>
              No coins found
            </h3>
            <p className='text-neutral-400 mb-6'>
              We couldn&apos;t find any coins matching your search criteria.
            </p>
            <Button
              onClick={handleClearFilters}
              className='bg-purple-600 hover:bg-purple-700 text-white'
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {bondingPairs && bondingPairs.items.length > 0 && (
        <div className='flex-1'>
          {/* Trending Coin - Only show when not searching/filtering */}
          {!shouldUseSearch && !errorBondingPair && bondingPair && (
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

          {/* Search Results Summary */}
          {shouldUseSearch && bondingPairs && (
            <div className='mb-4 px-4 sm:px-0'>
              <div className='text-neutral-300 text-sm'>
                Found{' '}
                <span className='font-semibold text-white'>
                  {bondingPairs.total}
                </span>{' '}
                coins
                {debouncedQuery && (
                  <span>
                    {' '}
                    matching &quot;
                    <span className='text-purple-400'>{debouncedQuery}</span>
                    &quot;
                  </span>
                )}
                {stateFilter && (
                  <span>
                    {' '}
                    with state{' '}
                    <span className='text-purple-400'>{stateFilter}</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Regular Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full'>
            {bondingPairs?.items.map((coin, idx) => (
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
                          {formatAddress(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (coin as any)?.creator?.address ||
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (coin as any)?.creator
                          )}
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
          </div>

          {/* Pagination Controls */}
          <div className='flex justify-center mt-8 mb-8'>
            {bondingPairs.hasMore && (
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                variant='outline'
                className='text-white hover:bg-neutral-700'
              >
                {isLoading ? (
                  <span className='flex items-center'>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Load More'
                )}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MemeCoins;
