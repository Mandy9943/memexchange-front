import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/hooks/useRedux';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IFormValues } from '../FormikContainer/FormikContainer';

const AddressFilter = () => {
  const { register, watch, setValue } = useFormContext<IFormValues>();
  const address = useAppSelector(selectUserAddress);
  const receiverValue = watch('receiver');

  useEffect(() => {
    if (receiverValue === '' && address !== '') {
      setValue('receiver', address, { shouldValidate: true });
    }
  }, [address, setValue, receiverValue]);

  return (
    <div className='flex flex-col sm:flex-row gap-4 w-full mt-[-3px]'>
      <div className='w-full'>
        <Label htmlFor='receiver'>Receiver</Label>
        <Input
          id='receiver'
          placeholder='erd...'
          {...register('receiver')}
          className='w-full'
        />
      </div>
      <div className='w-full'>
        <Label htmlFor='sender'>Sender</Label>
        <Input
          id='sender'
          placeholder='erd...'
          {...register('sender')}
          className='w-full'
        />
      </div>
    </div>
  );
};

export default AddressFilter;
