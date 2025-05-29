import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-full'>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
};
