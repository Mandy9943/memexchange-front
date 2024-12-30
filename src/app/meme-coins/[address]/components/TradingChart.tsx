'use client';

import dynamic from 'next/dynamic';

const TVChartContainer = dynamic(() => import('./Chart'), {
  ssr: false
});

interface TradingChartProps {
  tokenIdentifier: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({
  tokenIdentifier
}) => {
  return (
    <div className='w-full h-[400px]'>
      <TVChartContainer tokenIdentifier={tokenIdentifier} />
    </div>
  );
};
