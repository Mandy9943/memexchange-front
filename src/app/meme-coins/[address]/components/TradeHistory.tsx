'use client';

import { getTokenTrades } from '@/services/rest/backendApi/swap';
import { formatAddress, formatNumber } from '@/utils/mx-utils';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import useSWR from 'swr';

interface TradeHistoryProps {
  tokenIdentifier: string;
}

export const TradeHistory = ({ tokenIdentifier }: TradeHistoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    [`/swaps/token/${tokenIdentifier}`, currentPage],
    () => getTokenTrades(tokenIdentifier, currentPage)
  );

  if (isLoading) {
    return (
      <div className='bg-gray-800 rounded-lg p-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-700 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            <div className='h-10 bg-gray-700 rounded'></div>
            <div className='h-10 bg-gray-700 rounded'></div>
            <div className='h-10 bg-gray-700 rounded'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-gray-800 rounded-lg p-4'>
        <p className='text-red-400'>Failed to load trade history</p>
      </div>
    );
  }

  const trades = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className='bg-gray-800 rounded-lg p-4'>
      <h2 className='text-xl font-semibold mb-4'>Recent Trades</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full'>
          <thead>
            <tr className='text-gray-400 text-sm'>
              <th className='text-left py-2 px-4'>Type</th>
              <th className='text-left py-2 px-4'>Address</th>
              <th className='text-right py-2 px-4'>Amount</th>
              <th className='text-right py-2 px-4'>Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <tr
                key={index}
                className='border-t border-gray-700 hover:bg-gray-700/50'
              >
                <td className='py-3 px-4'>
                  <span
                    className={`inline-block px-3 py-1 rounded text-sm ${
                      trade.type === 'buy'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td className='py-3 px-4'>
                  <span className='text-gray-400'>
                    {formatAddress(trade.address)}
                  </span>
                </td>
                <td className='text-right py-3 px-4'>
                  {formatNumber(trade.amount)}
                </td>
                <td className='text-right py-3 px-4 text-gray-400'>
                  {formatDistanceToNow(new Date(trade.timestamp * 1000), {
                    addSuffix: true
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pagination && pagination.totalPages > 1 && (
          <div className='mt-4 flex items-center justify-between px-4'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className='px-4 py-2 text-sm rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Previous
            </button>
            <span className='text-gray-400'>
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, pagination.totalPages)
                )
              }
              disabled={currentPage === pagination.totalPages}
              className='px-4 py-2 text-sm rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
