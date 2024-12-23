import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Example Data
const topUsers = [
  { rank: 1, address: 'EQDZlx...nuyu', points: 97, prize: '1000 AICG ($3.85)' },
  { rank: 2, address: 'EQDxBj...keml', points: 85, prize: '800 AICG ($3.08)' },
  { rank: 3, address: 'EQCxgy...YuJP', points: 80, prize: '600 AICG ($2.31)' },
  { rank: 4, address: 'EQDhwE...VdEP', points: 70, prize: '400 AICG ($1.54)' },
  { rank: 5, address: 'EQDeXI...EHvU', points: 65, prize: '200 AICG ($0.77)' }
];

const actions = [
  { title: 'Join Telegram Channel', points: 10, status: 'Not joined yet' },
  { title: 'Join Telegram Chat', points: 10, status: 'Not joined yet' },
  { title: 'Invite Friends', points: 5, status: '0 friends invited' },
  {
    title: 'Follow X (Twitter) Account',
    points: 10,
    status: 'Not followed yet'
  },
  { title: 'Retweet Our Post', points: 15, status: 'Not retweeted yet' },
  { title: 'Post Story', points: 5, status: 'Not posted yet' },
  {
    title: 'Buy any AppInCoin Meme coin',
    points: 10,
    status: 'Not claimed yet'
  },
  {
    title: 'Sell any AppInCoin Meme coin',
    points: 10,
    status: 'Not claimed yet'
  },
  { title: 'Launch Any App', points: 5, status: 'Not launched yet' },
  { title: 'Create New Coin', points: 5, status: 'Not created yet' }
];

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

function HeroSection() {
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

function Leaderboard() {
  return (
    <Card className='mt-8 bg-neutral-800 w-full max-w-3xl text-white border-none'>
      <CardHeader>
        <CardTitle className='text-xl'>Top Users</CardTitle>
        <p className='text-sm text-neutral-400'>
          Win prizes every 24h
          <br />
          The winners will receive prizes in{' '}
          <span className='text-green-400'>01:30:08</span>
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
            {topUsers.map((user) => (
              <tr
                key={user.rank}
                className='border-b border-neutral-700 text-white'
              >
                <td className='py-2'>{user.rank}</td>
                <td>{user.address}</td>
                <td>{user.points}</td>
                <td>{user.prize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function ActionCards() {
  return (
    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {actions.map((action, idx) => (
        <Card key={idx} className='bg-neutral-800 border border-neutral-700'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-semibold text-white'>
              {action.title}
            </CardTitle>
            <p className='text-xs text-neutral-400'>
              {action.status} • {action.points} points
            </p>
          </CardHeader>
          <CardContent className='pt-0 flex justify-end'>
            <Button className=' '>Connect Wallet</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
