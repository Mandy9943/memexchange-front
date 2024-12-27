'use client';

import { RequireAuth } from '@/components/ConnectButton/RequireAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchTransactionByHash } from '@/services/rest/elrond/transactions';
import { issueLpToken, setLocalRoles } from '@/services/sc/bonding/call';
import { createCoin } from '@/services/sc/degen_master/calls';
import { Address } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CoinUploader from './components/CoinUploader';

// Define the form schema with Zod
const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
  symbol: z
    .string()
    .min(2, 'Symbol must be at least 2 characters')
    .max(10, 'Symbol must be less than 10 characters')
    .toUpperCase(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  imageUrl: z.string().min(1, 'Please upload an image'),
  creatorBuy: z.boolean().default(false)
});

type FormData = z.infer<typeof formSchema>;

const FORM_STORAGE_KEY = 'create-coin-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveFormData = (data: any) => {
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
};

const getFormData = () => {
  const data = localStorage.getItem(FORM_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

const clearFormData = () => {
  localStorage.removeItem(FORM_STORAGE_KEY);
};

const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      symbol: '',
      description: '',
      imageUrl: '',
      creatorBuy: false
    }
  });

  const [sessionId, setSessionId] = useState<string | null>(null);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = getFormData();
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        setValue(key as keyof FormData, value as string);
      });
    }
  }, [setValue]);

  // Save form data on change
  useEffect(() => {
    const subscription = watch((data) => {
      saveFormData(data);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const res = await createCoin(data, 0.1);
    setSessionId(res.sessionId);
    // After successful submission
    clearFormData();
    // Continue with your submission logic...
  };

  const [newPairContract, setNewPairContract] = useState<string | null>(null);

  const onSuccessTx = async () => {
    if (!transactions) return;
    if (transactions.length === 0) return;

    const tx = await fetchTransactionByHash(transactions[0].hash);

    const results = tx.results;

    if (!results) return;
    if (results.length === 0) return;

    const allResultsEventsLogs = results.flatMap(
      (result) => result.logs?.events || []
    );

    console.log(allResultsEventsLogs);

    const callBackLogs = allResultsEventsLogs.filter(
      (log) => log.identifier === 'callBack'
    );
    console.log(callBackLogs);
    if (callBackLogs.length === 0) return;

    // find the callback log with topic === "new_pair_contract" in base64 encoded
    const callBackLogWithNewPairContract = callBackLogs.find(
      (log) =>
        log.topics?.includes(
          Buffer.from('new_pair_contract').toString('base64')
        )
    );
    console.log(callBackLogWithNewPairContract);

    if (!callBackLogWithNewPairContract) return;

    if (!callBackLogWithNewPairContract.topics) return;

    const newPairContractBase64 = callBackLogWithNewPairContract.topics[1];
    console.log(newPairContractBase64);

    const hexAddress = Buffer.from(newPairContractBase64, 'base64').toString(
      'hex'
    );
    console.log(hexAddress);

    const newAddress = Address.fromHex(hexAddress);

    console.log(newAddress.bech32());

    setNewPairContract(newAddress.bech32());
  };

  const { transactions } = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccessTx
  });

  return (
    <div className='w-full'>
      <Card className='max-w-6xl mx-auto bg-[#1e222d] w-full'>
        <CardHeader>
          <CardTitle className='text-white text-center text-2xl'>
            Launch new coin
          </CardTitle>
        </CardHeader>

        <CardContent className='w-full max-w-xl mx-auto'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <div className='space-y-4'>
              <div className='flex justify-center mb-6'>
                <CoinUploader
                  onUploadComplete={(url) => setValue('imageUrl', url)}
                  initialPreview={watch('imageUrl')}
                />
              </div>
              {errors.imageUrl && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.imageUrl.message}
                </p>
              )}

              <div>
                <label className='text-white text-sm mb-2 block'>
                  Memecoin Name
                </label>
                <input
                  {...register('name')}
                  type='text'
                  placeholder='Enter coin name'
                  className='w-full bg-[#2a2f3b] text-white p-3 rounded-md'
                />
                {errors.name && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className='text-white text-sm mb-2 block'>
                  Memecoin Symbol
                </label>
                <input
                  {...register('symbol')}
                  type='text'
                  placeholder='Enter coin symbol'
                  className='w-full bg-[#2a2f3b] text-white p-3 rounded-md'
                />
                {errors.symbol && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.symbol.message}
                  </p>
                )}
              </div>

              <div>
                <label className='text-white text-sm mb-2 block'>
                  Description
                </label>
                <textarea
                  {...register('description')}
                  placeholder='Enter description here...'
                  className='w-full bg-[#2a2f3b] text-white p-3 rounded-md min-h-[200px]'
                />
                {errors.description && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className='mt-6 p-4 bg-blue-500/10 border-2 border-blue-500 rounded-lg'>
                <label className='flex items-center space-x-3 cursor-pointer'>
                  <input
                    type='checkbox'
                    {...register('creatorBuy')}
                    className='w-5 h-5 accent-blue-500'
                  />
                  <span className='text-white font-medium'>
                    I want to be the first buyer of this coin! 🚀
                  </span>
                </label>
                <p className='text-gray-400 text-sm mt-2 ml-8'>
                  By checking this box, you&apos;ll automatically become the
                  first buyer when the coin launches
                </p>
              </div>

              <p className='text-gray-400 text-center text-sm'>
                Cost of launching a memecoin is 0.01 EGLD
              </p>

              <RequireAuth onClick={handleSubmit(onSubmit)}>
                <button
                  type='button'
                  className='w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors'
                >
                  Launch Memecoin
                </button>
              </RequireAuth>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className='w-full max-w-6xl mx-auto bg-[#1e222d]  mt-4 py-10 flex flex-col items-center gap-4'>
        <Button
          type='button'
          className='w-full max-w-xl mx-auto bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 transition-colors'
          disabled={!newPairContract}
          onClick={() =>
            issueLpToken({
              contract: newPairContract!
            })
          }
        >
          Config Xexchange
        </Button>

        <Button
          type='button'
          className='w-full max-w-xl mx-auto bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 transition-colors'
          disabled={!newPairContract}
          onClick={() =>
            setLocalRoles({
              contract: newPairContract!
            })
          }
        >
          Enable Transactions
        </Button>
      </Card>
    </div>
  );
};

export default Page;
