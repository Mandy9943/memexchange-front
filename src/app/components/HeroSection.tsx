'use client';

import { Card } from '@/components/ui/card';
import { rewardService } from '@/services/rest/backendApi/reward';
import Cookies from 'js-cookie';
import useSWR from 'swr';
function HeroSection() {
  const { data, isLoading } = useSWR('/api/reward/isDoneConnectWallet', () =>
    rewardService.isDoneConnectWallet(Cookies.get('auth-token')!)
  );
  const idDone = data?.isDone;

  if (idDone || isLoading) {
    return;
  }

  return (
    <Card className='bg-neutral-800 text-white py-8 text-center max-w-md w-full border-none'>
      <div className='text-6xl font-bold mb-4'>5</div>

      <div className='text-lg mb-4'>
        <h2 className='animate-shake'>Claim your Points by</h2>
        <a href='#' className='underline hover:text-blue-200'>
          connecting wallet
        </a>
      </div>
    </Card>
  );
}

export default HeroSection;
