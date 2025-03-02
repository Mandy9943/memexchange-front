'use client';

import { RequireAuth } from '@/components/ConnectButton/RequireAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import useReferral from '@/hooks/useReferral';
import { aiGenerationService } from '@/services/rest/backendApi/ai-generation';
import { fetchTransactionByHash } from '@/services/rest/elrond/transactions';
import { issueLpToken, setLocalRoles } from '@/services/sc/bonding/call';
import { createCoin } from '@/services/sc/degen_master/calls';
import { fetchNewTokenFee } from '@/services/sc/degen_master/queries';
import { Address } from '@/utils';
import { formatBalance } from '@/utils/mx-utils';
import { useUploadThing } from '@/utils/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { saveAs } from 'file-saver';
import Cookies from 'js-cookie';
import JSZip from 'jszip';
import { Download, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as z from 'zod';
import CoinUploader from './components/CoinUploader';
import HowItWorks from './components/HowItWorks';

// Define the form schema with Zod
const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Name must contain only letters and numbers (no spaces or special characters)'
    ),
  symbol: z
    .string()
    .min(3, 'Ticker must be at least 3 characters')
    .max(10, 'Ticker must be less than 10 characters')
    .regex(
      /^[A-Z0-9]*$/,
      'Ticker must contain only uppercase alphanumeric characters'
    )
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
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [generationStep, setGenerationStep] = useState<
    'prompt' | 'generating' | 'result' | 'error'
  >('prompt');
  const [customPrompt, setCustomPrompt] = useState('');
  const { data: remainingGenerations } = useSWR(
    '/api/ai-generation/remaining-generations',
    () =>
      aiGenerationService.getRemainingGenerations(Cookies.get('auth-token')!)
  );
  const { referrerAddress } = useReferral();
  const { data: newTokenFee } = useSWR(
    'master:getNewTokenFee',
    fetchNewTokenFee
  );

  const { startUpload, routeConfig } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        onUploadComplete(res[0].url);
      }
      setIsLoading(false);
    },
    onUploadError: () => {
      alert('error occurred while uploading');
      setPreview(null);
      setIsLoading(false);
    },
    onUploadBegin: () => {
      setIsLoading(true);
    }
  });

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
    const res = await createCoin(data, newTokenFee, referrerAddress);
    setSessionId(res.sessionId);
    // After successful submission
    clearFormData();
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

  const onUploadComplete = (url: string) => {
    setValue('imageUrl', url);
  };

  const uploadBase64Image = async (base64Data: string) => {
    // Convert base64 to blob
    const response = await fetch(base64Data);
    const blob = await response.blob();

    // Create a File object
    const file = new File([blob], 'generated-coin.png', { type: 'image/png' });

    // Use the same upload thing instance as CoinUploader
    const uploadResponse = await startUpload([file]);

    if (uploadResponse && uploadResponse[0]) {
      return uploadResponse[0].url;
    }
    throw new Error('Upload failed');
  };

  const handleGenerateCoin = async (customPrompt?: string) => {
    if (!remainingGenerations || remainingGenerations <= 0) {
      setGenerationStep('error');
      return;
    }

    try {
      setGenerationStep('generating');
      const authToken = Cookies.get('auth-token');
      const coin = await aiGenerationService.generateCoin(
        authToken!,
        customPrompt!
      );
      console.log(coin);

      // Upload the image and get the URL
      const imageUrl = await uploadBase64Image(coin.image);

      // Set form values
      setValue('name', coin.name);
      setValue('symbol', coin.symbol);
      setValue('description', coin.description);
      setValue('imageUrl', imageUrl);

      setGenerationStep('result');
    } catch (error) {
      setGenerationStep('error');
      console.error('Error generating coin:', error);
    }
  };

  const handleOpenAIDialog = () => {
    setGenerationStep('prompt');
    setShowAIDialog(true);
  };

  const handleDownloadCoin = async () => {
    try {
      // Create a new JSZip instance
      const zip = new JSZip();

      // Add the coin image to the zip
      const imageResponse = await fetch(watch('imageUrl'));
      const imageBlob = await imageResponse.blob();
      zip.file(`${watch('symbol')}_image.png`, imageBlob);

      // Create JSON with coin details
      const coinData = {
        name: watch('name'),
        symbol: watch('symbol'),
        description: watch('description')
      };

      // Add the JSON file to the zip
      zip.file(
        `${watch('symbol')}_details.json`,
        JSON.stringify(coinData, null, 2)
      );

      // Generate the zip file
      const content = await zip.generateAsync({ type: 'blob' });

      // Save the zip file
      saveAs(content, `${watch('symbol')}_coin.zip`);
    } catch (error) {
      console.error('Error downloading coin:', error);
    }
  };

  return (
    <div className='w-full px-4 py-4 md:py-8'>
      <div className='max-w-6xl mx-auto mb-6 flex flex-col items-center gap-4 px-4'>
        <RequireAuth onClick={handleOpenAIDialog}>
          <Button
            variant='outline'
            className='group relative overflow-hidden px-5 py-2.5 
            bg-gradient-to-r from-[#1a1f2c] to-[#1e2433] 
            border border-green-500/30 text-green-400 
            hover:border-green-400/50 hover:text-green-300 
            transition-all duration-300 ease-out
            rounded-full text-sm sm:text-base flex items-center gap-2.5 
            shadow-lg shadow-black/20 hover:shadow-green-500/50
            animate-pulse-subtle
            before:absolute before:inset-0 
            before:bg-gradient-to-r before:from-green-500/0 before:via-green-500/10 before:to-green-500/0
            before:animate-glow-horizontal
            after:absolute after:inset-0 
            after:bg-gradient-to-b after:from-green-500/0 after:via-green-500/10 after:to-green-500/0
            after:animate-glow-vertical'
          >
            <span
              className='text-xl group-hover:scale-110 transition-transform duration-300 
              animate-float'
            >
              🤖
            </span>
            <span className='font-medium relative z-10'>AI Coin Generator</span>
            <span className='text-xs opacity-75 border-l border-green-500/20 pl-2.5 ml-1 relative z-10'>
              {remainingGenerations ?? '...'} left
            </span>
            <div
              className='absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent 
            transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'
            />
          </Button>
        </RequireAuth>
      </div>

      <style jsx global>{`
        @keyframes glow-horizontal {
          0%,
          100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }

        @keyframes glow-vertical {
          0%,
          100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }

        .animate-glow-horizontal {
          animation: glow-horizontal 3s infinite;
        }

        .animate-glow-vertical {
          animation: glow-vertical 3s infinite;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>

      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className='bg-[#1e222d] text-white max-w-[90vw] sm:max-w-2xl  p-4 sm:p-6'>
          <DialogHeader>
            <DialogTitle className='text-lg sm:text-xl text-center'>
              AI Coin Generator
            </DialogTitle>
          </DialogHeader>

          {generationStep === 'prompt' && (
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm sm:text-base text-gray-300'>
                  Custom Prompt (Optional)
                </label>
                <textarea
                  className='w-full bg-[#2a2f3b] text-white p-2.5 sm:p-3 rounded-md text-sm sm:text-base'
                  placeholder='Describe your coin idea... (or leave empty for random generation)'
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                />
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>
                <Button
                  className='flex-1 bg-green-500 hover:bg-green-600 text-sm sm:text-base'
                  onClick={() => handleGenerateCoin(customPrompt)}
                >
                  {customPrompt ? 'Generate with Prompt' : 'Random Generation'}
                </Button>
              </div>
            </div>
          )}

          {generationStep === 'generating' && (
            <div className='py-6 sm:py-8 flex flex-col items-center gap-4'>
              <Loader2 className='h-6 w-6 sm:h-8 sm:w-8 animate-spin text-green-500' />
              <p className='text-gray-300 text-sm sm:text-base text-center'>
                Creating your memecoin masterpiece...
              </p>
            </div>
          )}

          {generationStep === 'result' && (
            <div className='space-y-4'>
              <div className='flex justify-center'>
                <img
                  src={watch('imageUrl')}
                  alt='Generated coin'
                  className='w-24 h-24 sm:w-32 sm:h-32 rounded-full'
                />
              </div>
              <div className='space-y-2 text-center'>
                <p className='text-base sm:text-lg font-bold'>
                  {watch('name')} ({watch('symbol')})
                </p>
                <p className='text-gray-300 text-sm sm:text-base'>
                  {watch('description')}
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-3'>
                <Button
                  className='flex-1 bg-green-500 hover:bg-green-600 text-sm sm:text-base'
                  onClick={() => setShowAIDialog(false)}
                >
                  Use This Coin
                </Button>
                <Button
                  variant='outline'
                  className='flex-1 border-green-500 text-green-500 hover:bg-green-300 text-sm sm:text-base'
                  onClick={() => {
                    setGenerationStep('prompt');
                    setCustomPrompt('');
                  }}
                >
                  Generate Another
                </Button>
              </div>
              <Button
                variant='outline'
                className='w-full border-blue-500 text-blue-500 hover:bg-blue-500/20 flex items-center justify-center gap-2 text-sm sm:text-base'
                onClick={handleDownloadCoin}
              >
                <Download className='h-4 w-4' />
                Download Coin Package
              </Button>
            </div>
          )}

          {generationStep === 'error' && (
            <div className='space-y-4'>
              <p className='text-red-500 text-sm sm:text-base text-center'>
                {!remainingGenerations || remainingGenerations <= 0
                  ? "You've used all your available generations for today. Generations reset daily - try again tomorrow!"
                  : 'Error generating coin. Please try again.'}
              </p>
              <Button
                variant='outline'
                className='w-full border-red-500 text-red-500 hover:bg-red-500/20'
                onClick={() => setShowAIDialog(false)}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Card className='max-w-6xl mx-auto bg-neutral-800 w-full'>
        <CardHeader className='p-4 md:p-6'>
          <CardTitle className='text-white text-center text-xl md:text-2xl'>
            Launch new coin
          </CardTitle>
        </CardHeader>

        <CardContent className='w-full max-w-xl mx-auto p-4 md:p-6'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 md:gap-6'
          >
            <div className='space-y-3 md:space-y-4'>
              <div className='flex justify-center mb-4 md:mb-6'>
                <CoinUploader
                  onUploadComplete={onUploadComplete}
                  initialPreview={watch('imageUrl')}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  preview={preview}
                  setPreview={setPreview}
                  startUpload={startUpload}
                  routeConfig={routeConfig}
                />
              </div>
              {errors.imageUrl && (
                <p className='text-red-500 text-xs md:text-sm mt-1'>
                  {errors.imageUrl.message}
                </p>
              )}

              <div>
                <label className='text-white text-xs md:text-sm mb-1.5 md:mb-2 block'>
                  Memecoin Name
                </label>
                <input
                  {...register('name')}
                  type='text'
                  placeholder='Enter coin name'
                  className='w-full bg-neutral-900 text-white p-2.5 md:p-3 rounded-md text-sm md:text-base'
                />
                {errors.name && (
                  <p className='text-red-500 text-xs md:text-sm mt-1'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className='text-white text-xs md:text-sm mb-1.5 md:mb-2 block'>
                  Memecoin Symbol
                </label>
                <input
                  {...register('symbol')}
                  type='text'
                  placeholder='Enter coin symbol'
                  className='w-full bg-neutral-900 text-white p-2.5 md:p-3 rounded-md text-sm md:text-base'
                />
                {errors.symbol && (
                  <p className='text-red-500 text-xs md:text-sm mt-1'>
                    {errors.symbol.message}
                  </p>
                )}
              </div>

              <div>
                <label className='text-white text-xs md:text-sm mb-1.5 md:mb-2 block'>
                  Description
                </label>
                <textarea
                  {...register('description')}
                  placeholder='Enter description here...'
                  className='w-full bg-neutral-900 text-white p-2.5 md:p-3 rounded-md min-h-[120px] md:min-h-[200px] text-sm md:text-base'
                />
                {errors.description && (
                  <p className='text-red-500 text-xs md:text-sm mt-1'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className='mt-4 md:mt-6 p-3 md:p-4 bg-green-500/10 border-2 border-green-500 rounded-lg'>
                <label className='flex items-center space-x-2 md:space-x-3 cursor-pointer'>
                  <input
                    type='checkbox'
                    {...register('creatorBuy')}
                    className='w-4 h-4 md:w-5 md:h-5 accent-green-500'
                  />
                  <span className='text-white font-medium text-sm md:text-base'>
                    I want to be the first buyer of this coin! 🚀
                  </span>
                </label>
                <p className='text-gray-400 text-xs md:text-sm mt-1.5 md:mt-2 ml-6 md:ml-8'>
                  By checking this box, you&apos;ll automatically become the
                  first buyer when the coin launches
                </p>
              </div>

              <p className='text-gray-400 text-center text-xs md:text-sm'>
                Cost of launching a memecoin is{' '}
                {formatBalance({
                  balance: newTokenFee,
                  decimals: 18
                })}{' '}
                EGLD
              </p>

              <RequireAuth onClick={handleSubmit(onSubmit)}>
                <Button
                  type='button'
                  className='w-full bg-green-500 text-white p-2.5 md:p-3 rounded-md hover:bg-green-600 transition-colors text-sm md:text-base'
                >
                  1. Launch Memecoin
                </Button>
              </RequireAuth>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className='w-full max-w-6xl mx-auto bg-neutral-800 mt-4 py-6 md:py-10 flex flex-col items-center gap-3 md:gap-4 px-4 md:px-6'>
        <Button
          type='button'
          className='w-full max-w-xl mx-auto bg-teal-500 text-white p-2.5 md:p-3 rounded-md hover:bg-teal-600 transition-colors text-sm md:text-base'
          disabled={!newPairContract}
          onClick={() =>
            issueLpToken({
              contract: newPairContract!
            })
          }
        >
          2. Config Xexchange
        </Button>

        <Button
          type='button'
          className='w-full max-w-xl mx-auto bg-teal-500 text-white p-2.5 md:p-3 rounded-md hover:bg-teal-600 transition-colors text-sm md:text-base'
          disabled={!newPairContract}
          onClick={() =>
            setLocalRoles({
              contract: newPairContract!
            })
          }
        >
          3. Enable Transactions
        </Button>
      </Card>

      <HowItWorks />
    </div>
  );
};

export default Page;
