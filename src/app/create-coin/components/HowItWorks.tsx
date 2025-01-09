import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const HowItWorks = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <Card className='max-w-6xl mx-auto bg-[#1e222d] w-full mb-4'>
      <CardHeader
        className='cursor-pointer flex flex-row items-center justify-between'
        onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
      >
        <CardTitle className='text-white text-xl'>How it Works</CardTitle>
        {isHowItWorksOpen ? (
          <ChevronUp className='h-6 w-6 text-white' />
        ) : (
          <ChevronDown className='h-6 w-6 text-white' />
        )}
      </CardHeader>

      {isHowItWorksOpen && (
        <CardContent>
          <div className='space-y-4 text-gray-300'>
            <div className='flex items-start gap-2'>
              <span className='bg-blue-500 text-white w-6 h-6 flex justify-center items-center rounded-full text-sm'>
                1
              </span>
              <p>
                Fill out the form with your memecoin details and choose if you
                want to be the first buyer.
              </p>
            </div>
            <div className='flex items-start gap-2'>
              <span className='bg-blue-500 text-white w-6 h-6 flex justify-center items-center rounded-full text-sm'>
                2
              </span>
              <p>
                Click &quot;Launch Memecoin&quot; button and pay 0.1 EGLD
                (one-time payment).
              </p>
            </div>
            <div className='flex items-start gap-2'>
              <span className='bg-blue-500 text-white w-6 h-6 flex justify-center items-center rounded-full text-sm'>
                3
              </span>
              <p>
                After launch, click &quot;Config Xexchange&quot; to set up
                trading parameters.
              </p>
            </div>
            <div className='flex items-start gap-2'>
              <span className='bg-blue-500 text-white w-6 h-6 flex justify-center items-center rounded-full text-sm'>
                4
              </span>
              <p>
                Finally, click &quot;Enable Transactions&quot; to activate
                trading.
              </p>
            </div>
            <div className='mt-4 p-4 bg-gray-800/50 rounded-lg'>
              <p className='font-semibold text-white mb-2'>
                What happens next?
              </p>
              <ul className='list-disc list-inside space-y-2 text-sm'>
                <li>
                  Your coin will appear in your Profile&apos;s Tokens section
                </li>
                <li>
                  If you chose to be the first buyer: Go to your Profile →
                  Tokens → Click on your coin to make the first purchase
                </li>
                <li>
                  If you didn&apos;t choose to be the first buyer: Your coin
                  will be immediately listed in the &quot;Meme Coins&quot;
                  section
                </li>
                <li>
                  After migration to xExchange, anyone can brand your token on{' '}
                  <a
                    href='https://mvxbrand.fun/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-400 hover:text-blue-300'
                  >
                    MVXBrand
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default HowItWorks;
