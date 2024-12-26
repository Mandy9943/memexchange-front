'use client';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RouteNamesEnum } from '@/localConstants';
import Image from 'next/image';
import Link from 'next/link';
const memeCoins = [
  {
    name: 'AICG',
    badge: 'TOP MARKET CAP',
    marketCap: '$3,779',
    bondingCurve: '2.957%',
    address: 'EQDqDQeR2vqIY-wqDJEihW-Kv2xWEYjajOpZ5GtAvkPxBM3w',
    image:
      'https://cache.tonapi.io/imgproxy/nEQsTFtvT8UgnedtcSWUi4DvvcsR5ULfajGbMrH6baw/rs:fill:200:200:1/g:no/aHR0cHM6Ly9hcHBpbmNvaW4uZnJhMS5jZG4uZGlnaXRhbG9jZWFuc3BhY2VzLmNvbS91cGxvYWRzLzE3MzM3NjgxMDAwODUtb2x1b2NvLmpwZw.webp'
  },
  {
    name: 'TRGC',
    marketCap: '$3,358',
    bondingCurve: '0.772%',
    address: 'EQAt4QbaR51uf1n_LdU6d1M1BvCLXWHxk5Xxp81hpDtxS9v',
    image:
      'https://cache.tonapi.io/imgproxy/5jFem9HRG2qfeLlJLdyddp9uiqmR4rwYt8MJ7HlfVLI/rs:fill:200:200:1/g:no/aHR0cHM6Ly9hcHBpbmNvaW4uZnJhMS5jZG4uZGlnaXRhbG9jZWFuc3BhY2VzLmNvbS91cGxvYWRzLzE3MzQ4ODc0NTA3MjMteHhrbGkuanBn.webp'
  },
  {
    name: 'BDTTK',
    marketCap: '$3,262',
    bondingCurve: '0.274%',
    address: 'EQCSsPx0iC9r3UvV3oxButcnQGSuru7i68khL_SCcLGlM5S6',
    image:
      'https://cache.tonapi.io/imgproxy/5jFem9HRG2qfeLlJLdyddp9uiqmR4rwYt8MJ7HlfVLI/rs:fill:200:200:1/g:no/aHR0cHM6Ly9hcHBpbmNvaW4uZnJhMS5jZG4uZGlnaXRhbG9jZWFuc3BhY2VzLmNvbS91cGxvYWRzLzE3MzQ4ODc0NTA3MjMteHhrbGkuanBn.webp'
  }
];

const page = () => {
  return (
    <Card className='bg-[#1e222d] w-full max-w-6xl mx-auto py-6 px-8'>
      <MemeCoins />
    </Card>
  );
};

export default page;

function MemeCoins() {
  // useEffect(() => {
  //   scQuery('master', 'getAllBondingMetadata').then((res) => {
  //     console.log(
  //       res?.firstValue
  //         ?.valueOf()
  //         .map((item) => ({ ...item, address: item.address.bech32() }))
  //     );
  //   });
  // }, []);
  return (
    <div className=''>
      <div className='flex items-center mb-4'>
        <h2 className='text-2xl text-white font-semibold text-center w-full'>
          Meme Coins
        </h2>
      </div>
      <Link href={RouteNamesEnum.createCoin} className='hover:underline'>
        <p className='text-blue-400 mb-4 text-center'>
          Create your meme coin just for 0.01 EGLD
        </p>
      </Link>
      <div className='flex flex-col gap-8'>
        {memeCoins.map((coin, idx) => (
          <Link href={`/meme-coins/${coin.address}`} key={idx}>
            <Card
              key={idx}
              className='bg-neutral-800 border border-neutral-700 p-4 hover:bg-neutral-700 transition-all'
            >
              <div className='flex items-center gap-4'>
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={100}
                  height={100}
                />
                <div className='flex flex-1 text-white flex-col'>
                  <div>
                    <p className='text-lg font-semibold'>{coin.name}</p>
                  </div>
                  <div className='mb-1'>
                    <p className='text-xs text-green-500 mb-[4px]'>
                      Market Cap: {coin.marketCap}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Bonding curve: {coin.bondingCurve}
                    </p>
                  </div>

                  <Progress value={33} className='bg-neutral-700/50 mb-2' />

                  <p className='text-sm text-muted-foreground'>
                    {coin.address}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
