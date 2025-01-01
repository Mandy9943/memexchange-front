'use client';

import { RouteNamesEnum } from '@/localConstants';
import { fetchAxios } from '@/services/rest/backendApi';
import { issueLpToken, setLocalRoles } from '@/services/sc/bonding/call';
import { PageWrapper } from '@/wrappers/PageWrapper';
import Cookies from 'js-cookie';
import { Info, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

interface Token {
  id: number;
  address: string;
  firstToken: string;
  secondToken: string;
  state: 'Inactive' | 'PartialActive' | 'PendingAddLiquidity' | 'Active';
  createdAt: string;
  coin?: {
    name: string;
    imageUrl: string;
    description: string;
  };
}

export default function TokensPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: tokens, isLoading } = useSWR('/users/user-tokens', (key) =>
    fetchAxios<Token[]>(key, {
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-token')}`
      }
    })
  );

  const filteredTokens = tokens?.filter((token) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      token.firstToken.toLowerCase().includes(searchLower) ||
      token.coin?.name.toLowerCase().includes(searchLower)
    );
  });

  const renderActionButton = (token: Token) => {
    console.log(token);

    switch (token.state) {
      case 'Inactive':
        return (
          <button
            className='mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'
            onClick={() => {
              console.log(token.address);

              issueLpToken({
                contract: token.address
              });
            }}
          >
            Config Xexchange
          </button>
        );
      case 'PartialActive':
        return (
          <button
            className='mt-4 w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors'
            onClick={() =>
              setLocalRoles({
                contract: token.address
              })
            }
          >
            Enable Swaps
          </button>
        );
      default:
        return null;
    }
  };

  const TokenCard = (token: Token) => {
    const cardContent = (
      <div
        className={`border border-gray-800 rounded-lg p-4 bg-gray-900/50 
          ${
            token.state === 'PendingAddLiquidity'
              ? 'cursor-pointer hover:bg-gray-900/80'
              : 'hover:bg-gray-900'
          } 
          transition-colors relative group`}
      >
        <div className='flex items-start gap-3'>
          {token.coin?.imageUrl && (
            <img
              src={token.coin.imageUrl}
              alt={token.coin.name}
              className='w-12 h-12 flex-shrink-0 rounded-full'
            />
          )}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between gap-2'>
              <h3 className='font-semibold text-lg truncate'>
                {token.firstToken}
              </h3>
              <span
                className={`flex-shrink-0 px-2 py-1 rounded text-xs flex items-center gap-1.5 ${
                  token.state === 'Active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {token.state === 'PendingAddLiquidity'
                  ? 'InitialSwap'
                  : token.state}
                {token.state === 'PendingAddLiquidity' && (
                  <div className='relative'>
                    <Info className='w-4 h-4 cursor-help' />
                    <div
                      className='absolute right-0 w-64 p-3 bg-gray-800 rounded-lg shadow-xl 
                        invisible group-hover:visible opacity-0 group-hover:opacity-100 
                        transition-all duration-200 text-xs text-gray-200 z-10 
                        transform translate-x-2 -translate-y-full'
                    >
                      To activate this token, click here and make an initial
                      swap. This will enable the coin for other users.
                    </div>
                  </div>
                )}
              </span>
            </div>
            {token.coin && (
              <p className='text-sm text-gray-400 truncate'>
                {token.coin.name}
              </p>
            )}
          </div>
        </div>

        <div className='mt-3'>
          <p className='text-sm text-gray-400 truncate' title={token.address}>
            Address: {token.address}
          </p>
          <p className='text-sm text-gray-400'>
            Pair: {token.firstToken} / {token.secondToken}
          </p>
          <p className='text-sm text-gray-400'>
            Created: {new Date(token.createdAt).toLocaleDateString()}
          </p>
        </div>

        {renderActionButton(token)}
      </div>
    );

    return token.state === 'PendingAddLiquidity' || token.state === 'Active' ? (
      <Link
        href={`${RouteNamesEnum.memeCoins}/${token.address}`}
        key={token.id}
      >
        {cardContent}
      </Link>
    ) : (
      <div key={token.id}>{cardContent}</div>
    );
  };

  return (
    <PageWrapper>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <h1 className='text-2xl font-bold'>My Tokens</h1>
            <div className='relative w-full sm:w-auto min-w-[250px]'>
              <input
                type='text'
                placeholder='Search tokens...'
                className='w-full pl-10 pr-4 py-2 border border-gray-800 rounded-lg bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            </div>
          </div>

          <div className='min-h-[300px]'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {isLoading ? (
                <div className='col-span-full text-center py-10 text-gray-400'>
                  Loading tokens...
                </div>
              ) : tokens?.length === 0 ? (
                <div className='col-span-full text-center py-10 text-gray-400'>
                  No tokens found. Create your first token to get started.
                </div>
              ) : filteredTokens?.length === 0 ? (
                <div className='col-span-full text-center py-10 text-gray-400'>
                  No tokens found matching &quot;{searchTerm}&quot;
                </div>
              ) : (
                filteredTokens?.map((token) => (
                  <TokenCard key={token.id} {...token} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
