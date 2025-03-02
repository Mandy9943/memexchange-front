import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/app/tools/components/PageHeader/PageHeader';
import SelectWinners from './common/SelectWinners/SelectWinners';

const RaffleView = () => {
  return (
    <div className='w-full max-w-8xl mx-auto py-4 px-2 sm:py-6 sm:px-8'>
      <div className='flex flex-col items-center mt-5'>
        <PageHeaderHeading className='mb-6'>
          <span className={'gradienteTitle text-center'}>Raffle Draw</span>
        </PageHeaderHeading>
        <PageHeaderDescription className='mb-10 text-center'>
          Simply input a list of wallets, set the number of winners, and let our
          system randomly select the lucky ones.
        </PageHeaderDescription>
      </div>

      <SelectWinners />
    </div>
  );
};

export default RaffleView;
