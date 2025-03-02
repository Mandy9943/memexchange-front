'use client';
import { PageHeaderHeading } from '@/app/tools/components/PageHeader/PageHeader';
import FormikContainer from './common/FormikContainer/FormikContainer';

function XPaymentPageView() {
  return (
    <div className='w-full max-w-7xl mx-auto py-6 px-4 sm:py-8 sm:px-6 lg:px-8 dark'>
      <div className='flex text-center flex-col items-center mb-8'>
        <PageHeaderHeading className='mb-6'>
          <span className='gradienteTitle text-3xl font-bold sm:text-4xl'>
            Track your payments on Multiversx
          </span>
        </PageHeaderHeading>
        <p className='text-muted-foreground max-w-2xl'>
          Monitor and analyze your MultiversX blockchain transactions with ease
        </p>
      </div>
      <div className='bg-zinc-800 rounded-lg shadow-md p-6'>
        <FormikContainer />
      </div>
    </div>
  );
}

export default XPaymentPageView;
