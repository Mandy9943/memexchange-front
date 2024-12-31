import ActionCards from './components/ActionCards';
import HeroSection from './components/HeroSection';
import Leaderboard from './components/Leaderboard';

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col w-full max-w-6xl mx-auto pb-16'>
      <main className='flex-1'>
        <div className='bg-[linear-gradient(135deg,_#06c,_#0052a3)] w-full py-9 flex justify-center flex-col items-center rounded-t-xl'>
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
