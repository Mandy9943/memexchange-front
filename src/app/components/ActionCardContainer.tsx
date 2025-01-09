'use client';
import { useAppSelector } from '@/hooks/useRedux';
import { RouteNamesEnum } from '@/localConstants';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { rewardService, Task } from '@/services/rest/backendApi/reward';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ActionCard from './ActionCard';

const ActionCardContainer = ({ task }: { task: Task }) => {
  const router = useRouter();
  const userAddress = useAppSelector(selectUserAddress);

  const handleMakeTask = async () => {
    if (task.title === 'Connect Wallet') {
      window.location.reload();
    }
    if (task.title === 'Create a MemeCoin') {
      router.push(RouteNamesEnum.createCoin);
    }

    if (task.title === 'Buy MemeCoin') {
      router.push(RouteNamesEnum.memeCoins);
    }

    if (task.type === 'link') {
      window.open(task.linkUrl, '_blank');
      toast.promise(
        rewardService.completeTask(
          {
            taskId: task.id,
            userAddress: userAddress
          },
          Cookies.get('auth-token') || ''
        ),
        {
          loading: 'Completing task...',
          success: 'Task completed',
          error: (error) => {
            const message = error.response?.data?.message || error.message;
            return `Task not completed: ${message}`;
          }
        }
      );
    }
  };
  const done = task.doneBy.some((doneBy) => doneBy.address === userAddress);

  return <ActionCard task={task} done={done} handleMakeTask={handleMakeTask} />;
};

export default ActionCardContainer;
