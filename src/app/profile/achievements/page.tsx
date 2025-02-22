'use client';

import ActionCard from '@/app/components/ActionCard';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { rewardService } from '@/services/rest/backendApi/reward';
import { PageWrapper } from '@/wrappers/PageWrapper';
import Cookies from 'js-cookie';
import useSWR from 'swr';

export default function AchievementsPage() {
  const { data: tasks, isLoading } = useSWR('/api/reward/tasks/user', () =>
    rewardService.getUserTasks(Cookies.get('auth-token')!)
  );

  return (
    <PageWrapper>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold mb-2'>My Achievements</h1>
          <p className='text-neutral-400'>
            Complete tasks to earn points and unlock rewards
          </p>
        </div>

        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[...Array(3)].map((_, i) => (
              <Card
                key={i}
                className='p-6 bg-neutral-800 border border-neutral-700'
              >
                <Skeleton className='h-4 w-3/4 mb-4 bg-primary/50' />
                <Skeleton className='h-3 w-full mb-2 bg-primary/50' />
                <div className='flex justify-end'>
                  <Skeleton className='h-8 w-24 mt-4 bg-primary/50' />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {tasks?.map((task) => (
              <ActionCard
                done={true}
                handleMakeTask={() => {}}
                key={task.id}
                task={task}
              />
            ))}
          </div>
        )}

        {tasks?.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-neutral-400'>
              No achievements available at the moment.
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
