'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { rewardService } from '@/services/rest/backendApi/reward';
import { formatAddress } from '@/utils/mx-utils';
import useSWR from 'swr';
// Example Data

function Leaderboard() {
  const { data: topUsers, isLoading } = useSWR('/api/reward/leaderboard', () =>
    rewardService.getLeaderboard()
  );

  if (isLoading || !topUsers)
    return (
      <Card className='mt-8 bg-neutral-800 w-full max-w-3xl text-white border-none'>
        <CardHeader>
          <CardTitle className='text-xl'>Top Users</CardTitle>
          <p className='text-sm text-neutral-400'>
            Loading leaderboard data...
          </p>
        </CardHeader>
        <CardContent>
          <div className='animate-pulse'>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className='h-12 bg-neutral-700/50 rounded mb-2'
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  if (topUsers.length === 0) return <div>No data</div>;
  return (
    <Card className='mt-8 min-h-[406px] bg-neutral-800 w-full max-w-3xl text-white border-none'>
      <CardHeader>
        <CardTitle className='text-xl'>Top Users</CardTitle>
        <p className='text-sm text-neutral-400'>
          Win prizes every 24h
          <br />
          The winners will receive prizes{' '}
          <span className='text-green-400'>soon</span>
        </p>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center mb-4'>
          <div className='text-sm text-neutral-300'>Your rank: -</div>
        </div>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b border-neutral-700 text-neutral-400'>
              <th className='py-2'>#</th>
              <th>Address</th>
              <th>Points</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map((user, index) => (
              <tr
                key={user.id}
                className='border-b border-neutral-700 text-white'
              >
                <td className='py-2'>{index + 1}</td>
                <td>{formatAddress(user.address)}</td>
                <td>{user.points}</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default Leaderboard;
