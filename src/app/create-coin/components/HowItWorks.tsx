import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const HowItWorks = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <Card className='max-w-6xl mx-auto bg-[#1e222d] w-full mb-3 md:mb-4'>
      <CardHeader
        className='cursor-pointer flex flex-row items-center justify-between p-3 md:p-4'
        onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
      >
        <CardTitle className='text-white text-lg md:text-xl'>
          How it Works
        </CardTitle>
        {isHowItWorksOpen ? (
          <ChevronUp className='h-5 w-5 md:h-6 md:w-6 text-white' />
        ) : (
          <ChevronDown className='h-5 w-5 md:h-6 md:w-6 text-white' />
        )}
      </CardHeader>

      {isHowItWorksOpen && (
        <CardContent className='p-3 md:p-4'>
          <div className='space-y-3 md:space-y-4 text-gray-300'>
            <div className='flex items-start gap-2 md:gap-3'>
              <span className='bg-green-500 text-white w-5 h-5 md:w-6 md:h-6 flex justify-center items-center rounded-full text-xs md:text-sm shrink-0'>
                1
              </span>
              <p className='text-sm md:text-base'>
                Fill out the form with your memecoin details and choose if you
                want to be the first buyer.
              </p>
            </div>
            <div className='flex items-start gap-2 md:gap-3'>
              <span className='bg-green-500 text-white w-5 h-5 md:w-6 md:h-6 flex justify-center items-center rounded-full text-xs md:text-sm shrink-0'>
                2
              </span>
              <p className='text-sm md:text-base'>
                Click &quot;Launch Memecoin&quot; button and pay 0.1 EGLD
                (one-time payment).
              </p>
            </div>
            <div className='flex items-start gap-2 md:gap-3'>
              <span className='bg-green-500 text-white w-5 h-5 md:w-6 md:h-6 flex justify-center items-center rounded-full text-xs md:text-sm shrink-0'>
                3
              </span>
              <p className='text-sm md:text-base'>
                After launch, click &quot;Config Xexchange&quot; to set up
                trading parameters.
              </p>
            </div>
            <div className='flex items-start gap-2 md:gap-3'>
              <span className='bg-green-500 text-white w-5 h-5 md:w-6 md:h-6 flex justify-center items-center rounded-full text-xs md:text-sm shrink-0'>
                4
              </span>
              <p className='text-sm md:text-base'>
                Finally, click &quot;Enable Transactions&quot; to activate
                trading.
              </p>
            </div>
            <div className='mt-3 md:mt-4 p-3 md:p-4 bg-gray-800/50 rounded-lg'>
              <p className='font-semibold text-white mb-2 text-sm md:text-base'>
                What happens next?
              </p>
              <ul className='list-disc list-inside space-y-1.5 md:space-y-2 text-xs md:text-sm'>
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
                  After migration to xExchange (at $4000 market cap), you can
                  brand your token on{' '}
                  <a
                    href='https://mvxbrand.fun/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-green-400 hover:text-green-300'
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
