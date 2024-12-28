import { Card } from '@/components/ui/card';
import { getBondingPairs } from '@/services/rest/backendApi/bonding-pair';
import MemeCoins from './components/MemeCoins/MemeCoins';

const MemeCoinsPage = async () => {
  const memeCoins = await getBondingPairs();
  console.log(memeCoins);

  return (
    <Card className='bg-[#1e222d] w-full max-w-6xl mx-auto py-6 px-8'>
      <MemeCoins bondingPairs={memeCoins} />
    </Card>
  );
};

export default MemeCoinsPage;
