'use client';
import { PageHeaderHeading } from '@/app/tools/components/PageHeader/PageHeader';
import FormikContainer from './common/FormikContainer/FormikContainer';

function XPaymentPageView() {
  return (
    <div className='w-full max-w-8xl mx-auto py-4 px-2 sm:py-6 sm:px-8 dark'>
      <div className='flex text-center flex-col items-center  mt-5'>
        <PageHeaderHeading className='mb-6'>
          <span className={'gradienteTitle'}>
            Track your payments on Multiversx
          </span>
        </PageHeaderHeading>
      </div>
      <FormikContainer />
    </div>
  );
}

export default XPaymentPageView;
