'use client';
import { RequireAuth } from '@/components/ConnectButton/RequireAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/useRedux';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { rewardService, Task } from '@/services/rest/backendApi/reward';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
const ActionCard = ({ task }: { task: Task }) => {
  const userAddress = useAppSelector(selectUserAddress);

  const handleMakeTask = async () => {
    if (task.title === 'Connect Wallet') {
      window.location.reload();
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

  return (
    <Card key={task.id} className='bg-neutral-800 border border-neutral-700'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-semibold text-white'>
          {task.title}
        </CardTitle>
        <p className='text-xs text-neutral-400'>
          {done ? task.doneStatus : task.undoneStatus} • {task.prizePoints}{' '}
          points
        </p>
      </CardHeader>
      <CardContent className='pt-0 flex justify-end'>
        {!done && (
          <RequireAuth>
            <Button className=' ' onClick={handleMakeTask}>
              Make Task
            </Button>
          </RequireAuth>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionCard;
