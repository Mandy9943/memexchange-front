'use client';
import { Card } from '@/components/ui/card';
import MemeCoins from './components/MemeCoins/MemeCoins';

const MemeCoinsPage = () => {
  return (
    <Card className='bg-[#1e222d] w-full max-w-6xl mx-auto py-4 px-4 sm:py-6 sm:px-8'>
      <MemeCoins />
    </Card>
  );
};

export default MemeCoinsPage;
