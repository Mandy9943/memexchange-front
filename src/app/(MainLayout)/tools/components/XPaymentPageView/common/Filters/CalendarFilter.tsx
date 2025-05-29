'use client';

import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { IFormValues } from '../FormikContainer/FormikContainer';

export function CalendarFilter() {
  const { watch, setValue } = useFormContext<IFormValues>();
  const fromDate = watch('from');
  const toDate = watch('to');

  const handleRangeDateChange = (name: 'from' | 'to', date?: Date) => {
    if (date) {
      setValue(name, date, { shouldValidate: true });
    }
  };

  return (
    <div className='flex flex-col sm:flex-row gap-4'>
      <div className='flex flex-col w-full gap-[6px] pt-[2.6px]'>
        <Label>From Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[full] justify-start text-left font-normal',
                !fromDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {fromDate ? format(fromDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align='start'
            className='flex w-auto flex-col space-y-2 p-2'
          >
            <div className='rounded-md border'>
              <Calendar
                mode='single'
                selected={fromDate}
                onSelect={(date) => handleRangeDateChange('from', date)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-col w-full gap-[6px]  pt-[2.6px]'>
        <Label>To Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[full] justify-start text-left font-normal',
                !toDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {toDate ? format(toDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align='start'
            className='flex w-auto flex-col space-y-2 p-2'
          >
            <div className='rounded-md border'>
              <Calendar
                mode='single'
                selected={toDate}
                onSelect={(date) => handleRangeDateChange('to', date)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
