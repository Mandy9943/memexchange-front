import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/app/tools/components/PageHeader/PageHeader';
import HeroTagFqa from './common/FQA/HeroTagFqa';
import HeroTagForm from './common/HeroTagForm/HeroTagForm';

const HeroTagView = () => {
  return (
    <div className='w-full max-w-8xl mx-auto py-4 px-2 sm:py-6 sm:px-8'>
      <div className='flex flex-col items-center text-center mt-5'>
        <PageHeaderHeading className='mb-6'>
          <span className={'gradienteTitle'}>Create your Herotag</span>
        </PageHeaderHeading>
        <PageHeaderDescription className='mb-10'>
          Associate a herotag to your erd address in multiversx
        </PageHeaderDescription>

        <HeroTagForm />

        <HeroTagFqa />
      </div>
    </div>
  );
};

export default HeroTagView;
