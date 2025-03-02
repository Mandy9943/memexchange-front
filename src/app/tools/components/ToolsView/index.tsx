import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/app/tools/components/PageHeader/PageHeader';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { RouteNamesEnum } from '@/localConstants';
import { ToolCard } from './ToolCard';

export const tools: Tool[] = [
  {
    name: 'Make your herotag',
    description: 'An easy way to put your username on the blockchain',
    cover: '/assets/img/herotag.png',
    link: RouteNamesEnum.herotag
  },
  // {
  //   name: 'Fees on Multiversx',
  //   description: 'Discover the amount of fees you paid on MultiversX',
  //   cover: '/assets/img/x-fees.jpg',
  //   link: RouteNamesEnum.xfees
  // },
  // {
  //   name: 'Staking Rewards Overview',
  //   description: 'Check your staking rewards',
  //   cover: '/assets/img/xstkRewards.jpg',
  //   link: RouteNamesEnum.xstkRewards
  // },
  {
    name: 'Track your payments',
    description: 'An easy way to track your payments',
    cover: '/assets/img/x-payments-tool.jpg',
    link: RouteNamesEnum.xpayments
  },
  {
    name: 'Raffle Draw',
    description: 'Randomly select winners from a list of wallets',
    cover: '/assets/img/raffle.jpeg',
    link: RouteNamesEnum.raffle
  }
];

export interface Tool {
  name: string;
  description: string;
  cover: string;
  link: string;
}
const ToolsView = () => {
  return (
    <div className='w-full max-w-8xl mx-auto py-4 px-2 sm:py-6 sm:px-8'>
      <div className='flex flex-col items-center text-center mt-5'>
        <PageHeaderHeading className='mb-6'>
          <span className={'gradienteTitle'}>Essential Free Tools</span>
        </PageHeaderHeading>
        <PageHeaderDescription className='mb-10'>
          Elevate your experience with powerful, free Multiversx tools.
        </PageHeaderDescription>

        <div>
          <Separator className='my-4' />
          <div className='relative'>
            <ScrollArea>
              <div className='flex justify-center flex-wrap gap-4 pb-4'>
                {tools.map((tool) => (
                  <ToolCard
                    link={tool.link}
                    key={tool.name}
                    tool={tool}
                    className='w-[250px]'
                    aspectRatio='portrait'
                    width={250}
                    height={330}
                  />
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsView;
