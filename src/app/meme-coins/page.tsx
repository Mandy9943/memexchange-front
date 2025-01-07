'use client';
import { Card } from '@/components/ui/card';
import MemeCoins from './components/MemeCoins/MemeCoins';

const MemeCoinsPage = () => {
  return (
    <Card className='bg-[#1e222d] w-full max-w-6xl mx-auto py-6 px-8'>
      <MemeCoins />
    </Card>
  );
};

export default MemeCoinsPage;
