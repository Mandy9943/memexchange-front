'use client';

import dynamic from 'next/dynamic';

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), {
  ssr: false
});

interface TradingChartProps {
  address: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ address }) => {
  return (
    <div className='w-full h-[400px]'>
      <TradingViewWidget symbol={address} />
    </div>
  );
};
