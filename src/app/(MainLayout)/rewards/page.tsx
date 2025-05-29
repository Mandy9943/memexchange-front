'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Image from 'next/image';
import ActionCards from '../components/ActionCards';
import HeroSection from '../components/HeroSection';
import Leaderboard from '../components/Leaderboard';

export default function RewardsPage() {
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
          <Accordion
            type='single'
            collapsible
            className='w-full max-w-3xl px-4'
          >
            <AccordionItem value='how-it-works' className='border-neutral-700'>
              <AccordionTrigger className='text-white hover:text-green-400'>
                How it Works
              </AccordionTrigger>
              <AccordionContent className='text-neutral-300'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-semibold text-white mb-2'>
                      Daily Tasks
                    </h3>
                    <p className='text-sm'>
                      Complete tasks shown in the cards below to earn points.
                      Some tasks like connecting wallet, buying meme coins, or
                      creating coins reset daily. Missing a day&apos;s tasks
                      means those points cannot be recovered.
                    </p>
                  </div>

                  <div>
                    <h3 className='font-semibold text-white mb-2'>
                      Weekly Rewards
                    </h3>
                    <p className='text-sm'>
                      Points reset every week, and rewards are distributed to
                      top performers.
                    </p>
                  </div>

                  <div>
                    <h3 className='font-semibold text-white mb-2'>
                      Claiming Rewards
                    </h3>
                    <p className='text-sm'>
                      If you&apos;re a winner:
                      <ul className='list-disc list-inside mt-2 space-y-1'>
                        <li>
                          You must be subscribed to{' '}
                          <a
                            href='https://x.com/mem_exchange'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-green-400 hover:text-green-300'
                          >
                            @mem_exchange on X
                          </a>
                        </li>
                        <li>
                          Contact us through the Telegram group or send a
                          private message
                        </li>
                        <li>
                          We&apos;ll verify your X subscription before sending
                          rewards
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className='max-w-6xl bg-[#1e222d] mx-auto px-4 py-8'>
          <ActionCards />
        </div>
      </main>
    </div>
  );
}
