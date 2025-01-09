import { RequireAuth } from '@/components/ConnectButton/RequireAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/services/rest/backendApi/reward';
import { Check } from 'lucide-react';
const ActionCard = ({
  task,
  done,
  handleMakeTask
}: {
  task: Task;
  done: boolean;
  handleMakeTask: () => void;
}) => {
  return (
    <Card key={task.id} className='bg-neutral-800 border border-neutral-700'>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-sm font-semibold text-white'>
            {task.title}
          </CardTitle>
          {done && <Check className='h-5 w-5 text-green-500' />}
        </div>
        <p className='text-xs text-neutral-400'>
          {done ? task.doneStatus : task.undoneStatus} • {task.prizePoints}{' '}
          points
        </p>
      </CardHeader>
      <CardContent className='pt-0 flex justify-end'>
        {!done ? (
          <RequireAuth onClick={handleMakeTask}>
            <Button>Make Task</Button>
          </RequireAuth>
        ) : (
          <Button
            variant='ghost'
            disabled
            className='opacity-50 text-green-500'
          >
            Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionCard;
