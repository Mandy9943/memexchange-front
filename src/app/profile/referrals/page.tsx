'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { network } from '@/config';
import { useAppSelector } from '@/hooks/useRedux';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { fetchReferrerUsers } from '@/services/sc/degen_master/queries';
import { Address } from '@/utils';
import { formatAddress } from '@/utils/mx-utils';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';

export default function ReferralsPage() {
  const address = useAppSelector(selectUserAddress);
  const { data, isLoading } = useSWR(`master:getReferrerUsers:${address}`, () =>
    fetchReferrerUsers(address)
  );
  const users = data?.map((user: Address) => user.bech32());

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/?referrer=${address}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  return (
    <PageWrapper>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        <div className='space-y-8'>
          {/* Header Section */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold mb-3 text-white'>My Referrals</h1>
            <p className='text-gray-400 text-lg'>
              Share your referral link and earn rewards when others create a new
              coin
            </p>
          </div>

          {/* How it Works Section */}
          <Card className='bg-neutral-800 hover:bg-neutral-700 border-gray-700 mb-8'>
            <CardHeader className='pb-4'>
              <h2 className='text-2xl font-semibold text-white flex items-center gap-2'>
                <span role='img' aria-label='info'>
                  ℹ️
                </span>{' '}
                How it Works
              </h2>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6 md:grid-cols-3'>
                <div className='text-center p-4'>
                  <div className='text-3xl mb-4'>🔗</div>
                  <h3 className='font-semibold text-white mb-2'>
                    Share Your Link
                  </h3>
                  <p className='text-gray-400'>
                    Share your unique referral link with friends and community
                  </p>
                </div>
                <div className='text-center p-4'>
                  <div className='text-3xl mb-4'>🪙</div>
                  <h3 className='font-semibold text-white mb-2'>
                    They Create a Coin
                  </h3>
                  <p className='text-gray-400'>
                    When someone uses your link to create a new coin
                  </p>
                </div>
                <div className='text-center p-4'>
                  <div className='text-3xl mb-4'>💰</div>
                  <h3 className='font-semibold text-white mb-2'>
                    Earn Rewards
                  </h3>
                  <p className='text-gray-400'>
                    Receive 0.03 EGLD instantly in your wallet for each referral
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Link Card */}
          <Card className='bg-neutral-800 hover:bg-neutral-700 border-gray-700 mb-8'>
            <CardHeader className='pb-2 px-6 pt-6'>
              <h2 className='text-xl font-semibold text-white flex items-center gap-2'>
                <span role='img' aria-label='link'>
                  🔗
                </span>{' '}
                Your Referral Link
              </h2>
            </CardHeader>
            <CardContent className='pt-4 px-6'>
              <div className='flex flex-col gap-3'>
                <code className='w-full p-4 rounded-lg bg-neutral-900 text-gray-300 overflow-x-auto whitespace-nowrap text-sm'>
                  {`${process.env.NEXT_PUBLIC_FRONTED_URL}?referrer=${address}`}
                </code>
                <Button
                  onClick={copyReferralLink}
                  className='bg-blue-600 hover:bg-blue-700 text-white self-end transition-colors'
                  size='sm'
                >
                  <Copy className='w-4 h-4 mr-2' />
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Referrals List Card */}
          <Card className='bg-neutral-800 hover:bg-neutral-700 border-gray-700'>
            <CardHeader className='pb-2 px-6'>
              <h2 className='text-xl font-semibold text-white flex items-center gap-2'>
                <span role='img' aria-label='list'>
                  📋
                </span>{' '}
                Your Referrals
              </h2>
              <p className='text-gray-400 text-sm'>
                {users?.length || 0} total referrals
              </p>
            </CardHeader>
            <CardContent className='pt-4 px-6'>
              {isLoading ? (
                <div className='text-center py-8 text-gray-400'>
                  <div className='animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mb-2'></div>
                  <p>Loading referrals...</p>
                </div>
              ) : users?.length ? (
                <div className='grid gap-3'>
                  {users.map((user: string) => (
                    <div
                      key={user}
                      className='flex items-center justify-between p-4 rounded-lg bg-gray-900 hover:bg-gray-850 transition-colors'
                    >
                      <a
                        href={`${network.explorerAddress}/accounts/${user}?function=createNewToken`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:text-blue-400 transition-colors'
                      >
                        <span className='sm:hidden inline font-mono text-gray-300 text-sm'>
                          {formatAddress(user)}
                        </span>
                        <span className='hidden sm:inline font-mono text-gray-300 text-sm'>
                          {user}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8 text-gray-400'>
                  <p className='text-lg mb-2'>No referrals yet</p>
                  <p className='text-sm'>
                    Share your link to start earning rewards!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
