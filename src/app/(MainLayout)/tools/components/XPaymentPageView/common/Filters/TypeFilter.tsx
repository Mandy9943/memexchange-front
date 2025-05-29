import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Controller, useFormContext } from 'react-hook-form';
import { IFormValues } from '../FormikContainer/FormikContainer';

export function TypeFilter() {
  const { control } = useFormContext<IFormValues>();

  return (
    <div>
      <Label htmlFor='type'>Token Type</Label>
      <Controller
        name='type'
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className='w-[180px]' id='type'>
              <SelectValue placeholder='Select a token type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='egld'>EGLD</SelectItem>
                <SelectItem value='esdt'>ESDTs</SelectItem>
                <SelectItem value='all'>All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
