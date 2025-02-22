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
      <div className='container mx-auto px-4 py-4 '>
        <div className='mb-4'>
          <h1 className='text-xl font-bold mb-1 text-white'>My Referrals</h1>
          <p className='text-gray-400 mb-4'>
            Share your referral link and earn rewards when others create a new
            coin
          </p>

          <Card className='mb-4 bg-gray-800 border-gray-700 '>
            <CardHeader className='pb-2 px-4 pt-4'>
              <h2 className='text-lg font-semibold text-white'>
                Your Referral Link
              </h2>
            </CardHeader>
            <CardContent className='pt-2 px-4'>
              <div className='flex flex-col gap-2'>
                <code className='w-full p-2 rounded bg-gray-900 text-gray-300 overflow-x-auto whitespace-nowrap text-sm'>
                  {`${process.env.NEXT_PUBLIC_FRONTED_URL}?referrer=${address}`}
                </code>
                <Button
                  onClick={copyReferralLink}
                  className='bg-gray-700 hover:bg-gray-600 text-white self-end'
                  size='sm'
                >
                  <Copy className='w-3 h-3 mr-1' />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-800 border-gray-700'>
            <CardHeader className='pb-2'>
              <h2 className='text-lg font-semibold text-white'>
                Your Referrals
              </h2>
              <p className='text-gray-400 text-sm'>
                {users?.length || 0} total referrals
              </p>
            </CardHeader>
            <CardContent className='pt-2'>
              {isLoading ? (
                <div className='text-center py-4 text-gray-400'>Loading...</div>
              ) : users?.length ? (
                <div className='space-y-2'>
                  {users.map((user: string) => (
                    <div
                      key={user}
                      className='flex flex-col gap-2 p-2 rounded-lg bg-gray-900'
                    >
                      <a
                        href={`${network.explorerAddress}/accounts/${user}?function=createNewToken`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className='sm:hidden inline font-mono text-gray-300 overflow-x-auto whitespace-nowrap text-sm'>
                          {formatAddress(user)}
                        </span>
                        <span className='hidden sm:inline font-mono text-gray-300 overflow-x-auto whitespace-nowrap text-sm'>
                          {user}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-4 text-gray-400 text-sm'>
                  No referrals yet. Share your link to get started!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
