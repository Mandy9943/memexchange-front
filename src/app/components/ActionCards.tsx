import { rewardService } from '@/services/rest/backendApi/reward';
import ActionCard from './ActionCard';

const ActionCards = async () => {
  const tasks = await rewardService.getAllTasks();
  console.log(tasks);

  return (
    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {tasks.map((task, idx) => (
        <ActionCard key={idx} task={task} />
      ))}
    </div>
  );
};

export default ActionCards;
