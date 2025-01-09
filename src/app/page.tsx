import Image from 'next/image';
import ActionCards from './components/ActionCards';
import HeroSection from './components/HeroSection';
import Leaderboard from './components/Leaderboard';

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col w-full max-w-6xl mx-auto pb-16'>
      <main className='flex-1'>
        <div className='bg-[linear-gradient(135deg,_#071001,_#0f2b04)] w-full py-9 flex justify-center flex-col items-center rounded-t-xl'>
          <Image
            src='/mxc-logo.webp'
            alt='MemExchange Logo'
            width={128}
            height={128}
            className='mb-6'
          />
          <HeroSection />
          <Leaderboard />
        </div>
        <div className='max-w-6xl bg-[#1e222d] mx-auto px-4 py-8 '>
          <ActionCards />
        </div>
      </main>
    </div>
  );
}
