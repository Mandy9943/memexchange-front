'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatAddress } from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressIsValid } from '@multiversx/sdk-dapp/utils';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    throw new Error('Not able to copy');
  }
};

const arrayToCsv = ({
  data = null,
  columnDelimiter = ',',
  lineDelimiter = '\n',
  fileName = 'demo.csv'
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] | null;
  columnDelimiter?: string;
  lineDelimiter?: string;
  fileName?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any, ctr: any;

  if (data === null || !data.length) {
    return null;
  }

  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach((item) => {
    ctr = 0;
    keys.forEach((key: string) => {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result +=
        typeof item[key] === 'string' && item[key].includes(columnDelimiter)
          ? `"${item[key]}"`
          : item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  // (B) CREATE BLOB OBJECT
  const blob = new Blob([result], { type: 'text/csv' });

  // (C) CREATE DOWNLOAD LINK
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;

  // (D) "FORCE DOWNLOAD"
  // NOTE: MAY NOT ALWAYS WORK DUE TO BROWSER SECURITY
  // BETTER TO LET USERS CLICK ON THEIR OWN
  anchor.click();
  window.URL.revokeObjectURL(url);
  anchor.remove();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment
// @ts-ignore
const formSchema = z.object({
  wallets: z
    .string()
    .nonempty('Wallets are required')
    .refine(
      (value) => {
        const wallets = value.split(' ');
        return wallets.every(addressIsValid);
      },
      { message: 'Invalid wallets' }
    ),
  winners: z
    .number()
    .min(1, 'Number of winners is required')
    .refine(
      (value) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const wallets = formSchema.shape.wallets.parse(value).split(' ');
        return value <= wallets.length;
      },
      {
        message:
          'Number of winners must be less than or equal to the number of wallets'
      }
    )
});
type FormValues = z.infer<typeof formSchema>;

export default function SelectWinners() {
  const [winners, setWinners] = useState<string[]>([]);
  const [duplicates, setDuplicates] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wallets: '',
      winners: undefined
    }
  });

  const walletsValue = watch('wallets');

  useEffect(() => {
    const wallets = walletsValue.split(' ');
    const uniqueWallets = new Set(wallets);
    setDuplicates(uniqueWallets.size !== wallets.length);
  }, [walletsValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const wallets = data.wallets.split(' ');
    const winners = [];
    for (let i = 0; i < data.winners; i++) {
      const randomIndex = Math.floor(Math.random() * wallets.length);
      winners.push(wallets[randomIndex]);
      wallets.splice(randomIndex, 1);
    }
    setWinners(winners);
  };

  const clearForm = () => {
    reset();
    setWinners([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto w-full max-w-2xl rounded-lg border border-gray-200 dark:border-gray-700'>
        <div className='p-6'>
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <Label htmlFor='wallets'>Wallets</Label>
              <Textarea
                className='min-h-[200px] border border-gray-200 dark:border-gray-700'
                id='wallets'
                placeholder='Enter a list of wallets separated by space'
                {...register('wallets')}
              />
              <div className='mt-5'>
                {errors.wallets && (
                  <div className='text-red-500 text-xs'>
                    {errors.wallets.message?.toString()}
                  </div>
                )}

                {duplicates && (
                  <div className='flex w-full justify-between items-center '>
                    <div className='text-yellow-500 text-xs'>
                      Wallets contain duplicates
                    </div>

                    <Button
                      className='text-xs'
                      size={'sm'}
                      variant='outline'
                      onClick={() => {
                        const wallets = walletsValue.split(' ');
                        const uniqueWallets = new Set(wallets);
                        setValue(
                          'wallets',
                          Array.from(uniqueWallets).join(' ')
                        );
                      }}
                    >
                      Remove duplicates
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='winners'>Winners</Label>
              <Input
                id='winners'
                placeholder='Number of winners'
                type='number'
                {...register('winners', { valueAsNumber: true })}
              />
              {errors.winners && (
                <div className='text-red-500 text-xs'>
                  {errors.winners.message?.toString()}
                </div>
              )}
            </div>
            <div className='flex space-x-3'>
              <Button
                className='flex-1'
                variant='outline'
                onClick={clearForm}
                type='button'
              >
                Clear
              </Button>
              <Button className='flex-1' type='submit'>
                Select Winners
              </Button>
            </div>

            {winners.length > 0 && (
              <div className='space-y-2 mt-6'>
                <div className='w-full flex justify-between items-center'>
                  <Label>Lucky ones 🍀 : </Label>
                  <div className='flex gap-3'>
                    <Button
                      variant={'outline'}
                      size={'sm'}
                      className='rounded-full text-xs'
                      onClick={() => {
                        copyTextToClipboard(winners.join(' '));
                        toast.success('Copied to clipboard');
                      }}
                    >
                      Copy All
                    </Button>
                    <Button
                      variant={'outline'}
                      size={'sm'}
                      className='rounded-full text-xs'
                      onClick={() => {
                        arrayToCsv({
                          data: winners.map((w) => ({
                            addresses: w
                          })),
                          fileName: 'winners.csv'
                        });
                      }}
                    >
                      To Csv
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className='grid grid-cols-2 gap-2'>
                  {winners.map((winner, index) => (
                    <Button
                      key={index}
                      variant={'ghost'}
                      className='w-fit'
                      onClick={() => {
                        copyTextToClipboard(winner);
                        toast.success('Copied to clipboard');
                      }}
                    >
                      <div>
                        {index + 1}. {formatAddress(winner)}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
