'use client';
import { rewardService } from '@/services/rest/backendApi/reward';
import useSWR from 'swr';
import ActionCard from './ActionCardContainer';

const ActionCards = () => {
  const { data: tasks, isLoading } = useSWR(
    '/api/rewards/tasks',
    rewardService.getAllTasks
  );

  if (isLoading) return <div>Loading...</div>;
  if (!tasks) return <div>No tasks found</div>;

  return (
    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {tasks.map((task, idx) => (
        <ActionCard key={idx} task={task} />
      ))}
    </div>
  );
};

export default ActionCards;
