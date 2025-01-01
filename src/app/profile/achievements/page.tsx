'use client';

import { PageWrapper } from '@/wrappers/PageWrapper';

export default function AchievementsPage() {
  return (
    <PageWrapper>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-6'>My Achievements</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {/* Placeholder for achievements */}
          <div className='border border-gray-800 rounded-lg p-4'>
            <h3 className='font-semibold'>First Connection</h3>
            <p className='text-sm text-gray-400'>
              Connected wallet for the first time
            </p>
          </div>
          {/* Add more achievement cards as needed */}
        </div>
      </div>
    </PageWrapper>
  );
}
